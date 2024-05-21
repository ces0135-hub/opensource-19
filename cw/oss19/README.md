# OSS 19

> Author: Chanwoo

## Directory Structure

- 설명이 없는 파일 / 디렉토리는 무시해도 좋습니다

- 진하게 표시된 부분은 디렉토리입니다

```sh
.
├── README.md       # 이 파일
├── build           ## 빌드파일 저장
├── firebase.json   # 파이어베이스 설정
├── node_modules    ## 노드 의존성
├── package.json    # 프로젝트 설정
├── public          ## 퍼블릭 디렉토리
├── src             ## 이 프로젝트 소스코드
├── tsconfig.json   # 린트 규칙을 포함한 TS 설정
└── yarn.lock       # yarn 락파일, 버전 호환성용
```

### `(root)/src` dir

```sh
src
├── App.css             # 공통 CSS
├── App.test.tsx
├── App.tsx             # App 진입점
├── Components          ## 재사용을 위한 컴포넌트들
├── Pages               ## 리엑트 페이지들(라우터에 연결)
├── api.js              # 서버 요청용 API 편의성 코드
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts  # 기본파일, 타이핑
├── reportWebVitals.ts
└── setupTests.ts
```

### `(root)/src/Pages` and `(root)/src/Components` dir

```sh
src
├── Components
│   └── Icons
│       └── LogoIcon.tsx            # Logo, TS용 Svg export
├── Pages
│   ├── HomeContents.tsx            # 홈페이지용 컨텐츠
│   ├── HomeContents.types.d.ts     # 홈페이지용 컨텐츠 타이핑
│   └── HomePage.tsx                # 홈페이지
```

## Code Review: App.tsx

```ts
import "./App.css"; // 글로벌(공통) CSS 임포팅
// 브라우저 라우터 사용을 위한 임포팅
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 홈페이지 React Element
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        // 루트 라우터 정의
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Test URI

- [Deployed](https://chanwoo-oss-19.web.app/)

## How to local testing

### Prerequisite

- Git

- Node

- Yarn(Installable by npm)

- `optional` Firebase cli

### Setting up

1. 깃 클론: `git clone ${clone_address}`

1. 의존성 구성: `yarn install`

1. 로컬 테스트: `yarn start`

### Deploying

1. 수동 배포

   - 빌드 `yarn build`

   - 배포 `firebase deploy`

1. 자동 배포: 구현 준비중
