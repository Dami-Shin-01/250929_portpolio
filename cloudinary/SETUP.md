# Cloudinary 설정 가이드

## 📦 Cloudinary 계정 생성 및 설정

### 1. Cloudinary 계정 생성

1. [Cloudinary](https://cloudinary.com) 방문
2. **Sign Up** 클릭 (무료 플랜 사용 가능)
3. 이메일 인증 완료

### 2. API 키 확인

1. Cloudinary 대시보드 접속
2. **Dashboard** → **Programmable Media** 선택
3. 다음 정보 확인:
   - **Cloud Name** (예: `dxxxxxxxxx`)
   - **API Key** (예: `123456789012345`)
   - **API Secret** (예: `abcdefghijklmnopqr`)

### 3. 업로드 프리셋 생성 (중요!)

이미지 업로드 컴포넌트 사용을 위해 필수입니다.

1. **Settings** → **Upload** 이동
2. **Upload presets** 섹션에서 **Add upload preset** 클릭
3. 다음과 같이 설정:

```
Preset name: ml_default (또는 원하는 이름)
Signing Mode: Unsigned (중요!)
Folder: portfolio (기본 폴더)
Unique filename: true (중복 방지)
Overwrite: false
```

4. **Save** 클릭

### 4. 환경 변수 설정

`.env.local` 파일에 다음 정보 입력:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🎯 이미지 업로드 컴포넌트 사용법

### 기본 사용법

```tsx
import ImageUploader, { SingleImageUploader } from '@/components/ImageUploader';

// 여러 이미지 업로드
<ImageUploader
  onUploadSuccess={(publicId, url) => {
    console.log('Uploaded:', publicId, url);
    // DB에 publicId 저장
  }}
  folder="portfolio/projects"
  maxFiles={10}
  label="프로젝트 이미지"
  description="최대 10개, 각 10MB까지"
/>

// 단일 이미지 업로드 (썸네일, 히어로 이미지 등)
<SingleImageUploader
  onUploadSuccess={(publicId, url) => {
    setThumbnail(publicId);
  }}
  folder="portfolio/thumbnails"
  label="썸네일 이미지"
  aspectRatio="aspect-square"
/>
```

### 이미지 표시

```tsx
import { CldImage } from 'next-cloudinary';

<CldImage
  src="portfolio/project-1/hero"  // Cloudinary public_id
  width={1200}
  height={800}
  crop="fill"
  gravity="auto"
  quality="auto"
  format="auto"
  alt="Project Hero"
/>
```

## 📁 폴더 구조 권장사항

Cloudinary에서 다음과 같은 폴더 구조를 사용하세요:

```
portfolio/
├── projects/
│   ├── project-1/
│   │   ├── hero
│   │   ├── img1
│   │   └── img2
│   └── project-2/
├── thumbnails/
├── about/
│   └── profile
└── temp/  # 임시 업로드 폴더
```

## 🔧 이미지 최적화 옵션

### 자동 최적화
```tsx
<CldImage
  src="..."
  quality="auto"    // 자동 품질 조절
  format="auto"     // 자동 포맷 (WebP, AVIF)
  loading="lazy"    // 레이지 로딩
  {...props}
/>
```

### 반응형 이미지
```tsx
<CldImage
  src="..."
  width={1200}
  height={800}
  responsive
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 이미지 변환
```tsx
// 크롭 및 리사이즈
crop="fill"           // 비율 유지하며 채우기
crop="thumb"          // 썸네일 생성
gravity="face"        // 얼굴 중심 크롭
gravity="auto"        // AI 자동 크롭

// 효과
effect="blur:300"     // 블러 효과
effect="grayscale"    // 흑백 변환
effect="sharpen"      // 선명하게
```

## 🎨 URL 기반 변환 예시

Cloudinary의 강력한 기능은 URL로 즉시 변환 가능하다는 것입니다:

```
원본:
https://res.cloudinary.com/demo/image/upload/sample.jpg

변환 (400x300, 자동 포맷, 품질):
https://res.cloudinary.com/demo/image/upload/
  w_400,h_300,c_fill,f_auto,q_auto/sample.jpg
```

## 📊 무료 플랜 제한

- **저장 용량**: 25GB
- **대역폭**: 25GB/월
- **변환**: 25 크레딧/월
- **이미지/영상**: 무제한

충분히 포트폴리오 사이트를 운영할 수 있습니다!

## 🚨 주의사항

1. **API Secret은 절대 클라이언트에 노출하지 마세요**
   - `.env.local`에만 저장
   - Git에 커밋하지 않기 (`.gitignore` 확인)

2. **Unsigned 업로드 프리셋 사용 시**
   - 폴더 제한 설정 권장
   - 파일 크기 제한 설정
   - 허용 포맷 제한

3. **대역폭 절약 팁**
   - 항상 `quality="auto"`, `format="auto"` 사용
   - 적절한 크기로 리사이징
   - 레이지 로딩 활성화

## 🔗 유용한 링크

- [Cloudinary 문서](https://cloudinary.com/documentation)
- [Next.js 통합 가이드](https://next.cloudinary.dev/)
- [이미지 변환 레퍼런스](https://cloudinary.com/documentation/image_transformations)

## 💡 추가 기능

### 동영상 지원
```tsx
import { CldVideoPlayer } from 'next-cloudinary';

<CldVideoPlayer
  src="portfolio/videos/demo"
  width={1920}
  height={1080}
/>
```

### AI 기능
- 배경 제거: `effect="background_removal"`
- 자동 태깅: API로 이미지 분석
- 얼굴 감지: `gravity="face"`

---

**설정 완료 후 이미지 업로드 컴포넌트를 바로 사용할 수 있습니다!**
