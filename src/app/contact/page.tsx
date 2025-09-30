import { Metadata } from 'next';
import { Mail, MapPin, Phone, Github, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Portfolio',
  description: '프로젝트 문의 및 연락처',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@designer.com',
    href: 'mailto:hello@designer.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+82 10-1234-5678',
    href: 'tel:+821012345678'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Seoul, South Korea',
    href: null
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/yourusername',
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-blue-600'
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/yourusername',
    color: 'hover:text-pink-600'
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Work Together
          </h1>
          <p className="text-lg text-white/90">
            새로운 프로젝트나 협업 기회에 대해 언제든 연락주세요. 
            24시간 내에 답변드리겠습니다.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  메시지 보내기
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  아래 양식을 작성하시면 이메일로 연락드리겠습니다.
                </p>
              </div>
              
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  연락처 정보
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  직접 연락하시려면 아래 정보를 이용해주세요.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    const content = (
                      <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {info.label}
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    );

                    return info.href ? (
                      <a key={info.label} href={info.href} className="block">
                        {content}
                      </a>
                    ) : (
                      <div key={info.label}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  소셜 미디어
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} transition-colors`}
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500 mt-1.5 animate-pulse" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      현재 프로젝트 가능
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      새로운 프로젝트를 시작할 수 있습니다. 
                      예상 응답 시간은 24시간 이내입니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  자주 묻는 질문
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      프로젝트 기간은 얼마나 걸리나요?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      프로젝트 규모에 따라 2-8주 정도 소요됩니다.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      비용은 어떻게 되나요?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      프로젝트 상담 후 맞춤 견적을 제공해드립니다.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      원격 작업이 가능한가요?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      네, 전 세계 어디서든 협업 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              오시는 길
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              서울 강남구에 위치해 있습니다
            </p>
          </div>
          
          {/* 실제 구글 맵 임베드로 교체 가능 */}
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                지도 임베드 영역
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
