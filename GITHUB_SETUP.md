# 🐙 GitHub 연결 가이드

## ✅ 완료된 작업

- [x] Git 초기화
- [x] 첫 커밋 완료 (38개 파일, 10,240줄)
- [x] .gitignore 설정 (`.env.local` 제외됨)

---

## 📝 다음 단계: GitHub 저장소 생성 및 연결

### 방법 1: GitHub 웹사이트에서 생성 (권장)

#### 1. GitHub에서 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **+** 버튼 → **New repository** 클릭
3. 저장소 정보 입력:
   ```
   Repository name: portfolio-site (또는 원하는 이름)
   Description: 웹디자이너 포트폴리오 사이트 - Next.js 15 + Supabase + Cloudinary
   
   ⚠️ 중요: 
   - ❌ README 파일 추가하지 않기
   - ❌ .gitignore 추가하지 않기
   - ❌ 라이선스 추가하지 않기
   
   (이미 로컬에 있으므로)
   ```
4. **Create repository** 클릭

#### 2. 로컬 저장소와 연결

저장소 생성 후 나오는 명령어 중 다음을 실행:

```bash
# 1. GitHub 저장소를 원격 저장소로 추가
git remote add origin https://github.com/yourusername/portfolio-site.git

# 2. 메인 브랜치 이름 확인/변경 (GitHub는 main 사용)
git branch -M main

# 3. 푸시!
git push -u origin main
```

**또는 SSH 사용 (권장):**
```bash
git remote add origin git@github.com:yourusername/portfolio-site.git
git branch -M main
git push -u origin main
```

---

### 방법 2: GitHub CLI 사용 (빠름!)

GitHub CLI가 설치되어 있다면:

```bash
# GitHub CLI 로그인 (처음 한번만)
gh auth login

# 저장소 생성 및 자동 연결
gh repo create portfolio-site --public --source=. --remote=origin --push

# 또는 private 저장소로
gh repo create portfolio-site --private --source=. --remote=origin --push
```

---

## 🔍 연결 확인

```bash
# 원격 저장소 확인
git remote -v

# 결과:
# origin  https://github.com/yourusername/portfolio-site.git (fetch)
# origin  https://github.com/yourusername/portfolio-site.git (push)
```

---

## 📤 이후 변경사항 푸시하기

프로젝트를 수정한 후:

```bash
# 1. 변경사항 확인
git status

# 2. 변경된 파일 스테이징
git add .

# 3. 커밋
git commit -m "feat: 새로운 기능 추가"

# 4. 푸시
git push
```

### 커밋 메시지 규칙 (권장)

```bash
# 새 기능
git commit -m "feat: Add user profile page"

# 버그 수정
git commit -m "fix: Fix image upload error"

# 문서 업데이트
git commit -m "docs: Update README with new features"

# 스타일 변경
git commit -m "style: Improve mobile responsive design"

# 리팩토링
git commit -m "refactor: Simplify authentication logic"

# 성능 개선
git commit -m "perf: Optimize image loading"
```

---

## 🔐 환경 변수 보안

`.gitignore`에 이미 설정되어 있어 안전합니다:

```gitignore
# local env files
.env*.local
.env
```

**확인:**
- ✅ `.env.local` - Git에서 제외됨 (비밀 키 안전)
- ✅ `.env.example` - Git에 포함됨 (템플릿만)

---

## 🌿 브랜치 전략 (선택사항)

### 기본 사용 (main만 사용)
```bash
# main 브랜치에서 직접 작업
git add .
git commit -m "Update"
git push
```

### 기능별 브랜치 사용 (권장)
```bash
# 새 기능 브랜치 생성
git checkout -b feature/new-feature

# 작업 후 커밋
git add .
git commit -m "feat: Add new feature"
git push -u origin feature/new-feature

# GitHub에서 Pull Request 생성
# 리뷰 후 main에 병합
```

---

## 🔄 협업 시 주의사항

### 작업 전 항상 pull 받기
```bash
# 최신 코드 가져오기
git pull

# 또는
git fetch
git merge origin/main
```

### 충돌 해결
```bash
# 충돌 발생 시
git status  # 충돌 파일 확인
# 파일 수동 수정 후
git add .
git commit -m "resolve: Merge conflicts"
git push
```

---

## 📋 유용한 Git 명령어

```bash
# 커밋 히스토리 보기
git log --oneline

# 특정 파일 변경사항 확인
git diff filename

# 마지막 커밋 취소 (로컬만)
git reset --soft HEAD~1

# 특정 파일만 스테이징
git add src/components/Header.tsx

# 브랜치 목록
git branch -a

# 브랜치 전환
git checkout branch-name

# 원격 브랜치 삭제
git push origin --delete branch-name
```

---

## 🎯 GitHub Actions (자동화)

`.github/workflows/ci.yml` 생성하여 자동 배포/테스트 설정 가능:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 GitHub 프로젝트 관리

### README 뱃지 추가
```markdown
![Vercel](https://img.shields.io/badge/vercel-deployed-green)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![License](https://img.shields.io/badge/license-MIT-blue)
```

### GitHub Issues 활용
- 버그 리포트
- 기능 요청
- 작업 추적

### GitHub Projects
- 칸반 보드로 작업 관리
- 마일스톤 설정

---

## ⚠️ 주의사항

### 절대 커밋하면 안 되는 것들:
- ❌ `.env.local` - 비밀 키
- ❌ `node_modules/` - 의존성 (npm install로 설치)
- ❌ `.next/` - 빌드 결과물
- ❌ API 키, 비밀번호

### 이미 커밋한 비밀 키 삭제하기:
```bash
# 히스토리에서 파일 완전 삭제
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# 강제 푸시 (주의!)
git push origin --force --all
```

**⚠️ 이미 노출된 키는 즉시 재발급하세요!**

---

## 🎉 완료!

이제 GitHub에서 코드를 관리할 수 있습니다!

**GitHub 저장소 URL:**
```
https://github.com/yourusername/portfolio-site
```

**다음 단계:**
1. GitHub 저장소 생성
2. `git remote add origin` 실행
3. `git push -u origin main` 실행
4. 완료! 🚀

---

**작성일**: 2025년 9월 30일  
**문서 버전**: 1.0.0
