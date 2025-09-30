import { Metadata } from 'next';
import { CldImage } from 'next-cloudinary';
import { Briefcase, Award, Code2, Palette, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Portfolio',
  description: '웹디자이너 소개, 스킬, 경력 정보',
};

const skills = [
  {
    category: 'Design',
    icon: Palette,
    items: ['UI/UX Design', 'Branding', 'Typography', 'Color Theory', 'Responsive Design']
  },
  {
    category: 'Tools',
    icon: Code2,
    items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch']
  },
  {
    category: 'Development',
    icon: Code2,
    items: ['HTML/CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Next.js']
  },
  {
    category: 'Collaboration',
    icon: Users,
    items: ['Agile', 'Design Systems', 'User Testing', 'Client Communication', 'Team Leadership']
  }
];

const experiences = [
  {
    period: '2022 - Present',
    title: 'Senior Web Designer',
    company: 'Creative Agency Co.',
    description: '글로벌 브랜드의 웹사이트 디자인 및 리뉴얼 프로젝트 리드. UI/UX 개선을 통한 전환율 35% 향상.',
    achievements: [
      '20+ 기업 웹사이트 디자인',
      'Design System 구축 및 관리',
      '주니어 디자이너 3명 멘토링'
    ]
  },
  {
    period: '2020 - 2022',
    title: 'Web Designer',
    company: 'Digital Solutions Inc.',
    description: '다양한 산업군의 웹사이트 및 모바일 앱 UI 디자인. 사용자 중심 디자인 프로세스 도입.',
    achievements: [
      '15+ 프로젝트 성공적 완수',
      '고객 만족도 평균 4.8/5.0',
      'UX 리서치 프로세스 정립'
    ]
  },
  {
    period: '2018 - 2020',
    title: 'Junior Designer',
    company: 'Startup Design Hub',
    description: '스타트업 환경에서 빠른 프로토타이핑과 실험적 디자인 경험 축적.',
    achievements: [
      '10+ 스타트업 브랜딩',
      '프로토타입 제작 및 사용자 테스트',
      'MVP 디자인 스프린트 참여'
    ]
  }
];

const awards = [
  {
    year: '2024',
    title: 'Best Web Design Award',
    organization: 'Korea Web Design Association',
    project: 'E-commerce Platform Redesign'
  },
  {
    year: '2023',
    title: 'Excellence in UX Design',
    organization: 'International Design Awards',
    project: 'Healthcare Dashboard'
  },
  {
    year: '2022',
    title: 'Rising Star Designer',
    organization: 'Creative Industry Awards',
    project: 'Brand Identity System'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {/* Cloudinary 이미지로 교체 필요 */}
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">YD</span>
                </div>
                {/* 실제 이미지 사용 시:
                <CldImage
                  src="portfolio/about/profile"
                  width={600}
                  height={600}
                  crop="fill"
                  gravity="face"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                */}
              </div>
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-3xl" />
            </div>

            {/* Intro Text */}
            <div className="space-y-6">
              <div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">안녕하세요!</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  디자이너 홍길동입니다
                </h1>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                사용자 경험을 최우선으로 생각하는 웹디자이너입니다. 
                5년 이상의 경력을 바탕으로 브랜드 아이덴티티와 디지털 경험을 
                조화롭게 결합하는 디자인을 추구합니다.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                아름다움과 기능성이 공존하는 디자인, 사용자의 문제를 해결하는 
                직관적인 인터페이스를 만들어내는 것이 저의 목표입니다.
              </p>

              <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="border-l border-gray-300 dark:border-gray-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                </div>
                <div className="border-l border-gray-300 dark:border-gray-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">30+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              다양한 도구와 기술을 활용하여 최상의 결과물을 만들어냅니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div 
                  key={skill.category}
                  className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {skill.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              다양한 프로젝트를 통해 쌓아온 경력
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-gray-50 dark:border-gray-800" />
                  
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {exp.period}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.company}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      {exp.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Awards & Recognition
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              받은 상과 인정
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {award.year}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {award.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {award.organization}
                </p>
                
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {award.project}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Heart className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            함께 멋진 프로젝트를 만들어보세요
          </h2>
          <p className="text-lg text-white/90 mb-8">
            새로운 프로젝트나 협업 기회에 대해 언제든 연락주세요.
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}
