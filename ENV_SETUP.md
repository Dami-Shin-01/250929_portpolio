# 환경 변수 설정 가이드

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 복사하여 붙여넣으세요.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_EMAIL=your_email@example.com
```

## 값 얻는 방법

### Supabase
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 프로젝트 선택 → Settings → API
3. 다음 값들을 복사:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role 키 → `SUPABASE_SERVICE_ROLE_KEY`

### Cloudinary
1. [Cloudinary Dashboard](https://console.cloudinary.com) 접속
2. Dashboard 메인 페이지에서 확인:
   - Cloud name → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - API Key → `CLOUDINARY_API_KEY`
   - API Secret → `CLOUDINARY_API_SECRET` (Show 버튼 클릭)

## 주의사항

⚠️ **절대 .env.local 파일을 Git에 커밋하지 마세요!**

- `.gitignore`에 이미 추가되어 있습니다
- 배포 시에는 Vercel Dashboard에서 환경 변수를 설정하세요
