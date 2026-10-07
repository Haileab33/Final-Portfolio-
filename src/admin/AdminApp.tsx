import { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Login } from './pages/Login';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { PersonalInfoPage } from './pages/PersonalInfo';
import { Skills } from './pages/Skills';
import { Projects } from './pages/Projects';
import { ExperiencePage } from './pages/Experience';
import { EducationPage } from './pages/Education';
import { TestimonialsPage } from './pages/Testimonials';
import { CertificationsPage } from './pages/Certifications';
import { SettingsPage } from './pages/Settings';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="personal" element={<PersonalInfoPage />} />
      <Route path="skills" element={<Skills />} />
      <Route path="projects" element={<Projects />} />
      <Route path="experience" element={<ExperiencePage />} />
      <Route path="education" element={<EducationPage />} />
      <Route path="testimonials" element={<TestimonialsPage />} />
      <Route path="certifications" element={<CertificationsPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  </Layout>
);

export const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
