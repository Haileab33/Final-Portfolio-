import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Briefcase, Code, Award, Clock } from 'lucide-react';

export const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    certifications: 0,
    lastUpdate: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      if (!token) return;

      setIsLoading(true);
      setError('');

      try {
        const [projectsRes, skillsRes, certsRes] = await Promise.all([
          api.getProjects(),
          api.getSkills(),
          api.getCertifications(),
        ]);

        setStats({
          projects: projectsRes.projects.length,
          skills: skillsRes.skills.reduce((acc: number, cat: any) => acc + cat.items.length, 0),
          certifications: certsRes.certifications.length,
          lastUpdate: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
        setError('Failed to load data. Make sure the backend server is running on port 3006.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [token]);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: Briefcase,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Skills',
      value: stats.skills,
      icon: Code,
      color: 'bg-green-500',
    },
    {
      title: 'Certifications',
      value: stats.certifications,
      icon: Award,
      color: 'bg-purple-500',
    },
    {
      title: 'Last Updated',
      value: stats.lastUpdate,
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/projects')}
              className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-white"
            >
              Add New Project
            </button>
            <button
              onClick={() => navigate('/admin/personal')}
              className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-white"
            >
              Update Personal Info
            </button>
            <button
              onClick={() => navigate('/admin/skills')}
              className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-white"
            >
              Manage Skills
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">API Status</span>
              <span className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Database</span>
              <span className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Storage</span>
              <span className="text-gray-900 dark:text-white">JSON Files</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
