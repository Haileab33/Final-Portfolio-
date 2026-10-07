import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useLocation, Outlet } from 'react-router-dom';

const pageTitleMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/personal': 'Personal Information',
  '/admin/skills': 'Skills Management',
  '/admin/projects': 'Projects',
  '/admin/experience': 'Experience',
  '/admin/education': 'Education',
  '/admin/testimonials': 'Testimonials',
  '/admin/certifications': 'Certifications',
  '/admin/settings': 'Settings',
};

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
