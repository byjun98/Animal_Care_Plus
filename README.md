<div align="center">

# 🐾 AniCare Plus (에케플)

**반려동물 통합 케어 플랫폼 — AI 기반 견종·피부질환 분석, 접종 스케줄링, 위치 기반 시설 검색**

React · Kakao Maps SDK · Uploadcare · GPT API · Spring Boot · TensorFlow

[![Frontend](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Spring_Boot_3.2-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![AI](https://img.shields.io/badge/AI-TensorFlow_2.x-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)

</div>

---

## 목차

- [프로젝트 소개](#-프로젝트-소개)
- [시연 영상](#-시연-영상)
- [시스템 아키텍처](#-시스템-아키텍처)
- [기술 스택 & 선택 이유](#-기술-스택--선택-이유)
- [프론트엔드 핵심 기술 상세](#-프론트엔드-핵심-기술-상세)
  - [카카오맵 위치 기반 검색 시스템](#1-카카오맵-위치-기반-검색-시스템)
  - [접종 스케줄링 알고리즘](#2-접종-스케줄링-알고리즘)
  - [AI 분석 파이프라인과 프론트 연동](#3-ai-분석-파이프라인과-프론트-연동)
  - [게시판 시스템과 상태 관리](#4-게시판-시스템과-상태-관리)
  - [인증 흐름과 전역 상태 관리](#5-인증-흐름과-전역-상태-관리)
  - [반응형 UI 설계](#6-반응형-ui-설계)
- [백엔드 기능 소개](#-백엔드-기능-소개)
- [AI 기능 소개](#-ai-기능-소개)
- [담당 역할](#-담당-역할)
- [프로젝트 구조](#-프로젝트-구조)
- [실행 방법](#-실행-방법)

---

## 프로젝트 소개

AniCare Plus는 반려동물 보호자를 위한 **통합 케어 플랫폼**입니다.

단순히 정보를 나열하는 것이 아닌, **사용자의 사진 한 장으로부터 AI 분석 → GPT 케어 가이드 생성 → 챗봇 응답**까지 이어지는 **엔드투엔드 파이프라인**을 프론트엔드에서 설계했습니다. 이 과정에서 게임 클라이언트 개발과 공통되는 **상태 머신 기반 흐름 제어, 비동기 리소스 로딩, 실시간 UI 피드백** 패턴을 적용했습니다.

### 주요 기능 미리보기

| 기능        | 스크린샷                            | 핵심 기술                                 |
| --------- | ------------------------------- | ------------------------------------- |
| **AI 분석** | ![AI 분석](./assets/ai.png)       | Uploadcare 이미지 파이프라인, 상태 머신 기반 로딩 UX  |
| **카카오맵**  | ![카카오맵](./assets/kakao_map.png) | Geolocation → Places API 연계, 반경 기반 검색 |
| **접종 관리** | ![접종](./assets/vaccination.png) | 날짜 연산 알고리즘, 접종 데이터 룩업 테이블             |
| **챗봇**    | ![챗봇](./assets/chatbot.png)     | AI 결과 → GPT 프롬프트 동적 생성, 스트리밍 UI       |
| **상점**    | ![상점](./assets/shop.png)        | 실시간 필터 검색, MUI Grid 반응형 레이아웃          |

---

## 시연 영상

<div align="center">

[![AniCare Plus 시연 영상](https://img.youtube.com/vi/fQksFg8KBwA/0.jpg)](https://youtube.com/shorts/fQksFg8KBwA)

▲ 클릭하면 시연 영상으로 이동합니다

</div>

> 📁 추가 시연 영상은 `assets/` 폴더에서 확인할 수 있습니다.

---

## 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React 18)                     │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ 카카오맵  │  │ AI 카메라 │  │ 게시판   │  │ 접종 관리  │  │
│  │ kakao.js │  │camera.js │  │ Board.js │  │ vaccin.js  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       │             │             │               │         │
│       │   ┌─────────┴─────────┐   │               │         │
│       │   │ AuthContext (JWT)  │   │               │         │
│       │   │ 전역 인증 상태 관리  │   │               │         │
│       │   └─────────┬─────────┘   │               │         │
│       │             │             │               │         │
│  ─────┴─────────────┴─────────────┴───────────────┴─────    │
│            setupProxy.js  (Proxy → localhost:8081)           │
└────────────────────────────┬────────────────────────────────┘
                             │  HTTP (REST API)
                             ▼
┌────────────────────────────────────────────────────────────┐
│              Backend (Spring Boot 3.2 / Java 17)           │
│                                                            │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ BoardService │  │ UserService  │  │ ImageController │   │
│  │ 게시판 CRUD  │  │ JWT 인증     │  │ AI 프로세스 호출 │   │
│  └──────┬──────┘  └──────┬───────┘  └───────┬─────────┘   │
│         │               │                   │              │
│         ▼               ▼                   │              │
│     MySQL / H2     JwtUtil (인증)            │              │
└─────────────────────────────────────────────┼──────────────┘
                             ProcessBuilder   │
                             (자식 프로세스)    ▼
┌────────────────────────────────────────────────────────────┐
│              AI Server (Python / TensorFlow)               │
│                                                            │
│  ┌──────────────────┐  ┌───────────────────────────────┐   │
│  │ pet.py           │  │ SkinDisease.py                │   │
│  │ 견종 분류         │  │ 피부질환 분류                  │   │
│  │ 앙상블:           │  │ 앙상블:                       │   │
│  │  InceptionV3     │  │  3개 CNN 모델 평균 예측        │   │
│  │  Xception        │  │  (벼룩알러지/핫스팟/옴/백선)    │   │
│  │  NASNetLarge     │  └───────────────────────────────┘   │
│  │  InceptionResV2  │  ┌───────────────────────────────┐   │
│  └──────────────────┘  │ news.py                       │   │
│                        │ 네이버 뉴스 크롤링 (강아지 키워드)│   │
│                        └───────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 기술 스택 & 선택 이유

### Frontend

| 기술                       | 선택 이유                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **React 18 (CRA)**       | 컴포넌트 단위의 UI 구성이 게임 엔진의 **씬/노드 계층 구조**와 유사. `useEffect`로 생명주기를 제어하는 패턴은 게임 클라이언트의 `Start()` / `Update()` / `OnDestroy()` 흐름과 같음 |
| **Context API**          | 전역 인증 상태를 Props Drilling 없이 관리. 게임에서 **Global Game State**를 싱글턴으로 관리하는 것과 동일한 설계 의도                                            |
| **react-kakao-maps-sdk** | Kakao Maps JavaScript SDK의 React 래퍼. 외부 SDK의 명령형 API를 React의 선언형 패턴으로 전환                                                       |
| **styled-components**    | CSS-in-JS로 **동적 스타일링** 구현. 상태에 따라 UI가 변하는 패턴은 게임 UI에서 상태 변경 시 비주얼을 갱신하는 것과 같음                                                  |
| **MUI (Material UI)**    | 게시판, 상점 등 양이 많은 CRUD 페이지에서 **일관된 UX**를 빠르게 구현하기 위해 사용                                                                          |
| **Uploadcare**           | 이미지 업로드를 위젯 형태로 제공해 **카메라/파일 접근을 추상화**. 게임 개발에서 에셋 임포트 파이프라인을 라이브러리에 위임하는 것과 유사                                                |
| **Axios + setupProxy**   | 개발 중 CORS 없이 백엔드와 통신. `http-proxy-middleware`로 `/api` 경로를 리버스 프록시하여 배포 시에는 Nginx에서 동일하게 처리                                     |

### Backend / AI (기능 소개)

| 기술                     | 역할                                     |
| ---------------------- | -------------------------------------- |
| **Spring Boot 3.2**    | REST API 서버, JWT 인증, JPA 기반 데이터 관리     |
| **TensorFlow (Keras)** | 견종 분류 (4개 모델 앙상블), 피부질환 분류 (3개 모델 앙상블) |
| **BeautifulSoup**      | 네이버 뉴스 크롤링                             |

---

## 프론트엔드 핵심 기술 상세

### 1. 카카오맵 위치 기반 검색 시스템

<details>
<summary><b> 기술 상세 펼치기</b></summary>

![카카오맵](./assets/kakao_map.png)

#### 왜 이렇게 설계했는가

게임 클라이언트에서 **미니맵 시스템**을 구현할 때와 마찬가지로, 지도 컴포넌트는 **카메라(뷰포트)의 위치 상태**와 **엔티티(마커)의 위치 데이터**를 분리해서 관리해야 합니다.

```
사용자 위치(center) ─→ 검색 기준점 ─→ Places API 호출 ─→ 검색 결과(search[])
       │                                                       │
       ▼                                                       ▼
   현재 위치 마커                                        결과 마커 렌더링
       │                                                       │
       └──── 지도 Bounds 계산 ─── setBounds() ──── 뷰포트 자동 조정
```

#### 핵심 알고리즘: 반경 기반 키워드 검색

```javascript
// kakao.js — searchPlaces 함수
const searchPlaces = (center, page) => {
  const ps = new kakao.maps.services.Places();
  const options = {
    location: new kakao.maps.LatLng(center.lat, center.lng),
    radius: 5000,         // 반경 5km
    sort: kakao.maps.services.SortBy.DISTANCE,  // 거리순 정렬
    page,
  };

  ps.keywordSearch(keyword, (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색 결과만으로 Bounds 계산 → 지도 영역 자동 조정
      const bounds = new kakao.maps.LatLngBounds();
      data.forEach((item) => bounds.extend(
        new kakao.maps.LatLng(item.y, item.x)
      ));
      map.setBounds(bounds);
    }
  }, options);
};
```

**게임 개발 관점과의 유사성:**  

- `setBounds()` = 게임의 **Camera.SetBounds()** (여러 오브젝트를 모두 포함하도록 카메라 뷰포트 조정)
- `panTo()` = 게임의 **Camera.SmoothFollow()** (특정 오브젝트로 카메라를 부드럽게 이동)
- 마커 클릭 시 `CustomOverlayMap` 오버레이 표시 = 게임의 **World Space UI** (3D 오브젝트에 붙는 이름표/HP바)

#### 상태 머신: 재검색과 키워드 전환

```
                     ┌──────────────┐
                     │ 초기 로딩     │
                     │ (Geolocation) │
                     └──────┬───────┘
                            │ 위치 획득
                            ▼
               ┌──────────────────────┐
               │ 현재 위치 기반 검색   │ ◀─── 키워드 변경 트리거
               │ (center = 사용자위치) │
               └──────────┬───────────┘
                          │ 사용자가 지도 이동
                          ▼
               ┌──────────────────────┐
               │ "현 지도에서 검색" 클릭 │
               │ (center = 지도 중심점) │
               │ → lastCenter에 저장   │
               └──────────┬───────────┘
                          │ 키워드 변경
                          ▼
               ┌──────────────────────┐
               │ lastCenter 기반 검색  │
               │ (이동한 위치를 기억)   │
               └──────────────────────┘
```

`lastCenter` 상태 변수의 도입으로, 사용자가 지도를 이동한 후 키워드만 바꿔도 **이전에 보던 영역에서 재검색**이 됩니다. 이는 게임에서 **카메라 위치를 별도 변수에 캐시**하여 뷰 전환 시에도 유지하는 패턴과 동일합니다.

#### 반응형 분기: PC 사이드바 vs 모바일 바텀시트

```javascript
const isMobile = useMediaQuery({ maxWidth: 768 });

// PC: 사이드바 (왼쪽 슬라이드)
{!isMobile && (
  <S.ListContainer isClosed={!isSidebarOpen}>
    <Modal search={search} ... />
    <S.SideBarOpenBtn onClick={() => setIsSidebarOpen(prev => !prev)} />
  </S.ListContainer>
)}

// 모바일: 바텀시트 (아래서 위로 슬라이드)
{isMobile && (
  <S.Modal>
    <S.ModalBtn onClick={() => setIsModalOpen(prev => !prev)} />
    <Modal search={search} ... />
  </S.Modal>
)}
```

**동일한 `<Modal>` 컴포넌트를 두 가지 레이아웃으로 렌더링**합니다. 게임 개발에서 같은 UI 데이터에 대해 PC용/모바일용 프리팹을 별도로 두는 것과 같은 접근입니다.

</details>

---

### 2. 접종 스케줄링 알고리즘

<details>
<summary><b> 기술 상세 펼치기</b></summary>

![접종 관리](./assets/vaccination.png)

#### 왜 이렇게 설계했는가

접종 데이터는 **4종 백신 × 3단계 접종 차수 = 12가지 조합**이며, 각 조합마다 다음 접종까지의 간격이 다릅니다. 이를 if/else로 처리하면 조건 분기가 기하급수적으로 늘어나므로, **룩업 테이블 패턴**을 사용했습니다.

#### 룩업 테이블 기반 데이터 구조

```javascript
// vaccindata.js — 접종 데이터 룩업 테이블
const vaccindata1 = [
  {
    name: "파라인플루엔자",
    num: 0,                    // 과거 접종 횟수 (0=미접종, 1=1차, 2=2차)
    content: "강아지에서 발생하는 호흡기 감염...",
    vaccindatacontent: `첫 번째 접종: 6~8주...<br>...`,
    date: 210                  // 다음 접종까지 D+일수
  },
  // ... 총 12개 엔트리 (4종 × 3차수)
];
```

#### 다음 접종일 계산 알고리즘

```javascript
// vaccin.js — 핵심 계산 로직
// 1. 룩업 테이블에서 (백신 종류, 접종 차수) 조합으로 데이터 검색
const selectedVaccinData = vaccindata1.find(
  item => item.name == vaccin && item.num === vaccinyn
);

// 2. 사용자가 선택한 날짜 + 간격일수 → 다음 접종 예정일 계산
const formattedDateObject = selectedVaccinData
  ? new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + selectedVaccinData.date  // D+ 연산
    )
  : null;
```

**게임 개발 관점의 유사성:**  

- 룩업 테이블 = 게임의 **데이터 테이블** (스킬 쿨다운, 레벨업 경험치표 등)
- `find()` 검색 = 게임에서 아이템 ID로 데이터 테이블 조회하는 것
- 서버가 아닌 **클라이언트에서 계산**하는 이유: 접종 데이터가 정적이고, 서버 왕복 없이 즉시 피드백이 필요하기 때문 (게임에서 UI 관련 연산은 클라이언트에서 처리하는 것과 동일)

#### UI 상태 전이: 선택 → 분석 → 결과 모달

```
백신 미선택         백신 선택          차수 선택         날짜 선택 + 분석
┌──────┐        ┌──────┐         ┌──────┐         ┌──────────┐
│      │──click─│ 강조  │──click──│ 강조 │──click──│ 결과 모달 │
│      │        │ 표시  │         │ 표시 │         │ 슬라이드  │
└──────┘        └──────┘         └──────┘         └──────────┘

  CSS className 토글: `vaccinselect` → `vaccinselect VaccinSelected`
  모달 활성화:  `vaccinMod` → `vaccinMod active`
```

</details>

---

### 3. AI 분석 파이프라인과 프론트 연동

<details>
<summary><b> 기술 상세 펼치기</b></summary>

![AI 분석](./assets/ai.png)
![챗봇](./assets/chatbot.png)

#### 전체 데이터 흐름

이 파이프라인이 가장 기술적으로 의미 있는 부분입니다. **사진 한 장 → AI 분석 → 자연어 가이드**까지의 흐름을 프론트에서 오케스트레이션합니다.

```
[사용자]                [Camera.js]              [Backend]            [AI Python]        [Chatbot]
   │                       │                        │                     │                 │
   │  이미지 선택            │                        │                     │                 │
   │ ─────────────────────▶│                        │                     │                 │
   │                       │                        │                     │                 │
   │                       │ FormData + POST         │                     │                 │
   │                       │ /api/images/pet         │                     │                 │
   │                       │───────────────────────▶│                     │                 │
   │                       │                        │                     │                 │
   │                       │                        │  ProcessBuilder     │                 │
   │                       │                        │  python pet.py      │                 │
   │                       │                        │────────────────────▶│                 │
   │                       │                        │                     │                 │
   │                       │                        │    견종명 반환       │                 │
   │                       │                        │◀────────────────────│                 │
   │                       │                        │                     │                 │
   │                       │   견종명 (String)       │                     │                 │
   │                       │◀───────────────────────│                     │                 │
   │                       │                        │                     │                 │
   │                       │ 프롬프트 동적 생성:      │                     │                 │
   │                       │ `${견종} 케어법을 알려줘` │                     │                 │
   │                       │──── navigate('/chatbot', { state: { question } }) ──────────▶│
   │                       │                        │                     │                 │
   │                       │                        │                     │     GPT 응답     │
   │◀────────────────────────────────────────────────────────────────────────────────────│
```

#### 핵심 코드: 분석 → 챗봇 전환

```javascript
// camera.js — handleUpload
const handleUpload = async (endpoint) => {
  setLoading(true);  // 로딩 모달 활성화 (틈새 꿀팁 표시)

  const formData = new FormData();
  formData.append('image', files[0].file);

  const response = await axios.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  const responseData = response.data;  // "golden_retriever" 같은 견종명

  // AI 결과 → GPT 프롬프트로 변환 → 챗봇 페이지에 전달
  const question = `강아지 전문가 애케플! 한글로 ${responseData} 견종의 케어법을 다섯줄 이내로 알려줘~`;
  navigate('/chatbot', { state: { question } });
};
```

**게임 개발 관점:**  
이 흐름은 게임에서 **로딩 화면 → 씬 전환**과 동일합니다:

1. **비동기 리소스 로딩** (이미지 업로드 + AI 분석 대기)
2. **로딩 중 사용자 피드백** (`setLoading(true)` → 로딩 모달에 5초 간격 꿀팁 롤링)
3. **씬 전환 시 데이터 전달** (`navigate`의 `state`를 통해 다음 씬에 데이터 주입)

#### 로딩 중 UX 처리

```javascript
// camera.js — 로딩 중 5초 간격 팁 롤링
const paragraphs = [
  "강아지의 집은 화장실과 멀리 떨어진 곳에 위치하는 걸 아시나요?",
  "강아지가 귀여워도 소리 지르지 말기!",
  // ...
];
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
  }, 5000);
  return () => clearInterval(interval);
}, [paragraphs.length]);
```

게임에서 로딩 화면 중 **랜덤 팁을 표시**하는 것과 동일한 패턴입니다. `setInterval` + `clearInterval`로 타이머를 관리하고, `%` 연산자로 배열을 순환합니다.

</details>

---

### 4. 게시판 시스템과 상태 관리

<details>
<summary><b> 기술 상세 펼치기</b></summary>

#### 설계 의도

게시판은 **축적형 데이터(게시글)를 효율적으로 로드하고 표시하는 문제**입니다. 게임에서 리더보드나 인벤토리 목록을 처리하는 것과 같은 패턴이 필요합니다.

#### 게시글 목록 + 개별 본문 비동기 로딩

```javascript
// Voc.js — 2단계 데이터 로딩
// 1단계: 목록 전체 fetch (id, title, likeCount, commentCount)
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get('/api/posts');
    const sortedData = response.data.response.sort((a, b) => b.id - a.id);
    setData(sortedData);
  };
  fetchData();
}, [tabValue]);

// 2단계: 각 게시글의 본문 첫 줄만 개별 fetch (미리보기용)
useEffect(() => {
  const loadContents = async () => {
    const contents = {};
    for (const voc of data) {
      contents[voc.id] = await fetchContent(voc.id);
    }
    setPostContents(contents);
  };
  if (data.length > 0) loadContents();
}, [data]);
```

**왜 2단계로 나눴는가:**  
목록 API가 본문을 포함하지 않기 때문에, 각 게시글의 본문을 개별적으로 가져옵니다. 게임에서 **인벤토리 목록은 서버에서 한번에 가져오고, 아이템 상세 설명은 클릭 시 혹은 레이지 로딩**하는 것과 같은 접근입니다.

#### 탭 기반 필터링: 인기글 분기

```javascript
// tabValue에 따라 같은 API에서 다른 필터 적용
if (tabValue === 0) {
  response = await axios.get('/api/posts');  // 전체
} else if (tabValue === 1) {
  response = await axios.get('/api/posts');
  // 좋아요 10개 이상만 필터링 (클라이언트 필터)
  response.data.response = response.data.response.filter(
    post => post.likeCount >= 10
  );
}
```

#### 날짜 파싱: 커스텀 포맷 → Date 객체

```javascript
// 서버에서 "202406151430" 형태로 내려오는 날짜를 파싱
function parseCustomDate(dateString) {
  const year   = parseInt(dateString.slice(0, 4), 10);
  const month  = parseInt(dateString.slice(4, 6), 10) - 1;
  const day    = parseInt(dateString.slice(6, 8), 10);
  const hour   = parseInt(dateString.slice(8, 10), 10);
  const minute = parseInt(dateString.slice(10, 12), 10);
  return new Date(year, month, day, hour, minute);
}
```

서버와 클라이언트 사이의 **날짜 직렬화 포맷 차이**를 프론트에서 처리합니다. 게임 클라이언트에서 서버 패킷의 바이트 스트림을 파싱하는 것과 유사한 역할입니다.

</details>

---

### 5. 인증 흐름과 전역 상태 관리

<details>
<summary><b> 기술 상세 펼치기</b></summary>

#### Context API를 사용한 이유

Redux나 Zustand 같은 외부 상태 관리 라이브러리 없이 **Context API만**으로 구현했습니다. 관리해야 할 전역 상태가 `isLoggedIn`, `accessToken`, `userAccountname` 세 가지로 한정되어 있어, 오히려 외부 라이브러리 도입이 **오버엔지니어링**이 됩니다.

이것은 게임에서 **간단한 상태는 전역 변수로, 복잡한 상태는 상태 머신으로** 관리하는 판단과 같습니다.

#### 인증 흐름 다이어그램

```
[Login 컴포넌트]
     │
     │  POST /api/user/login
     │  { username, password }
     ▼
[Backend JWT 발급]
     │
     │  { token: "eyJhb..." }
     ▼
[AuthContext.login()]
     │
     ├─ localStorage.setItem('accessToken', token)
     ├─ localStorage.setItem('userAccountname', username)
     ├─ setAccessToken(token)
     ├─ setUserAccountname(username)
     └─ setIsLoggedIn(true)
     │
     ▼
[<Navigate to="/main" />]  ← 리다이렉트
```

#### 앱 재시작 시 토큰 복원

```javascript
// AuthContext.js — 마운트 시 localStorage에서 토큰 검사
useEffect(() => {
  const token = localStorage.getItem('accessToken');
  const username = localStorage.getItem('userAccountname');
  if (token && username) {
    login(token, username);  // 상태 복원
  }
}, []);
```

이 패턴은 게임에서 **자동 로그인**을 구현할 때 디바이스 저장소에서 인증 토큰을 읽어오는 것과 동일합니다.

#### 입력 유효성 검사 (정규식)

```javascript
const validateUsername = (username) => {
  const usernameRegex = /^[a-z0-9]{4,10}$/;  // 4~10자, 영소문자+숫자
  return usernameRegex.test(username);
};

const validatePassword = (password) => {
  const passwordRegex = /^[a-z0-9]{8,15}$/;  // 8~15자, 영소문자+숫자
  return passwordRegex.test(password);
};
```

서버에 요청을 보내기 전에 **클라이언트에서 먼저 유효성 검사**를 하여 불필요한 네트워크 비용을 줄입니다.

</details>

---

### 6. 반응형 UI 설계

<details>
<summary><b> 기술 상세 펼치기</b></summary>

#### styled-components의 동적 스타일링

```javascript
// Kakao.style.js — isModalOpen 상태에 따라 버튼 위치 변경
export const GoBackButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;

  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 340px;   // 모달이 열리면 버튼이 위로 밀려남
        transition: 0.3s;
      }
    `}
`;
```

**게임 개발 관점:**  
게임 UI에서 다른 패널이 열릴 때 기존 버튼을 밀어내는 것과 동일합니다. `isModalOpen`이라는 **게임 상태에 따라 UI 배치가 동적으로 변하는 반응형 패턴**입니다.

#### 메인 페이지 캐러셀: CSS Transform 기반 슬라이드

```javascript
// maincomponent.js — 이미지 슬라이더
const translateValue = -currentImageIndex * 100;  // 0%, -100%, -200%

<div style={{ transform: `translateX(${translateValue}vw)` }}>
  {/* 포메라니안 | 시바견 | 리트리버 */}
</div>
```

JavaScript 애니메이션 대신 **CSS `transform` + `transition`으로 60fps 애니메이션**을 구현합니다. GPU 가속이 적용되는 `transform` 속성만 변경하므로, 게임에서 **UI 요소를 transform으로만 이동시켜 드로우콜 최적화**하는 것과 같은 원리입니다.

#### 게이지바 애니메이션: 견종별 인기도 시각화

```javascript
// 견종 전환 시 게이지 값 업데이트 → CSS transition으로 애니메이션
useEffect(() => {
  if (currentImageIndex === 0) {
    newGagebars = { gagebar1: 60, gagebar2: 50, gagebar3: 20, gagebar4: 20 };
  } else if (currentImageIndex === 1) {
    newGagebars = { gagebar1: 10, gagebar2: 50, gagebar3: 60, gagebar4: 20 };
  }
  setGagebars(newGagebars);
}, [currentImageIndex]);

// CSS
style={{ width: `${gagebars.gagebar1}%`, transition: "width 1s ease-in-out" }}
```

**상태 변경 → CSS transition → 부드러운 애니메이션** 체인입니다. 게임에서 HP바의 값이 변할 때 즉시 변하지 않고 **트윈(tween) 애니메이션으로 서서히 변하는 것**과 동일한 패턴입니다.

</details>

---

## 백엔드 기능 소개

| 기능           | 설명                                                        |
| ------------ | --------------------------------------------------------- |
| **JWT 인증**   | Spring Security + `JwtUtil`을 통한 토큰 기반 인증/인가               |
| **게시판 CRUD** | `BoardController` → `BoardService` → JPA Repository 계층 구조 |
| **댓글 시스템**   | 게시글별 댓글 CRUD, 작성자 권한으로 삭제 제어                              |
| **좋아요**      | 사용자별 좋아요 토글, 중복 방지                                        |
| **이미지 처리**   | `ImageController`에서 파일 저장 → Python 프로세스 호출 → AI 결과 반환     |
| **뉴스 크롤링**   | `ProcessBuilder`로 `news.py` 실행, 네이버 뉴스 최신 기사 제공           |

---

## AI 기능 소개

| 기능          | 모델                                                           | 설명                                         |
| ----------- | ------------------------------------------------------------ | ------------------------------------------ |
| **견종 분류**   | InceptionV3 + Xception + NASNetLarge + InceptionResNetV2 앙상블 | 4개 사전학습 모델의 feature를 `concatenate`하여 최종 분류 |
| **피부질환 분류** | 3개 CNN 모델 앙상블 (`ensemble_predict`)                           | 벼룩알러지, 핫스팟, 옴, 백선 4개 질환 분류                 |
| **뉴스 크롤링**  | BeautifulSoup                                                | 네이버 "강아지" 키워드 뉴스 최신 기사 + 이미지 추출            |

---

## 담당 역할

### 프론트엔드 (주 담당)

| 영역            | 구체적 작업                                         | 기술적 포인트               |
| ------------- | ---------------------------------------------- | --------------------- |
| **API 통신 구조** | Axios 인스턴스 + setupProxy 리버스 프록시 설계             | CORS 회피, 환경별 엔드포인트 관리 |
| **인증 시스템**    | JWT 로그인 → Context API 전역 상태 → localStorage 영속화 | 토큰 기반 인증 풀 사이클 구현     |
| **카카오맵**      | Geolocation → Places API → 마커·오버레이 → 카카오톡 공유   | 위치 기반 서비스 전체 파이프라인    |
| **게시판 전체**    | 목록/상세/작성/수정/삭제 + 댓글 CRUD + 삭제 모달               | MUI 기반 CRUD 풀 구현      |
| **AI 연동**     | 이미지 업로드 → 백엔드 AI 호출 → 결과를 GPT 프롬프트로 변환 → 챗봇 전달 | 비동기 파이프라인 오케스트레이션     |
| **접종 관리**     | 룩업 테이블 기반 다음 접종일 연산 + 모달 결과 표시                 | 정적 데이터 기반 클라이언트 연산    |
| **공통 모달**     | 삭제 확인, 알림, 접종 결과 모달 컴포넌트                       | 재사용 가능한 UI 컴포넌트 설계    |

### 공동 작업

- 카메라 촬영 UI (이미지 업로드 위젯 통합)
- 메인 페이지 캐러셀 UI
- 일부 레이아웃 스타일링

---

## 프로젝트 구조

```
Animal_Care_Plus/
├── assets/                          # 시연 이미지 / 영상
│   ├── ai.png
│   ├── chatbot.png
│   ├── kakao_map.png
│   ├── shop.png
│   ├── vaccination.png
│   └── Demonstration video*.mp4
│
├── Animal_Care_Plus_frontend/       # React 프론트엔드
│   └── src/
│       ├── App.js                   # 라우팅 (React Router v6)
│       ├── setupProxy.js            # 개발 프록시 설정
│       ├── shopdata.js              # 상점 정적 데이터
│       ├── vaccindata.js            # 접종 룩업 테이블 (12엔트리)
│       ├── component/
│       │   ├── context/
│       │   │   └── AuthContext.js    # 전역 인증 상태 관리
│       │   ├── kakao.js             # 카카오맵 (위치검색/마커/오버레이)
│       │   ├── Kakao.style.js       # 카카오맵 styled-components
│       │   ├── modal.js             # 검색 결과 모달 + 카카오톡 공유
│       │   ├── camera.js            # AI 분석 이미지 업로드
│       │   ├── cbot.js              # 챗봇 페이지 래퍼
│       │   ├── Chatbot.js           # 챗봇 UI 컴포넌트
│       │   ├── vaccin.js            # 접종 스케줄링
│       │   ├── logincomponent.js    # 로그인 (유효성 검사)
│       │   ├── signup.js            # 회원가입
│       │   ├── maincomponent.js     # 메인 캐러셀 + 게이지바
│       │   ├── mainpagecomponent.js # 메인 페이지 레이아웃
│       │   ├── shoppage.js          # 상점 목록 + 검색
│       │   ├── shopdetail.js        # 상점 상세
│       │   ├── Board.js             # 게시판 페이지 래퍼
│       │   ├── PostDetail.js        # 게시글 상세 래퍼
│       │   └── board/               # 게시판 서브 컴포넌트
│       │       ├── Voc.js           # 게시글 목록 (MUI)
│       │       ├── VocView.js       # 게시글 상세뷰
│       │       ├── VocQuestion.js   # 게시글 작성
│       │       ├── EditPost.js      # 게시글 수정
│       │       └── CommonTable*.js  # 테이블 공통 컴포넌트
│       └── css/                     # 스타일시트
│
├── Animal_Care_Plus_backend/        # Spring Boot 백엔드
│   └── src/main/java/com/board/
│       ├── controller/              # REST 컨트롤러
│       ├── service/                 # 비즈니스 로직
│       ├── entity/                  # JPA 엔티티
│       ├── repository/              # JPA 리포지토리
│       ├── dto/                     # 요청/응답 DTO
│       ├── jwt/                     # JWT 필터 & 유틸
│       └── config/                  # Security, MVC 설정
│
└── Animal_Care_puls_ai/             # AI 모듈 (Python)
    ├── pet.py                       # 견종 분류 스크립트
    ├── SkinDisease.py               # 피부질환 분류 스크립트
    ├── news.py                      # 뉴스 크롤링 스크립트
    ├── Kind/                        # 견종 모델 & 데이터
    │   ├── my_model.h5
    │   └── labels.csv
    └── Skin/                        # 피부질환 모델
        └── SkinDisease*.h5
```

---

## 실행 방법

### 프론트엔드

```bash
cd Animal_Care_Plus_frontend
npm install
npm start
# → http://localhost:3000
```

### 백엔드

```bash
cd Animal_Care_Plus_backend
./gradlew bootRun
# → http://localhost:8081
# application.properties에서 DB 설정 필요 (MySQL 또는 H2)
```

### AI 서버

```bash
cd Animal_Care_puls_ai
pip install tensorflow pandas requests beautifulsoup4
# 모델 파일(.h5)이 Kind/, Skin/ 폴더에 있어야 합니다
python pet.py <이미지경로>        # 견종 분류
python SkinDisease.py <이미지경로> # 피부질환 분류
```

---

<div align="center">

**AniCare Plus** · 2024 · 프론트엔드 중심 프로젝트

</div>
