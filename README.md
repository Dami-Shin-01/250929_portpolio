# 웹디자이너 포트폴리오 사이트

**최신 기술 스택으로 구축된 모던 포트폴리오 웹사이트**

## 🚀 기술 스택 (2025년 최신 버전)

### 프론트엔드
- **Next.js 15.5.4** - React 프레임워크, App Router, Turbopack
- **React 19.1.1** - 최신 React with Compiler
- **TypeScript 5.9.2** - 타입 안전성
- **Tailwind CSS 4.1.13** - 최신 유틸리티 CSS 프레임워크
- **Framer Motion 12.23.22** - 부드러운 애니메이션

### 백엔드 & 데이터베이스
- **Supabase 2.58.0** - PostgreSQL, Auth, Storage
- **Row Level Security (RLS)** - 데이터 보안

### 이미지 관리
- **Cloudinary** - CDN, 자동 최적화, 반응형 이미지
- **next-cloudinary 6.16.0** - Next.js 통합

### 배포
- **Vercel** - 자동 배포, Edge Functions

## 📁 프로젝트 구조

```
portfolio-site/
├── public/                  # 정적 파일
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # 루트 레이아웃
│   │   ├── page.tsx        # 홈페이지
│   │   ├── projects/       # 프로젝트 페이지
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/          # 소개 페이지 ✅
│   │   │   └── page.tsx
│   │   ├── contact/        # 연락 페이지 ✅
│   │   │   └── page.tsx
│   │   └── admin/          # 관리자 대시보드 ✅
│   │       ├── login/page.tsx
│   │       └── dashboard/page.tsx
│   ├── components/         # 재사용 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ContactForm.tsx       # ✅ 신규
│   │   └── ImageUploader.tsx     # ✅ 신규
│   ├── lib/
│   │   ├── supabase/       # Supabase 클라이언트 & 쿼리
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── queries.ts
│   │   └── cloudinary.ts   # Cloudinary 유틸리티
│   └── types/
│       └── index.ts        # TypeScript 타입 정의
├── supabase/
│   ├── schema.sql          # 데이터베이스 스키마
│   └── README.md           # Supabase 설정 가이드
├── cloudinary/
│   ├── README.md
│   └── SETUP.md            # Cloudinary 상세 설정 가이드 ✅
├── .env.example            # 환경 변수 템플릿 ✅
├── .env.local              # 로컬 환경 변수 (git 제외)
├── DEPLOY_GUIDE.md         # 배포 가이드 ✅
├── PROJECT_STATUS.md       # 프로젝트 완료 상태 ✅
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## ⚙️ 설치 및 실행

### 1. 저장소 클론 및 의존성 설치

```bash
# 의존성 설치
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일이 이미 생성되어 있습니다. 실제 값으로 수정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Portfolio Site
NEXT_PUBLIC_SITE_DESCRIPTION=웹디자이너 포트폴리오

# Admin (optional)
ADMIN_EMAIL=admin@example.com
```

> 💡 `.env.example` 파일을 참고하세요!

### 3. Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. `supabase/schema.sql` 파일 내용을 SQL Editor에 붙여넣기
3. 실행하여 테이블 및 정책 생성

자세한 내용은 [`supabase/README.md`](./supabase/README.md)를 참조하세요.

### 4. Cloudinary 설정

1. [Cloudinary](https://cloudinary.com)에서 계정 생성
2. Dashboard에서 Cloud Name, API Key, API Secret 확인
3. **Upload Preset 생성** (필수!):
   - Settings → Upload → Add upload preset
   - Name: `ml_default`
   - Signing Mode: **Unsigned**
4. `.env.local`에 추가

> 💡 자세한 내용은 [`cloudinary/SETUP.md`](./cloudinary/SETUP.md)를 참조하세요!

### 5. 개발 서버 실행

```bash
# Turbopack 활성화 (권장)
npm run dev

# 빌드
npm run build

# 프로덕션 서버
npm run start
```

개발 서버: [http://localhost:3000](http://localhost:3000)

## 🎨 주요 기능

### ✅ 구현된 기능

- **홈페이지** - 히어로 섹션, 주요 프로젝트 소개
- **프로젝트 갤러리** - 카테고리 필터, 그리드 레이아웃
- **프로젝트 상세** - 이미지 갤러리, 마크다운 콘텐츠
- **About 페이지** - 프로필, 스킬, 경력, 수상 경력 ✅
- **Contact 페이지** - 연락 폼, Supabase 통합, 소셜 링크 ✅
- **관리자 대시보드** - 로그인, 통계, 프로젝트/문의 관리 ✅
- **이미지 업로드** - Cloudinary 통합, 다중/단일 업로드, 미리보기 ✅
- **반응형 디자인** - 모바일/태블릿/데스크탑 최적화
- **이미지 최적화** - Cloudinary 자동 최적화, WebP/AVIF
- **다크모드 지원** - 시스템 설정 자동 감지
- **SEO 최적화** - 메타태그, OpenGraph
- **인증 시스템** - Supabase Auth 통합 ✅

### 🚧 추가 개발 가능

- [ ] 프로젝트 CRUD 페이지 (관리자)
- [ ] 문의 관리 페이지
- [ ] 카테고리 관리
- [ ] 검색 기능
- [ ] 필터링 & 정렬
- [ ] 페이지네이션
- [ ] 애니메이션 개선
- [ ] Analytics 통합

## 📊 데이터베이스 스키마

### `projects` 테이블
- 프로젝트 정보 (제목, 설명, 콘텐츠)
- Cloudinary 이미지 경로
- 카테고리, 태그
- 발행 상태, 추천 여부

### `categories` 테이블
- 카테고리 이름, 슬러그, 설명

### `contact_messages` 테이블
- 연락 문의 저장

## 🌐 배포

### Vercel 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 설정
4. 배포!

```bash
# Vercel CLI 사용
npm i -g vercel
vercel login
vercel
```

### 환경 변수 체크리스트

Vercel Dashboard에서 다음 환경 변수를 설정하세요:

- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- ✅ `CLOUDINARY_API_KEY`
- ✅ `CLOUDINARY_API_SECRET`
- ✅ `NEXT_PUBLIC_SITE_URL`

> 💡 상세한 배포 가이드는 [`DEPLOY_GUIDE.md`](./DEPLOY_GUIDE.md)를 참조하세요!

## 🔧 호환성 체크

### Next.js 15 + React 19
- ✅ Server Components 기본 활성화
- ✅ Turbopack 개발 서버
- ✅ Improved Image Optimization
- ✅ React Compiler 지원

### Supabase 2.58.0
- ✅ Next.js 15 완전 호환
- ✅ Server/Client Components 모두 지원
- ✅ TypeScript 5.9 지원

### Tailwind CSS 4
- ✅ 향상된 성능
- ✅ 새로운 유틸리티 클래스
- ✅ PostCSS 8.5+ 호환

## 📚 참고 문서

### 프로젝트 문서
- [`DEPLOY_GUIDE.md`](./DEPLOY_GUIDE.md) - 배포 가이드 (Vercel, Supabase, Cloudinary)
- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) - 프로젝트 완료 상태 및 다음 단계
- [`cloudinary/SETUP.md`](./cloudinary/SETUP.md) - Cloudinary 상세 설정 가이드
- [`supabase/README.md`](./supabase/README.md) - Supabase 설정 가이드

### 외부 문서
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 📄 라이선스

MIT License

---

**Made with ❤️ using the latest web technologies in 2025**
