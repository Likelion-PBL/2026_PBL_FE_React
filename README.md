# 2026 프론트엔드 PBL (React) 예시 코드 저장소

React 트랙을 위한 실습 레포지토리입니다.  
본 레포지토리는 React의 핵심 개념을 직접 코드로 구현하는 데 집중하며,  
컴포넌트 기반 사고의 기초를 다루는 것을 목표로 합니다.

## 레포지토리 목적

- React의 컴포넌트 구조와 JSX 문법을 직접 코드로 구현합니다.
- Props를 활용한 데이터 흐름을 반복적으로 연습합니다.
- useState, useEffect를 활용한 상태 관리와 비동기 데이터 연동을 경험합니다.
- 컴포넌트 분리와 재사용성에 대한 UI 사고력과 구조 감각을 기르는 것을 목표로 합니다.
- 본 레포지토리는 React 기반 커리큘럼(5~6주차)을 포함합니다.
- 1~4주차 Vanilla(HTML/CSS/JS) 학습은 별도의 레포지토리에서 진행됩니다.

---

## 주차별 학습 내용

### 5주차: React 기초 & 컴포넌트

| 항목 | 내용 |
|------|------|
| **학습 키워드** | React 개요, JSX 문법, 컴포넌트 분리, Props 전달 |
| **PBL 미션** | 아기사자 자기소개 페이지 UI를 React로 재구성하기 |

### 6주차: 상태(State)와 Effect

| 항목 | 내용 |
|------|------|
| **학습 키워드** | useState, useEffect, 이벤트 처리, Custom Hook, 비동기 데이터 연동 |
| **PBL 미션** | 아기사자 자기소개 페이지에 추가/삭제, 필터링, 외부 API 연동 등 동적 기능 구현하기 |

---

## 디렉토리 구조

```
📁 src/
├── main.jsx           # 앱 진입점
├── App.jsx            # 루트 컴포넌트
├── components/        # 재사용 컴포넌트
│   ├── Controls.jsx
│   ├── LionForm.jsx
│   ├── ProfileCard.jsx
│   ├── ProfileCardGrid.jsx
│   ├── ProfileDetail.jsx
│   └── ProfileDetailList.jsx
├── hooks/             # Custom Hooks
│   └── useLions.js
├── utils/             # 유틸리티 함수
│   ├── api.js
│   └── lion.js
├── data/              # mock 데이터 파일
│   └── lions.js
├── styles/            # 스타일시트
│   └── style.css
└── assets/            # 이미지 등 정적 자원
```

---

## 예시 코드 확인 방법

각 주차별 예시 코드는 **브랜치**로 분리되어 있습니다.

| 브랜치명 | 설명 |
|----------|------|
| `week-5` | 5주차 기본 과제 예시 |
| `week-5-bonus` | 5주차 보너스 과제 예시 |
| `week-6` | 6주차 기본 과제 예시 |
| `week-6-bonus` | 6주차 보너스 과제 예시 |

### 브랜치 전환 방법

```bash
# 원하는 주차의 브랜치로 전환
git checkout week-5        # 5주차 기본 과제
git checkout week-5-bonus  # 5주차 보너스 과제
git checkout week-6        # 6주차 기본 과제
git checkout week-6-bonus  # 6주차 보너스 과제
```

---

## 로컬 실행 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

개발 서버가 실행되면 `http://localhost:5173`에서 확인할 수 있습니다.

---

## 기술 스택

- **React** 19
- **Vite** 7
- **ESLint** 9

---

## 참고 사항

- 이 레포지토리의 코드는 **참고용 예시**입니다.
