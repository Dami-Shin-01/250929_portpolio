// Database Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  category_id: string | null;
  
  // Cloudinary 이미지 경로
  thumbnail_url: string;
  hero_image_url: string | null;
  gallery_urls: string[] | null;
  
  // 메타 정보
  client_name: string | null;
  project_date: string | null;
  tags: string[] | null;
  featured: boolean;
  published: boolean;
  
  // SEO
  meta_title: string | null;
  meta_description: string | null;
  
  // 타임스탬프
  created_at: string;
  updated_at: string;
  order_index: number;
  
  // 관계
  category?: Category;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  category_id: string;
  thumbnail_url: string;
  hero_image_url?: string;
  gallery_urls?: string[];
  client_name?: string;
  project_date?: string;
  tags?: string[];
  featured: boolean;
  published: boolean;
  meta_title?: string;
  meta_description?: string;
}

// UI Types
export interface CloudinaryImage {
  publicId: string;
  width?: number;
  height?: number;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}
