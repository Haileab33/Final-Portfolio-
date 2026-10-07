import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  personalInfo as defaultPersonalInfo,
  skills as defaultSkills,
  projects as defaultProjects,
  experience as defaultExperience,
  education as defaultEducation,
  certifications as defaultCertifications,
  testimonials as defaultTestimonials,
} from '../data';
import {
  Layout,
  PenTool,
  Terminal,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Cpu,
  Database,
  Server,
  Layers,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Layout,
  PenTool,
  Terminal,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Cpu,
  Database,
  Server,
  Layers,
};

export const getSkillIcon = (icon: any) => {
  if (typeof icon === 'string') {
    return ICON_MAP[icon] || Code;
  }
  return icon || Code;
};

interface PortfolioDataContextType {
  personalInfo: typeof defaultPersonalInfo;
  skills: typeof defaultSkills;
  projects: typeof defaultProjects;
  experience: typeof defaultExperience;
  education: typeof defaultEducation;
  certifications: typeof defaultCertifications;
  testimonials: typeof defaultTestimonials;
  refreshData: () => void;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

const getStoredData = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(`portfolio_${key}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(fallback) && Array.isArray(parsed)) {
        return parsed.length > 0 ? (parsed as unknown as T) : fallback;
      }
      if (typeof fallback === 'object' && fallback !== null && typeof parsed === 'object' && parsed !== null) {
        return { ...fallback, ...parsed };
      }
      return parsed;
    }
  } catch (e) {
    console.error(`Error reading portfolio_${key} from localStorage:`, e);
  }
  return fallback;
};

export const PortfolioDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState(() =>
    getStoredData('personal_info', defaultPersonalInfo)
  );
  const [skills, setSkills] = useState(() => {
    const rawSkills = getStoredData('skills', defaultSkills);
    return rawSkills.map((cat: any) => ({
      ...cat,
      icon: getSkillIcon(cat.icon),
    }));
  });
  const [projects, setProjects] = useState(() =>
    getStoredData('projects', defaultProjects)
  );
  const [experience, setExperience] = useState(() =>
    getStoredData('experience', defaultExperience)
  );
  const [education, setEducation] = useState(() =>
    getStoredData('education', defaultEducation)
  );
  const [certifications, setCertifications] = useState(() =>
    getStoredData('certifications', defaultCertifications)
  );
  const [testimonials, setTestimonials] = useState(() =>
    getStoredData('testimonials', defaultTestimonials)
  );

  const loadAllData = () => {
    setPersonalInfo(getStoredData('personal_info', defaultPersonalInfo));
    
    const rawSkills = getStoredData('skills', defaultSkills);
    setSkills(
      rawSkills.map((cat: any) => ({
        ...cat,
        icon: getSkillIcon(cat.icon),
      }))
    );
    
    setProjects(getStoredData('projects', defaultProjects));
    setExperience(getStoredData('experience', defaultExperience));
    setEducation(getStoredData('education', defaultEducation));
    setCertifications(getStoredData('certifications', defaultCertifications));
    setTestimonials(getStoredData('testimonials', defaultTestimonials));
  };

  useEffect(() => {
    const handleUpdate = () => {
      loadAllData();
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('portfolio_data_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('portfolio_data_updated', handleUpdate);
    };
  }, []);

  return (
    <PortfolioDataContext.Provider
      value={{
        personalInfo,
        skills,
        projects,
        experience,
        education,
        certifications,
        testimonials,
        refreshData: loadAllData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
