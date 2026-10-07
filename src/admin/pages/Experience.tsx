import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Experience } from '../types/content';
import { Save, Loader2, Plus, Trash2, Building2 } from 'lucide-react';

export const ExperiencePage = () => {
  const { token } = useAuth();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await api.getExperience();
        setExperience(result.experience);
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
      await api.updateExperience({ experience }, token);
      setMessage('Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save data');
    } finally {
      setIsSaving(false);
    }
  };

  const updateEntry = (index: number, field: keyof Experience, value: any) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setExperience(newExperience);
  };

  const updateDescription = (entryIndex: number, descIndex: number, value: string) => {
    const newExperience = [...experience];
    newExperience[entryIndex].description[descIndex] = value;
    setExperience(newExperience);
  };

  const addEntry = () => {
    setExperience([
      ...experience,
      { company: '', role: '', duration: '', description: [''] },
    ]);
  };

  const removeEntry = (index: number) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
  };

  const addDescription = (entryIndex: number) => {
    const newExperience = [...experience];
    newExperience[entryIndex].description.push('');
    setExperience(newExperience);
  };

  const removeDescription = (entryIndex: number, descIndex: number) => {
    const newExperience = [...experience];
    newExperience[entryIndex].description = newExperience[entryIndex].description.filter(
      (_, i) => i !== descIndex
    );
    setExperience(newExperience);
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
          Work Experience ({experience.length})
        </h3>
        <button
          onClick={addEntry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.map((entry, entryIndex) => (
        <div
          key={entryIndex}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Building2 className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <input
                  type="text"
                  value={entry.company}
                  onChange={(e) => updateEntry(entryIndex, 'company', e.target.value)}
                  placeholder="Company Name"
                  className="text-lg font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 p-0"
                />
                <input
                  type="text"
                  value={entry.role}
                  onChange={(e) => updateEntry(entryIndex, 'role', e.target.value)}
                  placeholder="Role/Position"
                  className="text-sm bg-transparent border-none text-gray-600 dark:text-gray-400 focus:ring-0 p-0"
                />
              </div>
            </div>
            <button
              onClick={() => removeEntry(entryIndex)}
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
                onChange={(e) => updateEntry(entryIndex, 'duration', e.target.value)}
                placeholder="e.g., Jan 2020 - Present"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Responsibilities
              </label>
              <div className="space-y-2">
                {entry.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => updateDescription(entryIndex, descIndex, e.target.value)}
                      placeholder="Describe your responsibility..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeDescription(entryIndex, descIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addDescription(entryIndex)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Plus size={18} />
                  <span>Add Responsibility</span>
                </button>
              </div>
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
