import pandas as pd
import numpy as np

from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score


CRIME_COLS = ["강도", "살인", "성범죄", "절도", "폭력"]
INFRA_COLS = ["cctv_count", "경찰서", "파출소 및 지구대"]


def load_data(path):
    return pd.read_csv(path, encoding="utf-8")


def preprocess_data(df):
    use_cols = CRIME_COLS + INFRA_COLS

    df[use_cols] = df[use_cols].fillna(0)

    df["crime_count"] = df[CRIME_COLS].sum(axis=1)
    df["infra_count"] = df[INFRA_COLS].sum(axis=1)

    return df


def calculate_risk_score(df):
    scaler = MinMaxScaler()

    df["crime_score"] = scaler.fit_transform(df[["crime_count"]]) * 100
    df["CCTV_score"] = scaler.fit_transform(df[["cctv_count"]]) * 100
    df["infra_score"] = scaler.fit_transform(df[["infra_count"]]) * 100

    df["risk_score"] = (
        df["crime_score"] * 0.95
        - df["CCTV_score"] * 0.03
        - df["infra_score"] * 0.02
    )

    df["risk_score"] = df["risk_score"].clip(5, 100).round(1)
    df["safety_score"] = 100 - df["risk_score"]

    return df


def classify_risk(score):
    if score < 20:
        return "매우낮음"
    elif score < 40:
        return "낮음"
    elif score < 60:
        return "보통"
    elif score < 80:
        return "높음"
    else:
        return "매우높음"


def add_crime_pattern(df):
    for col in CRIME_COLS:
        df[f"{col}_비율"] = (df[col] / df["crime_count"] * 100).round(1)

    df["major_crime_type"] = df.apply(
        lambda row: ", ".join(
            row[CRIME_COLS].sort_values(ascending=False).head(3).index.tolist()
        ),
        axis=1
    )

    return df


def run_clustering(df):
    df["crime_count_log"] = np.log1p(df["crime_count"])
    df["cctv_log"] = np.log1p(df["cctv_count"])
    df["infra_log"] = np.log1p(df["infra_count"])

    features = df[["crime_count_log", "cctv_log", "infra_log"]]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(features)

    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)

    df["cluster"] = kmeans.fit_predict(X_scaled)

    cluster_labels = {
        0: "범죄 집중 관리 지역",
        1: "생활 안전 지역",
        2: "치안 인프라 보완 필요 지역"
    }

    df["region_type"] = df["cluster"].map(cluster_labels)

    score = silhouette_score(X_scaled, df["cluster"])

    return df, score


def save_result(df, output_path):
    result_cols = [
        "region",
        "강도", "살인", "성범죄", "절도", "폭력",
        "major_crime_type",
        "절도_비율", "폭력_비율", "성범죄_비율", "강도_비율", "살인_비율",
        "crime_count",
        "risk_score",
        "risk_level",
        "cluster",
        "region_type"
    ]

    df[result_cols].to_csv(output_path, encoding="utf-8-sig", index=False)


def main():
    input_path = "crime_raw_data.csv"
    output_path = "crime_stats.csv"

    df = load_data(input_path)

    df = preprocess_data(df)
    df = calculate_risk_score(df)
    df["risk_level"] = df["risk_score"].apply(classify_risk)
    df = add_crime_pattern(df)
    df, silhouette = run_clustering(df)

    save_result(df, output_path)

    print(f"분석 완료")
    print(f"Silhouette Score: {silhouette:.3f}")
    print(f"결과 저장: {output_path}")


if __name__ == "__main__":
    main()
