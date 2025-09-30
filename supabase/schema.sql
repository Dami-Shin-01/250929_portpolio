-- 프로젝트 카테고리 테이블
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 프로젝트 테이블
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  -- Cloudinary 이미지 경로들
  thumbnail_url TEXT NOT NULL, -- Cloudinary public_id
  hero_image_url TEXT,
  gallery_urls TEXT[], -- 배열로 여러 이미지 저장
  
  -- 메타 정보
  client_name TEXT,
  project_date DATE,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- 타임스탬프
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- 정렬 순서
  order_index INTEGER DEFAULT 0
);

-- 프로젝트 업데이트 시 updated_at 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 연락 문의 테이블
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Row Level Security (RLS) 활성화
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (모든 사용자)
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  USING (true);

-- 관리자만 쓰기 가능 (인증된 사용자)
CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- 연락 문의는 누구나 생성 가능, 관리자만 읽기 가능
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read contact messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- 인덱스 생성 (성능 최적화)
CREATE INDEX projects_slug_idx ON projects(slug);
CREATE INDEX projects_category_idx ON projects(category_id);
CREATE INDEX projects_published_idx ON projects(published);
CREATE INDEX projects_featured_idx ON projects(featured);
CREATE INDEX categories_slug_idx ON categories(slug);

-- 샘플 데이터 삽입
INSERT INTO categories (name, slug, description, order_index) VALUES
  ('브랜딩', 'branding', '브랜드 아이덴티티 및 로고 디자인', 1),
  ('웹디자인', 'web-design', '웹사이트 UI/UX 디자인', 2),
  ('모바일 앱', 'mobile-app', '모바일 앱 인터페이스 디자인', 3),
  ('편집 디자인', 'editorial', '포스터, 카탈로그 등 인쇄물 디자인', 4);

-- 샘플 프로젝트 (Cloudinary 경로 예시)
INSERT INTO projects (
  title, 
  slug, 
  description, 
  content,
  category_id,
  thumbnail_url,
  hero_image_url,
  gallery_urls,
  client_name,
  project_date,
  tags,
  featured,
  published
) VALUES (
  '브랜드 리뉴얼 프로젝트',
  'brand-renewal-project',
  '글로벌 브랜드의 전면 리뉴얼 작업',
  '# 프로젝트 개요\n\n이 프로젝트는 기존 브랜드를 현대적으로 재해석한 작업입니다.\n\n## 작업 내용\n- 로고 리디자인\n- 컬러 시스템 개발\n- 타이포그래피 가이드',
  (SELECT id FROM categories WHERE slug = 'branding'),
  'portfolio/projects/brand-renewal/thumbnail',
  'portfolio/projects/brand-renewal/hero',
  ARRAY['portfolio/projects/brand-renewal/img1', 'portfolio/projects/brand-renewal/img2', 'portfolio/projects/brand-renewal/img3'],
  '글로벌코퍼레이션',
  '2024-01-15',
  ARRAY['브랜딩', 'UI/UX', '로고'],
  true,
  true
);
