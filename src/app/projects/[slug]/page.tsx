import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/supabase/queries';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = await getProjectBySlug(params.slug);
    return {
      title: `${project.title} | Portfolio`,
      description: project.description || project.title,
    };
  } catch {
    return {
      title: '프로젝트를 찾을 수 없습니다',
    };
  }
}

export const revalidate = 3600;

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let project;
  
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          프로젝트 목록으로
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.category && (
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                {project.category.name}
              </span>
            )}
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400">
            {project.client_name && (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{project.client_name}</span>
              </div>
            )}
            {project.project_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(project.project_date).toLocaleDateString('ko-KR')}</span>
              </div>
            )}
          </div>
        </header>

        {/* Hero Image */}
        {project.hero_image_url && (
          <div className="relative aspect-video w-full mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <CldImage
              src={project.hero_image_url}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {project.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {project.description}
            </p>
          )}

          {project.content && (
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          )}
        </div>

        {/* Gallery */}
        {project.gallery_urls && project.gallery_urls.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">프로젝트 갤러리</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery_urls.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                >
                  <CldImage
                    src={imageUrl}
                    alt={`${project.title} - 이미지 ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/contact" className="btn btn-primary">
            프로젝트 문의하기
          </Link>
        </div>
      </div>
    </article>
  );
}
