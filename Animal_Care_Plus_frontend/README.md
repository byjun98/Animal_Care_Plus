# AniCare Frontend

## 프로젝트 개요
AniCare는 반려동물의 건강 상태를 기록하고, 카메라 촬영 및 AI 분석을 통해 맞춤형 케어 정보를 제공하는 웹 기반 서비스입니다.
본 저장소는 해당 서비스의 프론트엔드로, React 기반 UI와 지도, 게시판, AI 연동 기능을 포함합니다.

---

## 시연 이미지
본 프로젝트의 주요 기능 시연 화면입니다.  
이미지는 `/assets` 폴더에 업로드하여 관리합니다.

### 메인 화면
![메인 화면](./assets/demo_main.png)

### 촬영 화면
![카메라 촬영](./assets/demo_camera.gif)

### 게시판 목록
![게시판 목록](./assets/demo_board.png)

### 게시글 상세 페이지
![게시글 상세](./assets/demo_board_detail.png)

### 카카오 지도 기능
![카카오 지도](./assets/demo_map.png)

### AI 분석 결과
![AI 케어 결과](./assets/demo_ai_result.png)

---

## 기술 스택
- React (CRA)
- React Router
- Context API
- Axios
- Material UI, Styled-components, CSS
- Kakao Maps JavaScript SDK
- AWS 기반 AI 연동
- GPT API 연동

---

## 주요 기능

### 인증
- 로그인/회원가입
- JWT 기반 인증 처리
- AuthContext로 사용자 상태 전역 관리

### 지도
- Kakao Map SDK 기반 지도 렌더링
- 마커 표시 및 위치 정보 시각화

### 게시판
- 게시글 목록/상세/작성/수정/삭제
- 댓글 CRUD
- 삭제 모달 및 알림 처리

### AI 케어 기능
- AWS AI 서버에서 전달된 이미지 분석 결과 처리
- GPT API 프롬프트 생성 및 AI 케어 가이드 생성

### 접종 관리
- 접종 정보 기반 다음 접종일 계산
- 모달로 결과 안내

### 상점
- 상품 목록/상세 페이지
- 검색 및 카테고리 기능

### 카메라
- 반려동물 피부 촬영 UI (공동 작업)

---

## 담당 역할

### 담당 영역
- API 통신 구조 설계
- 인증 및 Oauth 흐름 구현
- Kakao Map 지도/마커 기능 구현
- 게시판 CRUD 전체 개발
- 공통 모달 컴포넌트 작성
- AWS AI 서버 데이터 처리 → GPT API 연동
- 케어 정보 생성 로직 개발

### 공동 작업
- 카메라 촬영 UI
- 메인 UI 구성
- 일부 레이아웃 스타일링

---

## 프로젝트 구조
(간단 구조도)

src/
 ├── components/
 ├── context/
 ├── api/
 ├── styles/
 ├── App.js
 └── index.js

---

## 개선 여지
- API 호출 구조 정리 필요
- 디자인 시스템 통합 필요
- 공통 UI 컴포넌트 모듈화
- 페이지/컴포넌트 구조 리팩토링
- 지도/카메라 모듈 분리 및 재사용성 강화

