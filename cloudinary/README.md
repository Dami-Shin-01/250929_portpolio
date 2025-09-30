# Cloudinary 설정 가이드

## 1. Cloudinary 계정 생성

1. [Cloudinary](https://cloudinary.com)에 가입
2. 무료 플랜으로 시작 (25GB 저장/25GB 대역폭 무료)

## 2. API 키 확인

Dashboard에서 다음 정보를 확인:
- **Cloud Name**
- **API Key**  
- **API Secret**

## 3. 환경 변수 설정

프로젝트 루트의 `.env.local`에 추가:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 4. 폴더 구조 권장사항

Cloudinary에서 다음과 같은 폴더 구조를 사용하세요:

```
portfolio/
├── projects/
│   ├── project-1/
│   │   ├── thumbnail
│   │   ├── hero
│   │   ├── img1
│   │   └── img2
│   ├── project-2/
│   └── ...
└── about/
    └── profile
```

## 5. 이미지 업로드 방법

### 방법 1: Dashboard 사용
1. Cloudinary Dashboard → Media Library
2. Upload 버튼 클릭
3. 폴더 지정 후 업로드

### 방법 2: Upload Widget (추천)
```typescript
// 향후 관리자 페이지에서 사용
import { CldUploadWidget } from 'next-cloudinary';

<CldUploadWidget uploadPreset="your_preset">
  {({ open }) => (
    <button onClick={() => open()}>이미지 업로드</button>
  )}
</CldUploadWidget>
```

## 6. 이미지 URL 형식

Supabase에 저장할 때는 **public_id만** 저장:

```typescript
// ✅ 올바른 형식
thumbnail_url: "portfolio/projects/project-1/thumbnail"

// ❌ 전체 URL은 저장하지 마세요
thumbnail_url: "https://res.cloudinary.com/..."
```

## 7. 최적화 예시

### 자동 포맷 변환
```typescript
// URL: /f_auto/ 추가
// 브라우저에 맞춰 WebP, AVIF 자동 선택
```

### 반응형 이미지
```typescript
<CldImage
  src="portfolio/projects/project-1/hero"
  width={1200}
  height={800}
  crop="fill"      // 크롭
  gravity="auto"   // AI 자동 중심점
  quality="auto"   // 자동 품질 조정
  format="auto"    // 자동 포맷
  alt="Project"
/>
```

### 썸네일 생성
```typescript
// w_400,h_300,c_fill,g_auto,q_auto,f_auto
getThumbnailUrl('portfolio/projects/project-1/thumb', 'md')
```

## 8. Upload Preset 생성 (선택사항)

관리자 페이지에서 이미지 업로드를 위해:

1. Settings → Upload
2. Upload presets → Add upload preset
3. 설정:
   - Preset name: `portfolio_preset`
   - Signing Mode: `Unsigned` (또는 `Signed`)
   - Folder: `portfolio`
4. Save

## 9. 프로젝트에 이미지 추가하기

### 수동으로 Supabase에 추가:

```sql
INSERT INTO projects (
  title, 
  slug,
  thumbnail_url,
  hero_image_url,
  gallery_urls
) VALUES (
  '프로젝트 제목',
  'project-slug',
  'portfolio/projects/project-1/thumbnail',
  'portfolio/projects/project-1/hero',
  ARRAY[
    'portfolio/projects/project-1/img1',
    'portfolio/projects/project-1/img2'
  ]
);
```

## 10. 유용한 변환 파라미터

| 파라미터 | 설명 | 예시 |
|---------|------|------|
| `w_` | 너비 | `w_800` |
| `h_` | 높이 | `h_600` |
| `c_` | 크롭 모드 | `c_fill`, `c_fit` |
| `g_` | 중심점 | `g_auto`, `g_face` |
| `q_` | 품질 | `q_auto`, `q_80` |
| `f_` | 포맷 | `f_auto`, `f_webp` |
| `e_` | 효과 | `e_blur:300` |

## 11. AI 기능 (유료)

- **배경 제거**: `e_background_removal`
- **자동 크롭**: `g_auto:subject`
- **얼굴 인식**: `g_face`
- **색상 추출**: API로 주요 색상 추출

## 12. 트러블슈팅

### 이미지가 표시되지 않는 경우
1. Cloud Name 확인
2. Public ID 경로 확인 (폴더 구조)
3. Next.js에서 Cloudinary 도메인 허용 확인

### CORS 에러
```javascript
// next.config.js에 이미 설정됨
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
}
```

## 13. 비용 최적화 팁

- ✅ `q_auto` 사용 - 자동 품질 조정
- ✅ `f_auto` 사용 - 자동 포맷 선택
- ✅ 적절한 크기로 리사이징
- ✅ 캐싱 활용
- ❌ 원본 이미지 직접 사용 금지

## 14. Supabase + Cloudinary 워크플로우

```
1. Cloudinary에 이미지 업로드
   → 폴더: portfolio/projects/my-project/

2. Public ID 복사
   → "portfolio/projects/my-project/thumbnail"

3. Supabase에 프로젝트 데이터 저장
   → thumbnail_url: "portfolio/projects/my-project/thumbnail"

4. Next.js에서 자동 최적화되어 표시
   → CldImage 컴포넌트 사용
```

이렇게 하면 이미지는 Cloudinary CDN에서, 데이터는 Supabase에서 관리됩니다!
