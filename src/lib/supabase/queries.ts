import { supabase } from './client';
import type { Project, Category, ContactFormData } from '@/types';

// 프로젝트 관련 쿼리
export async function getProjects(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}) {
  let query = supabase
    .from('projects')
    .select('*, category:categories(*)')
    .eq('published', true)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  if (options?.category) {
    query = query.eq('category_id', options.category);
  }

  if (options?.featured) {
    query = query.eq('featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('프로젝트 조회 에러:', error);
    throw error;
  }

  return data as Project[];
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('프로젝트 조회 에러:', error);
    throw error;
  }

  return data as Project;
}

export async function getFeaturedProjects(limit = 6) {
  return getProjects({ featured: true, limit });
}

// 카테고리 관련 쿼리
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('카테고리 조회 에러:', error);
    throw error;
  }

  return data as Category[];
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('카테고리 조회 에러:', error);
    throw error;
  }

  return data as Category;
}

// 연락 문의
export async function createContactMessage(formData: ContactFormData) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([formData])
    .select()
    .single();

  if (error) {
    console.error('연락 문의 생성 에러:', error);
    throw error;
  }

  return data;
}

// 검색
export async function searchProjects(query: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*, category:categories(*)')
    .eq('published', true)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('프로젝트 검색 에러:', error);
    throw error;
  }

  return data as Project[];
}
