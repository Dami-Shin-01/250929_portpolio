import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import { getFeaturedProjects } from '@/lib/supabase/queries';

export const revalidate = 3600; // 1시간마다 재검증

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects(6);

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      
      {/* About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              디자인으로 세상을 연결합니다
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              사용자 경험을 최우선으로 생각하며, 아름답고 실용적인 디자인을 만듭니다.
              브랜딩부터 웹/모바일 UI까지 다양한 프로젝트 경험을 보유하고 있습니다.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">50+</div>
                <div className="text-gray-600 dark:text-gray-400">프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">30+</div>
                <div className="text-gray-600 dark:text-gray-400">클라이언트</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600">5+</div>
                <div className="text-gray-600 dark:text-gray-400">년 경력</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
