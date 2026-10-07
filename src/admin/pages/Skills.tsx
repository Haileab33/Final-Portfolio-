import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { SkillCategory } from '../types/content';
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export const Skills = () => {
  const { token } = useAuth();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await api.getSkills();
        setSkills(result.skills);
        // Expand all categories by default
        setExpandedCategories(new Set(result.skills.map((s: SkillCategory) => s.category)));
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
      await api.updateSkills(skills, token);
      setMessage('Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to save data');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, field: 'name' | 'level', value: string | number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items[skillIndex][field] = value;
    setSkills(newSkills);
  };

  const addSkill = (categoryIndex: number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items.push({ name: '', level: 50 });
    setSkills(newSkills);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].items.splice(skillIndex, 1);
    setSkills(newSkills);
  };

  const updateCategoryName = (categoryIndex: number, value: string) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].category = value;
    setSkills(newSkills);
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

      {skills.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            onClick={() => toggleCategory(category.category)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={category.category}
                onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="text-lg font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 p-0"
              />
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                ({category.items.length} skills)
              </span>
            </div>
            {expandedCategories.has(category.category) ? (
              <ChevronUp className="text-gray-500" size={20} />
            ) : (
              <ChevronDown className="text-gray-500" size={20} />
            )}
          </button>

          {expandedCategories.has(category.category) && (
            <div className="px-6 pb-6 space-y-4">
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(categoryIndex, skillIndex, 'name', e.target.value)}
                      placeholder="Skill name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(categoryIndex, skillIndex, 'level', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeSkill(categoryIndex, skillIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSkill(categoryIndex)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Add Skill</span>
              </button>
            </div>
          )}
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
