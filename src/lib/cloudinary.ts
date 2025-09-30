// Cloudinary 설정
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

if (!CLOUDINARY_CLOUD_NAME) {
  console.warn('⚠️  Cloudinary Cloud Name이 설정되지 않았습니다.');
}

// Cloudinary URL 생성 헬퍼
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif';
    gravity?: 'auto' | 'face' | 'center';
  }
) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto',
  } = options || {};

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (gravity) transformations.push(`g_${gravity}`);

  const transformString = transformations.join(',');
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

// 반응형 이미지 srcset 생성
export function getResponsiveSrcSet(publicId: string) {
  const widths = [320, 640, 768, 1024, 1280, 1536];
  
  return widths
    .map(width => {
      const url = getCloudinaryUrl(publicId, { width, quality: 'auto', format: 'auto' });
      return `${url} ${width}w`;
    })
    .join(', ');
}

// 썸네일 URL 생성
export function getThumbnailUrl(publicId: string, size: 'sm' | 'md' | 'lg' = 'md') {
  const sizes = {
    sm: { width: 300, height: 200 },
    md: { width: 600, height: 400 },
    lg: { width: 1200, height: 800 },
  };

  return getCloudinaryUrl(publicId, {
    ...sizes[size],
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  });
}

// 블러 플레이스홀더 생성
export function getBlurDataUrl(publicId: string) {
  return getCloudinaryUrl(publicId, {
    width: 10,
    quality: 10,
    format: 'auto',
  });
}
