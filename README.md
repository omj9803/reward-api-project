# 🎁 NestJS 보상 시스템 과제

이 프로젝트는 NestJS 기반 마이크로서비스 구조로 구현된 **이벤트 기반 보상 처리 시스템**입니다.  
인증, 이벤트 생성, 보상 요청, 조건 검증, 권한 제어 등 다양한 기능을 통합적으로 설계했습니다.

---

## 🚀 실행 방법 (Docker Compose)

```bash
docker compose up --build

## ⚙️ 주요 기능
### 🧩 인증 및 역할 제어
회원가입 / 로그인 (JWT 발급)
사용자 역할: USER, OPERATOR, ADMIN
역할별 접근 권한 제어

###📅 이벤트 및 보상 처리
이벤트 등록 / 조회 (POST /events, GET /events)
보상 등록 / 조회 (POST /rewards, GET /rewards)
보상 요청 생성 및 조회 (POST /reward-requests)

### ✅ 조건 검증 및 상태 관리
보상 요청 시 이벤트 조건 (condition) 검증
중복 요청 방지 (userId + eventId 유일)
요청 상태 기록: PENDING, REJECTED, APPROVED
요청 실패 시 사유(reason) 저장

## 🧪 테스트 (Postman)
POST /auth/register
POST /auth/login → JWT 토큰 발급
토큰을 Authorization: Bearer <token> 헤더로 설정 후 아래 호출
POST /events
POST /rewards
POST /reward-requests
GET /reward-requests/my