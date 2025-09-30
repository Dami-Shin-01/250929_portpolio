import { getProjects, getCategories } from '@/lib/supabase/queries';
import ProjectGrid from '@/components/ProjectGrid';

export const metadata = {
  title: '프로젝트 | Portfolio',
  description: '다양한 웹 디자인 프로젝트를 확인하세요',
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">프로젝트</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            다양한 분야의 디자인 프로젝트를 만나보세요
          </p>
        </div>

        <ProjectGrid projects={projects} categories={categories} />
      </div>
    </div>
  );
}
