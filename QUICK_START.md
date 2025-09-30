# 🚀 빠른 시작 가이드

## 1단계: 의존성 설치

```bash
npm install
```

## 2단계: 환경 변수 설정

1. `.env.local` 파일 생성
2. [`ENV_SETUP.md`](./ENV_SETUP.md) 참고하여 값 입력

## 3단계: Supabase 데이터베이스 설정

### 방법 A: SQL Editor 사용 (권장)

1. [Supabase Dashboard](https://app.supabase.com) 접속
2. SQL Editor 메뉴 선택
3. `supabase/schema.sql` 파일 내용 전체 복사
4. SQL Editor에 붙여넣고 실행 (Run 버튼)

### 방법 B: CLI 사용

```bash
npx supabase db push
```

## 4단계: Cloudinary 설정

1. [Cloudinary](https://cloudinary.com) 계정 생성
2. Dashboard에서 Cloud Name, API Key, Secret 확인
3. `.env.local`에 추가

## 5단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 6단계: 샘플 프로젝트 확인

`schema.sql`을 실행하면 샘플 프로젝트가 자동으로 생성됩니다.
홈페이지에서 확인하세요!

## 다음 단계

### 이미지 업로드
1. Cloudinary Media Library에서 이미지 업로드
2. 폴더 구조: `portfolio/projects/프로젝트이름/`
3. Public ID를 Supabase에 저장

자세한 내용: [`cloudinary/README.md`](./cloudinary/README.md)

### 프로젝트 추가
Supabase Table Editor에서 `projects` 테이블에 직접 추가하거나,
SQL로 삽입:

```sql
INSERT INTO projects (
  title, slug, description, 
  category_id, thumbnail_url, published
) VALUES (
  '새 프로젝트', 'new-project', '프로젝트 설명',
  (SELECT id FROM categories WHERE slug = 'web-design'),
  'portfolio/projects/new-project/thumbnail',
  true
);
```

## 문제 해결

### 이미지가 표시되지 않는 경우
- Cloudinary Cloud Name 확인
- Public ID 경로 확인
- Next.js 개발 서버 재시작

### Supabase 연결 에러
- `.env.local` 환경 변수 확인
- Supabase 프로젝트 URL이 맞는지 확인
- 개발 서버 재시작

### TypeScript 에러
```bash
npm run type-check
```

## 배포

### Vercel (권장)

```bash
npm i -g vercel
vercel login
vercel
```

환경 변수를 Vercel Dashboard에서 설정하세요!

---

**문제가 있나요?** README.md의 자세한 문서를 확인하세요!
