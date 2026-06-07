<div align="center">

<img src="./tripick_banner.png" alt="Tripick" width="600"/>

<br/>
<br/>
**단 한 번의 지역 검색으로 맛집·카페·숙박·관광명소를 한눈에**

카카오 로컬 API 기반 지역 여행 정보 탐색 플랫폼

<br/>


</div>

---

## 📌 프로젝트 소개

여행을 계획할 때마다 식당은 포털에서, 숙소는 예약 앱에서, 관광지는 SNS에서 따로 찾아야 하는 번거로움을 느낀 적 있으신가요?

**Tripick**은 동네 이름 하나만 검색하면 그 지역의 핵심 스팟(맛집·카페·숙박·관광명소)을 실시간으로 한 화면에 모아주는 프론트엔드 중심 여행 정보 탐색 웹 앱입니다.

<br/>

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **지역 검색** | 동네 이름 입력 한 번으로 주변 장소 실시간 탐색 |
| 🏷 **카테고리 필터** | 맛집 / 카페 / 숙박 / 관광명소 탭 필터링 |
| 📍 **추천 태그** | 요즘 핫플레이스 & 숨겨진 로컬 스팟 큐레이션 |
| 🪟 **상세 모달** | 글래스모피즘 오버레이로 장소 상세 정보 확인 |
| 📞 **바로 연결** | 전화 걸기 연동 및 카카오맵 아웃링크 |

<br/>

## 🖥 화면 구성

```
메인 화면 (Home)
 └─ 검색창 + 추천 태그 버튼 (요즘 핫플 / 숨겨진 로컬)

결과 화면 (Dashboard)
 └─ 카테고리 탭 필터 + 장소 카드 리스트

상세 화면 (Detail)
 └─ 글래스모피즘 모달 + 전화·카카오맵 링크
```

<br/>

## ⚙️ 데이터 흐름

```
사용자 검색 입력
    ↓
1차 API 요청 — 카카오 키워드 API로 지역 좌표(x, y) 추출
    ↓
2차 API 요청 — Promise.all로 5개 카테고리 병렬 요청
    (FD6 맛집 / CE7 카페 / AD5 숙박 / AT4 관광 / CT1 문화)
    ↓
중복 제거 후 단일 배열로 병합 → 화면에 렌더링
```

<br/>

## 🗂 컴포넌트 구조

```
src/
├── App.jsx               전역 상태 및 API 호출 로직 총괄
├── App.css               전역 스타일 및 애니메이션
├── api/
│   └── kakaoApi.js       카카오 API 통신 모듈
├── assets/
│   └── tripick_logo.svg  서비스 로고
└── components/
    ├── Header.jsx         로고 및 홈 이동
    ├── SearchBar.jsx      검색창 및 사용자 입력 처리
    ├── PlaceList.jsx      카테고리 탭 + 카드 목록 렌더링
    └── PlaceModal.jsx     장소 상세 오버레이 모달

public/
└── favicon.svg
```

<br/>

## 🔑 환경변수

```env
VITE_KAKAO_API_KEY=your_kakao_local_api_key
```

> 카카오 API 키는 [Kakao Developers](https://developers.kakao.com)에서 발급받을 수 있습니다.

<br/>

## 🛣 향후 개발 계획

- [ ] `navigator.geolocation` 활용 거리순 정렬 필터
- [ ] 유저 커뮤니티 피드 (핫플 웨이팅 / 후기 공유)
- [ ] Node.js + MySQL 백엔드 연동 및 회원가입/로그인

<br/>

## 📚 참고자료

- [Kakao Local API 공식 문서](https://developers.kakao.com/docs/latest/ko/local/common)
- [Vite 환경변수 가이드](https://vitejs.dev/guide/env-and-mode.html)
- [Pretendard 폰트](https://github.com/orioncactus/pretendard)

<br/>

<div align="center">
  <sub>Tripick · 2026-1학기 웹프로그래밍실습 기말 프로젝트</sub>
</div>
