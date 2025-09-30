'use client';

import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import type { Project } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">아직 등록된 프로젝트가 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 프로젝트</h2>
            <p className="text-gray-600 dark:text-gray-400">
              최근 작업한 대표 프로젝트들을 소개합니다
            </p>
          </div>
          <Link 
            href="/projects"
            className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium group"
          >
            전체 보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="card hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <CldImage
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {project.category && (
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                        {project.category.name}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                    {project.client_name && (
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
                        클라이언트: {project.client_name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link href="/projects" className="btn btn-primary inline-flex items-center gap-2">
            전체 프로젝트 보기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
