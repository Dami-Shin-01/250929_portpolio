import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LogOut, Plus, Mail, FolderOpen, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function getStats() {
  const supabase = await createClient();
  
  const [
    { count: projectsCount },
    { count: messagesCount },
    { count: unreadCount }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('read', false)
  ]);

  return {
    projects: projectsCount || 0,
    messages: messagesCount || 0,
    unread: unreadCount || 0
  };
}

export default async function AdminDashboardPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/admin/login');
  }

  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                관리자 대시보드
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                사이트 보기
              </Link>
              <form action="/api/auth/signout" method="post">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.projects}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              전체 프로젝트
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.messages}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              전체 문의
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              {stats.unread > 0 && (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
                  New
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.unread}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              읽지 않은 문의
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            빠른 작업
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/dashboard/projects/new"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                새 프로젝트
              </span>
            </Link>

            <Link
              href="/admin/dashboard/projects"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <FolderOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                프로젝트 관리
              </span>
            </Link>

            <Link
              href="/admin/dashboard/messages"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group relative"
            >
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                문의 관리
              </span>
              {stats.unread > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full bg-red-500 text-white">
                  {stats.unread}
                </span>
              )}
            </Link>

            <Link
              href="/admin/dashboard/settings"
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                설정
              </span>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            💡 대시보드 사용 가이드
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• <strong>새 프로젝트</strong>: 이미지 업로드 컴포넌트를 사용하여 Cloudinary에 이미지를 업로드할 수 있습니다</li>
            <li>• <strong>프로젝트 관리</strong>: 기존 프로젝트를 수정, 삭제, 순서 변경할 수 있습니다</li>
            <li>• <strong>문의 관리</strong>: 고객 문의를 확인하고 답변할 수 있습니다</li>
            <li>• <strong>설정</strong>: 사이트 전반적인 설정을 관리할 수 있습니다</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
