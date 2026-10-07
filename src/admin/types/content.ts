export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  github: string;
  linkedin: string;
  instagram: string;
  instagramHandle: string;
  telegram: string;
  telegramHandle: string;
  bio: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  link: string;
  image: string;
  category: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface Settings {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  defaultTheme: string;
  accentColor: string;
}
