import { NavLink, useLocation } from 'react-router-dom';
import { Layout, PenTool, Code, Terminal, Briefcase, GraduationCap, MessageSquare, Award, Settings, Home, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { path: '/admin', icon: Home, label: 'Dashboard' },
  { path: '/admin/personal', icon: Layout, label: 'Personal Info' },
  { path: '/admin/skills', icon: Code, label: 'Skills' },
  { path: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { path: '/admin/experience', icon: Terminal, label: 'Experience' },
  { path: '/admin/education', icon: GraduationCap, label: 'Education' },
  { path: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  { path: '/admin/certifications', icon: Award, label: 'Certifications' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Portfolio Management</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
