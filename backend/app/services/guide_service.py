from fastapi import HTTPException

from app.schemas import GuideItem, SafetyGuide


GUIDES = {
    "theft": SafetyGuide(
        type="theft",
        title="절도 예방 가이드",
        description="여행 중 소지품 도난을 예방하기 위한 기본 수칙입니다.",
        items=[
            GuideItem(
                icon="briefcase",
                title="가방 관리",
                text="가방은 몸 앞쪽으로 메고, 지갑과 휴대폰은 분산 보관하세요.",
            ),
            GuideItem(
                icon="hotel",
                title="숙소 보관",
                text="숙소 외출 시 귀중품은 안전한 곳에 보관하고 문단속을 확인하세요.",
            ),
            GuideItem(
                icon="eye",
                title="수상한 행동 주의",
                text="주변을 반복해서 살피거나 접근하는 사람이 있으면 즉시 자리를 이동하세요."
            ),
        ],
    ),
    "violence": SafetyGuide(
        type="violence",
        title="폭력 예방 가이드",
        description="야간 이동과 혼잡한 장소에서 안전을 지키기 위한 수칙입니다.",
        items=[
            GuideItem(
                icon="moon",
                title="야간 이동 주의",
                text="늦은 시간에는 골목길보다 사람이 많은 큰 길을 이용하세요.",
            ),
            GuideItem(
                icon="message-circle-x",
                title="시비 상황 회피",
                text="시비가 발생하면 대응하지 말고 즉시 거리를 두세요.",
            ),
            GuideItem(
                icon="phone-call",
                title="위험 시 신고",
                text="위험을 느끼면 주변 경찰서에 도움을 요청하세요."
            ),
        ],
    ),
    "sexual": SafetyGuide(
        type="sexual",
        title="성범죄 예방 가이드",
        description="여행 중 성범죄 위험 상황을 예방하기 위한 수칙입니다.",
        items=[
            GuideItem(
                icon="users",
                title="단독 이동 주의",
                text="늦은 시간 낯선 장소에서는 혼자 이동하지 않는 것이 좋습니다.",
            ),
            GuideItem(
                icon="map-pin",
                title="위치 공유",
                text="숙소 복귀 전 지인에게 현재 위치와 이동 경로를 공유하세요.",
            ),
            GuideItem(
                icon="shield-alert",
                title="위험 신호 대응",
                text="불쾌한 접근이나 위협을 느끼면 즉시 도움을 요청하세요.",
            ),
        ],
    ),
    "night": SafetyGuide(
        type="night",
        title="야간 안전 가이드",
        description="밤 시간대 안전한 이동을 위한 기본 수칙입니다.",
        items=[
            GuideItem(
                icon="route",
                title="밝은 경로 이용",
                text="어두운 골목보다 밝고 사람이 많은 길을 이용하세요.",
            ),
            GuideItem(
                icon="battery-charging",
                title="휴대폰 배터리 확인",
                text="야간 이동 전 휴대폰 배터리를 충분히 확보하세요.",
            ),
            GuideItem(
                icon="navigation",
                title="경로 사전 확인",
                text="목적지 경로와 주변 치안 시설 위치를 미리 확인하세요."
            ),
        ],
    ),
}


def get_guides() -> list[SafetyGuide]:
    return list(GUIDES.values())


def get_guide(guide_type: str) -> SafetyGuide:
    guide = GUIDES.get(guide_type)

    if guide is None:
        raise HTTPException(status_code=404, detail="Safety guide not found")
    
    return guide