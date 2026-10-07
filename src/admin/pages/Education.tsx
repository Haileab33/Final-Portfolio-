import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Education } from '../types/content';
import { Save, Loader2, Plus, Trash2, GraduationCap } from 'lucide-react';

export const EducationPage = () => {
  const { token } = useAuth();
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await api.getEducation();
        setEducation(result.education);
      } catch (error) {
        setMessage('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    if (!token) return;

    setIsSaving(true);
    setMessage('');

    try {
      await api.updateEducation({ education }, token);
      setMessage('Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save data');
    } finally {
      setIsSaving(false);
    }
  };

  const updateEntry = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const addEntry = () => {
    setEducation([
      ...education,
      { institution: '', degree: '', duration: '', description: '' },
    ]);
  };

  const removeEntry = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

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

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Education ({education.length})
        </h3>
        <button
          onClick={addEntry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Education</span>
        </button>
      </div>

      {education.map((entry, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <GraduationCap className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={entry.institution}
                  onChange={(e) => updateEntry(index, 'institution', e.target.value)}
                  placeholder="Institution Name"
                  className="w-full text-lg font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 p-0"
                />
                <input
                  type="text"
                  value={entry.degree}
                  onChange={(e) => updateEntry(index, 'degree', e.target.value)}
                  placeholder="Degree/Certificate"
                  className="w-full text-sm bg-transparent border-none text-gray-600 dark:text-gray-400 focus:ring-0 p-0"
                />
              </div>
            </div>
            <button
              onClick={() => removeEntry(index)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={entry.duration}
                onChange={(e) => updateEntry(index, 'duration', e.target.value)}
                placeholder="e.g., 2020 - 2024"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={entry.description}
                onChange={(e) => updateEntry(index, 'description', e.target.value)}
                rows={3}
                placeholder="Describe your education..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      ))}

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
