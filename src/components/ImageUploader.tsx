'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onUploadSuccess: (publicId: string, url: string) => void;
  folder?: string;
  maxFiles?: number;
  existingImages?: string[];
  label?: string;
  description?: string;
}

interface UploadedImage {
  publicId: string;
  url: string;
  thumbnail?: string;
}

export default function ImageUploader({
  onUploadSuccess,
  folder = 'portfolio',
  maxFiles = 10,
  existingImages = [],
  label = '이미지 업로드',
  description = '최대 10MB, JPG, PNG, WebP 지원'
}: ImageUploaderProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    existingImages.map(id => ({
      publicId: id,
      url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${id}`
    }))
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleUploadSuccess = (result: any) => {
    const newImage: UploadedImage = {
      publicId: result.info.public_id,
      url: result.info.secure_url,
      thumbnail: result.info.thumbnail_url
    };

    setUploadedImages(prev => [...prev, newImage]);
    onUploadSuccess(newImage.publicId, newImage.url);
    setIsUploading(false);
    setUploadError('');
  };

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error);
    setUploadError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    setIsUploading(false);
  };

  const removeImage = (publicId: string) => {
    setUploadedImages(prev => prev.filter(img => img.publicId !== publicId));
  };

  const canUploadMore = uploadedImages.length < maxFiles;

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Upload Button */}
      {canUploadMore && (
        <CldUploadWidget
          uploadPreset="ml_default" // Cloudinary 업로드 프리셋 필요
          options={{
            folder: folder,
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
            maxFileSize: 10000000, // 10MB
            multiple: false
          }}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => {
                setIsUploading(true);
                open();
              }}
              disabled={isUploading}
              className="w-full px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    업로드 중...
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    클릭하여 이미지 업로드
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {uploadedImages.length} / {maxFiles} 이미지
                  </span>
                </>
              )}
            </button>
          )}
        </CldUploadWidget>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">
            {uploadError}
          </p>
        </div>
      )}

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((image, index) => (
            <div
              key={image.publicId}
              className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {/* Image */}
              <CldImage
                src={image.publicId}
                width={300}
                height={300}
                crop="fill"
                gravity="auto"
                alt={`Uploaded ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(image.publicId)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                  title="삭제"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Index Badge */}
              <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-semibold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {uploadedImages.length === 0 && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <ImageIcon className="w-5 h-5 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            아직 업로드된 이미지가 없습니다
          </p>
        </div>
      )}

      {/* Success Message */}
      {uploadedImages.length > 0 && uploadedImages.length === maxFiles && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-300">
            최대 {maxFiles}개의 이미지가 업로드되었습니다
          </p>
        </div>
      )}
    </div>
  );
}

// 단일 이미지 업로드 컴포넌트
export function SingleImageUploader({
  onUploadSuccess,
  folder = 'portfolio',
  existingImage,
  label = '이미지 업로드',
  description = '최대 10MB, JPG, PNG, WebP 지원',
  aspectRatio = 'aspect-video'
}: {
  onUploadSuccess: (publicId: string, url: string) => void;
  folder?: string;
  existingImage?: string;
  label?: string;
  description?: string;
  aspectRatio?: string;
}) {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    existingImage ? {
      publicId: existingImage,
      url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${existingImage}`
    } : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleUploadSuccess = (result: any) => {
    const newImage: UploadedImage = {
      publicId: result.info.public_id,
      url: result.info.secure_url,
      thumbnail: result.info.thumbnail_url
    };

    setUploadedImage(newImage);
    onUploadSuccess(newImage.publicId, newImage.url);
    setIsUploading(false);
    setUploadError('');
  };

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error);
    setUploadError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    setIsUploading(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
    onUploadSuccess('', '');
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Preview or Upload Area */}
      {uploadedImage ? (
        <div className={`relative ${aspectRatio} rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group`}>
          <CldImage
            src={uploadedImage.publicId}
            fill
            crop="fill"
            gravity="auto"
            alt="Uploaded"
            className="object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={removeImage}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              삭제
            </button>
          </div>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="ml_default" // Cloudinary 업로드 프리셋 필요
          options={{
            folder: folder,
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
            maxFileSize: 10000000, // 10MB
            multiple: false
          }}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => {
                setIsUploading(true);
                open();
              }}
              disabled={isUploading}
              className={`w-full ${aspectRatio} border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    업로드 중...
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    클릭하여 이미지 업로드
                  </span>
                </>
              )}
            </button>
          )}
        </CldUploadWidget>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">
            {uploadError}
          </p>
        </div>
      )}
    </div>
  );
}
