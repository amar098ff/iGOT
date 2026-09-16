import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, User, ClipboardList, TrendingUp, BookOpen,
  CheckSquare, BarChart2, Bell, Settings, Target, Award,
  Users, Database, FileText, HelpCircle, PieChart, MessageSquare,
  BookMarked, Shield, Map, GraduationCap, Layers, Zap
} from 'lucide-react';

function clsx(...args) { return args.filter(Boolean).join(' '); }

const learnerNav = [
  { group: 'Overview', items: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: User, label: 'My Profile', to: '/profile' },
  ]},
  { group: 'Learning Journey', items: [
    { icon: Target, label: 'Competency Assessment', to: '/assessment' },
    { icon: TrendingUp, label: 'Skill Gaps', to: '/skill-gap' },
    { icon: Map, label: 'Learning Path', to: '/learning-path' },
    { icon: Zap, label: 'Recommendations', to: '/learning-path', badge: 'New' },
  ]},
  { group: 'Learn', items: [
    { icon: BookOpen, label: 'Courses', to: '/courses' },
    { icon: CheckSquare, label: 'Quizzes', to: '/quizzes' },
    { icon: ClipboardList, label: 'Assessments', to: '/assessment' },
  ]},
  { group: 'Track', items: [
    { icon: BarChart2, label: 'My Progress', to: '/progress' },
    { icon: Bell, label: 'Notifications', to: '/notifications' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ]},
];

const adminNav = [
  { group: 'Overview', items: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
    { icon: PieChart, label: 'Analytics', to: '/admin/analytics' },
    { icon: BarChart2, label: 'Reports', to: '/admin/reports' },
  ]},
  { group: 'People', items: [
    { icon: Users, label: 'Users', to: '/admin/users' },
    { icon: Shield, label: 'Roles', to: '/admin/roles' },
  ]},
  { group: 'Framework', items: [
    { icon: Layers, label: 'Competencies', to: '/admin/competencies' },
    { icon: Target, label: 'Skills', to: '/admin/skills' },
  ]},
  { group: 'Content', items: [
    { icon: BookOpen, label: 'Courses', to: '/admin/courses' },
    { icon: FileText, label: 'Content Upload', to: '/admin/content/upload' },
    { icon: Database, label: 'Documents', to: '/admin/content' },
  ]},
  { group: 'Assessment', items: [
    { icon: HelpCircle, label: 'Question Bank', to: '/admin/question-bank' },
    { icon: CheckSquare, label: 'Quizzes', to: '/admin/quizzes' },
    { icon: ClipboardList, label: 'Assessments', to: '/admin/assessments' },
  ]},
  { group: 'System', items: [
    { icon: Bell, label: 'Notifications', to: '/admin/notifications' },
    { icon: Settings, label: 'Settings', to: '/admin/settings' },
  ]},
];

export default function Sidebar({ mobile = false, onClose }) {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navItems = isAdmin ? adminNav : learnerNav;

  const isActive = (to) => {
    if (to === '/admin' || to === '/dashboard') return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <aside className={clsx(
      'bg-white border-r border-slate-200 flex flex-col',
      mobile ? 'fixed inset-y-0 left-0 z-40 w-64 shadow-xl animate-slide-in-right' : 'w-64 shrink-0'
    )}>
      {/* Mobile close */}
      {mobile && (
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">KarmaSiksha</span>
          </div>
          <button className="p-1 text-slate-500 hover:text-slate-700" onClick={onClose}>✕</button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navItems.map(({ group, items }) => (
          <div key={group}>
            <p className="text-2xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-1">
              {group}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ icon: Icon, label, to, badge }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={mobile ? onClose : undefined}
                    className={clsx('sidebar-link', isActive(to) && 'sidebar-link-active')}
                  >
                    <Icon size={16} />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span className="badge-primary text-xs">{badge}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom: iGOT badge */}
      <div className="p-3 border-t border-slate-200">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
          <BookMarked size={14} className="text-primary-600 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-700">iGOT Karmayogi</p>
            <p className="text-2xs text-slate-500">Integration Active</p>
          </div>
          <span className="ml-auto w-2 h-2 rounded-full bg-success-500 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
