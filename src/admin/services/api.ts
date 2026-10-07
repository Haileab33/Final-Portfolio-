// Import JSON files directly for development without backend
import personalInfoData from '../../data/personal-info.json';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';
import experienceData from '../../data/experience.json';
import educationData from '../../data/education.json';
import testimonialsData from '../../data/testimonials.json';
import certificationsData from '../../data/certifications.json';
import settingsData from '../../data/settings.json';

const API_BASE = 'http://localhost:3006/api';

const getStorageItem = <T>(key: string, defaultData: T): T => {
  try {
    const saved = localStorage.getItem(`portfolio_${key}`);
    return saved ? JSON.parse(saved) : defaultData;
  } catch (e) {
    return defaultData;
  }
};

const setStorageItem = (key: string, data: any) => {
  try {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    if (
      (email === 'haileabgashaw386@gmail.com' && password === '447490') ||
      (email === 'admin@example.com' && password === 'admin123')
    ) {
      const token = btoa(`${email}:${Date.now()}`);
      return { token, user: { email } };
    }
    throw new Error('Invalid credentials');
  },

  verifyToken: async (token: string) => {
    return { valid: true, user: { email: 'haileabgashaw386@gmail.com' } };
  },

  // Content
  getPersonalInfo: async () => {
    const data = getStorageItem('personal_info', personalInfoData);
    return { personalInfo: data };
  },

  updatePersonalInfo: async (data: any, token: string) => {
    setStorageItem('personal_info', data);
    return { success: true };
  },

  getSkills: async () => {
    const data = getStorageItem('skills', skillsData);
    return { skills: data };
  },

  updateSkills: async (skills: any, token: string) => {
    setStorageItem('skills', skills);
    return { success: true };
  },

  getProjects: async () => {
    const data = getStorageItem('projects', projectsData);
    return { projects: data };
  },

  createProject: async (project: any, token: string) => {
    const currentProjects = getStorageItem('projects', projectsData);
    const newProject = { ...project, id: Date.now().toString() };
    const updated = [...currentProjects, newProject];
    setStorageItem('projects', updated);
    return { success: true, id: newProject.id };
  },

  updateProject: async (id: string, project: any, token: string) => {
    const currentProjects = getStorageItem<any[]>('projects', projectsData);
    const updated = currentProjects.map((p) => (p.id === id ? { ...p, ...project } : p));
    setStorageItem('projects', updated);
    return { success: true };
  },

  deleteProject: async (id: string, token: string) => {
    const currentProjects = getStorageItem<any[]>('projects', projectsData);
    const updated = currentProjects.filter((p) => p.id !== id);
    setStorageItem('projects', updated);
    return { success: true };
  },

  getExperience: async () => {
    const data = getStorageItem('experience', experienceData);
    return { experience: data };
  },

  updateExperience: async (experience: any, token: string) => {
    setStorageItem('experience', Array.isArray(experience) ? experience : experience.experience || []);
    return { success: true };
  },

  getEducation: async () => {
    const data = getStorageItem('education', educationData);
    return { education: data };
  },

  updateEducation: async (education: any, token: string) => {
    setStorageItem('education', Array.isArray(education) ? education : education.education || []);
    return { success: true };
  },

  getTestimonials: async () => {
    const data = getStorageItem('testimonials', testimonialsData);
    return { testimonials: data };
  },

  updateTestimonials: async (testimonials: any, token: string) => {
    setStorageItem('testimonials', Array.isArray(testimonials) ? testimonials : testimonials.testimonials || []);
    return { success: true };
  },

  getCertifications: async () => {
    const data = getStorageItem('certifications', certificationsData);
    return { certifications: data };
  },

  updateCertifications: async (certifications: any, token: string) => {
    setStorageItem('certifications', Array.isArray(certifications) ? certifications : certifications.certifications || []);
    return { success: true };
  },

  getSettings: async (token: string) => {
    return getStorageItem('settings', settingsData);
  },

  updateSettings: async (settings: any, token: string) => {
    setStorageItem('settings', settings);
    return { success: true };
  },
};
