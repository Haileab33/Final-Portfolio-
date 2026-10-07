import { ReactNode, useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
