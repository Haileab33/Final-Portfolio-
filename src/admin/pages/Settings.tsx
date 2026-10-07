import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Settings as SettingsType } from '../types/content';
import { Save, Loader2, Globe, Palette, Layout as LayoutIcon } from 'lucide-react';

export const SettingsPage = () => {
  const { token } = useAuth();
  const [settings, setSettings] = useState<SettingsType>({
    siteName: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    defaultTheme: 'dark',
    accentColor: '#3b82f6',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await api.getSettings(token || '');
        setSettings(result);
      } catch (error) {
        setMessage('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  const handleSave = async () => {
    if (!token) return;

    setIsSaving(true);
    setMessage('');

    try {
      await api.updateSettings(settings, token);
      setMessage('Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (field: keyof SettingsType, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'seo', label: 'SEO', icon: LayoutIcon },
    { id: 'theme', label: 'Theme', icon: Palette },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {message && (
        <div
          className={`px-4 py-3 rounded-lg ${
            message.includes('success')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'general' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            General Settings
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            SEO Settings
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={settings.metaTitle}
              onChange={(e) => updateSetting('metaTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meta Description
            </label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => updateSetting('metaDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              value={settings.metaKeywords}
              onChange={(e) => updateSetting('metaKeywords', e.target.value)}
              placeholder="comma, separated, keywords"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {activeTab === 'theme' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Theme Settings
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Theme
            </label>
            <select
              value={settings.defaultTheme}
              onChange={(e) => updateSetting('defaultTheme', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Accent Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => updateSetting('accentColor', e.target.value)}
                className="w-16 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.accentColor}
                onChange={(e) => updateSetting('accentColor', e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
