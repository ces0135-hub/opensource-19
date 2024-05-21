# OSS 19 - Server

> Author: Chanwoo  
> Based on: Python, FastAPI
> Env: Python version 3.9.0

## Directory Structure

- 설명이 없는 파일 / 디렉토리는 무시해도 좋습니다

- 진하게 표시된 부분은 디렉토리입니다

```sh
.
├── README.md                 # 이 파일
├── dockerfile                # 도커 명령파일
├── firebase_credential.json  # firebase 권한관리
├── ingredients.csv           # 재료 로컬목업 DB
├── main.py                   # 서버 진입점
└── requirements.txt          # 의존성 관리용 freeze 파일
```

### Setting up

> OS X 기준입니다

1. 깃 클론: `git clone ${clone_address}`

1. 파이썬 가상환경 구성: `python -m venv venv`

1. 의존성 설치: `pip install -r requirements.txt`

1. 서버 테스트

   - 가상환경 활성화: `source venv/bin/activate`

   - 서버 실행: `uvicorn main:app --reload`

### Deploying

도커로 컨테이너 이미지 통해 배포
