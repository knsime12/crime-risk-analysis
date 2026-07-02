# Legacy SAFE TRIP UI Assets

This directory stores UI/UX reference files extracted from the final team
project codebase.

Source archive:

- `C:/Users/kmg/Downloads/travel-safe-platform-main.zip`

Extracted files:

- `travel-safe-platform-main/src/main/resources/templates/`
- `travel-safe-platform-main/src/main/resources/static/`
- `travel-safe-platform-main/src/main/resources/data.csv`
- `travel-safe-platform-main/src/main/resources/police.csv`
- `travel-safe-platform-main/README.md`

Purpose:

- Preserve the final SAFE TRIP page layout, CSS, images, and client-side flows.
- Use these files as a migration reference when rebuilding the service with
  Python/FastAPI.
- Keep the existing UI/UX as stable as possible while replacing the Java/Spring
  backend with FastAPI, Jinja2 templates, and selected JSON APIs.

Notes for migration:

- Thymeleaf attributes such as `th:href`, `th:each`, `th:text`, and
  `th:replace` need to be converted to Jinja2 syntax.
- Spring Security and CSRF fragments should not be copied directly. Rebuild
  authentication and CSRF handling later if the FastAPI version needs login.
- Kakao Map usage should be kept, but the API key must be loaded from an
  environment variable. Do not commit real API keys.
- API calls such as `/api/search`, `/api/reports/{id}`, and
  `/api/map/regions/{id}` can be reimplemented with FastAPI routers.

