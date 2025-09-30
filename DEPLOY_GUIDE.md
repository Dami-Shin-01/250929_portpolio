# 🚀 배포 가이드

## Vercel 배포 (권장)

### 1단계: GitHub 저장소 생성

```bash
# Git 초기화 (아직 안했다면)
git init
git add .
git commit -m "Initial commit: Portfolio site"

# GitHub 저장소 생성 후
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel 계정 생성 및 프로젝트 연결

1. [Vercel](https://vercel.com) 방문
2. **Sign Up** → GitHub로 로그인
3. **New Project** 클릭
4. GitHub 저장소 선택
5. **Import** 클릭

### 3단계: 환경 변수 설정

Vercel 대시보드에서 **Settings** → **Environment Variables** 이동

다음 변수들을 추가:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Your Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=웹디자이너 포트폴리오

# Admin (선택)
ADMIN_EMAIL=admin@example.com
```

### 4단계: 배포!

1. **Deploy** 클릭
2. 빌드 완료 대기 (약 2-3분)
3. 배포 완료! 🎉

배포 URL: `https://your-project.vercel.app`

---

## Supabase 설정

### 1단계: Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 방문
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - Name: `portfolio`
   - Database Password: 안전한 비밀번호
   - Region: `Northeast Asia (Seoul)` 권장

### 2단계: 데이터베이스 스키마 설정

1. Supabase 대시보드에서 **SQL Editor** 선택
2. `supabase/schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기
4. **Run** 클릭 실행

### 3단계: API 키 확인

**Settings** → **API** 이동

다음 정보 복사:
- **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
- **anon public**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** (Show 클릭): `SUPABASE_SERVICE_ROLE_KEY`

### 4단계: 인증 설정 (선택)

관리자 로그인을 위해:

1. **Authentication** → **Users** 선택
2. **Invite user** 클릭
3. 관리자 이메일 입력
4. 이메일로 받은 링크로 비밀번호 설정

---

## Cloudinary 설정

자세한 내용은 [`cloudinary/SETUP.md`](./cloudinary/SETUP.md) 참조

### 빠른 설정

1. [Cloudinary 가입](https://cloudinary.com)
2. Dashboard에서 API 키 확인
3. Upload Presets 설정:
   - Name: `ml_default`
   - Signing Mode: **Unsigned**
4. 환경 변수에 추가

---

## 커스텀 도메인 설정 (선택)

### Vercel에서 도메인 연결

1. Vercel 프로젝트 **Settings** → **Domains**
2. **Add Domain** 클릭
3. 도메인 입력 (예: `myportfolio.com`)
4. DNS 설정:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. SSL 자동 적용 (약 10분 소요)

---

## 배포 후 체크리스트

### ✅ 필수 확인 사항

- [ ] 홈페이지 정상 작동
- [ ] 프로젝트 목록 표시
- [ ] Contact 폼 전송 테스트
- [ ] About 페이지 확인
- [ ] 관리자 로그인 테스트
- [ ] 이미지 업로드 테스트
- [ ] 모바일 반응형 확인
- [ ] 다크모드 작동 확인
- [ ] SEO 메타 태그 확인
- [ ] 404 페이지 테스트

### 🎨 최적화

- [ ] Lighthouse 점수 확인 (90+ 목표)
- [ ] 이미지 최적화 (Cloudinary auto)
- [ ] 불필요한 콘솔 로그 제거
- [ ] Analytics 설정 (Google Analytics, Vercel Analytics)

---

## 문제 해결

### 빌드 실패 시

1. 로컬에서 빌드 테스트:
```bash
npm run build
```

2. TypeScript 에러 확인:
```bash
npm run type-check
```

3. ESLint 에러 확인:
```bash
npm run lint
```

### 환경 변수 문제

- Vercel에서 환경 변수 재확인
- `NEXT_PUBLIC_` 접두사 확인
- 재배포 (변수 변경 후 필수)

### Supabase 연결 실패

- API URL 정확한지 확인
- ANON KEY vs SERVICE_ROLE KEY 구분
- Supabase 프로젝트가 활성화되었는지 확인
- RLS 정책 확인

### Cloudinary 업로드 실패

- Upload Preset이 Unsigned인지 확인
- Cloud Name 정확한지 확인
- CORS 설정 확인 (보통 자동)

---

## 업데이트 배포

코드 수정 후:

```bash
git add .
git commit -m "Update: 변경 사항 설명"
git push
```

Vercel이 자동으로 재배포합니다! (약 2-3분)

---

## 모니터링 및 분석

### Vercel Analytics
1. Vercel 대시보드에서 **Analytics** 활성화
2. 무료로 기본 통계 제공

### Supabase 모니터링
1. **Database** → **Usage** 에서 사용량 확인
2. **Logs** 에서 에러 확인

### Cloudinary 사용량
1. Dashboard에서 대역폭 모니터링
2. 무료 플랜 제한 확인

---

## 백업 전략

### 데이터베이스 백업
```sql
-- Supabase SQL Editor에서 실행
-- 프로젝트 데이터 백업
SELECT * FROM projects;
SELECT * FROM categories;
SELECT * FROM contact_messages;
```

### 이미지 백업
- Cloudinary는 자동으로 이미지 보관
- Media Library에서 확인 가능

---

## 성능 최적화 팁

1. **이미지**: 항상 Cloudinary 자동 최적화 사용
2. **코드 분할**: Next.js가 자동 처리
3. **캐싱**: Vercel Edge Network 활용
4. **Font**: 로컬 폰트 사용 (Vercel Font)
5. **Analytics**: 필요한 것만 추가

---

## 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 있음
- [ ] API Secret이 서버에서만 사용됨
- [ ] Supabase RLS 정책 활성화
- [ ] CORS 설정 확인
- [ ] 관리자 페이지 인증 보호

---

**축하합니다! 🎉 포트폴리오 사이트가 배포되었습니다!**

문제가 발생하면 각 서비스의 문서를 참조하세요:
- [Vercel 문서](https://vercel.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Cloudinary 문서](https://cloudinary.com/documentation)
