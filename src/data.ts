import { Code, Layout, PenTool, Terminal } from 'lucide-react';

export const personalInfo = {
  name: 'Haileab Gashaw',
  title: 'Junior Frontend Web Developer',
  subtitle: 'JavaScript | React | Graphic Designer',
  email: 'haileabgashaw386@gmail.com',
  phone: '+251944749066',
  location: 'Addis Ababa, Ethiopia',
  portfolio: 'https://haileab33.github.io/MY-Wwebsite',
  github: 'https://github.com/Haileab33',
  linkedin: 'https://www.linkedin.com/in/haileab-gashaw-5b2967263',
  instagram: 'https://www.instagram.com/_hhaile_/',
  instagramHandle: '_hhaile_',
  telegram: 'https://t.me/Lel_1717',
  telegramHandle: '@Lel_1717',
  bio: `Motivated Junior Web Developer with a strong foundation in HTML, CSS, JavaScript, and React, experienced in building responsive, user-friendly websites and basic web applications. Also skilled in graphic design. Seeking an entry-level role to contribute to real projects and grow professionally.`,
};

export const skills = [
  {
    category: 'Frontend',
    icon: Layout,
    items: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
    ],
  },
  {
    category: 'Design',
    icon: PenTool,
    items: [
      { name: 'Figma', level: 85 },
      { name: 'Photoshop', level: 80 },
      { name: 'Illustrator', level: 75 },
    ],
  },
  {
    category: 'Other',
    icon: Terminal,
    items: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Basic SEO', level: 70 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: Code,
    items: [
      { name: 'Problem-solving', level: 90 },
      { name: 'Communication', level: 85 },
      { name: 'Teamwork', level: 90 },
    ],
  },
];

export const projects = [
  {
    id: 'calculator',
    title: 'Calculator Web App',
    description: 'Built a responsive calculator using vanilla JavaScript with clean UI and accurate calculation logic.',
    longDescription: 'This project was a deep dive into DOM manipulation and event handling without external libraries. It features a fully responsive design and supports standard arithmetic operations.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Haileab33/calculator',
    link: 'https://haileab33.github.io/calculator/',
    image: '/calculator-project.svg',
    category: 'Frontend',
    featured: false
  },
  {
    id: 'landing-page',
    title: 'Landing Page Website',
    description: 'Designed and developed a responsive marketing landing page focused on accessibility and UX.',
    longDescription: 'Optimized structure for better readability and SEO basics. Used modern CSS techniques for layout and animations.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Haileab33/Landing-page',
    link: 'https://haileab33.github.io/Landing-page/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    category: 'Frontend',
    featured: true
  },
  {
    id: 'todo-list',
    title: 'Todo List Application',
    description: 'Created a todo app with JavaScript DOM manipulation and localStorage for persistence.',
    longDescription: 'Strengthened frontend logic and clean code practices. Features include adding, deleting, and marking tasks as complete.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Haileab33/todo-list',
    link: 'https://haileab33.github.io/todo-list/',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60',
    category: 'Frontend',
    featured: false
  },
  {
    id: 'design-portfolio',
    title: 'Graphic Design Showcase',
    description: 'A collection of logos, posters, and social media graphics designed for various clients.',
    longDescription: 'Showcases proficiency in Figma, Adobe Photoshop, and Illustrator. Projects focus on brand identity and visual storytelling.',
    tech: ['Figma', 'Photoshop', 'Illustrator'],
    github: '#',
    link: '#',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60',
    category: 'Design',
    featured: false
  },
  {
    id: 'aether-chat',
    title: 'Aether Chat',
    description: 'A chat-focused web app project with a clean interface built for modern communication workflows.',
    longDescription: 'Aether Chat highlights frontend structure, polished UI decisions, and a streamlined user experience for a messaging product concept.',
    tech: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/Haileab33/Aether-chat',
    link: 'https://haileab33.github.io/Aether-chat/',
    image: '/aether-chat-project.svg',
    category: 'React',
    featured: false
  },
  {
    id: 'budget-lite',
    title: 'Budget Lite',
    description: 'A lightweight budgeting app focused on tracking spending with a simple and practical interface.',
    longDescription: 'Budget Lite showcases clean layout decisions, personal finance tracking flows, and a responsive interface designed to stay easy to use across devices.',
    tech: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/Haileab33/budget-lite',
    link: 'https://haileab33.github.io/budget-lite/',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60',
    category: 'React',
    featured: false
  },
  {
    id: 'telegram-theme-bot',
    title: 'Telegram-Theme-bot',
    description: 'A Telegram bot project centered on theme-related automation and customization workflows.',
    longDescription: 'This project focuses on bot-oriented logic and integration ideas, showing how product utility can be delivered through a simple repository-driven tool.',
    tech: ['JavaScript', 'Bot', 'GitHub'],
    github: 'https://github.com/Haileab33/telegram-theme-bot',
    link: '',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=60',
    category: 'Frontend',
    featured: false
  },
  {
    id: 'my-wwebsite',
    title: 'MY-Wwebsite',
    description: 'A personal website project built to present content, branding, and core web development work.',
    longDescription: 'MY-Wwebsite brings together personal branding, responsive page structure, and public deployment through GitHub Pages in one complete portfolio-style site.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Haileab33/MY-Wwebsite',
    link: 'https://haileab33.github.io/MY-Wwebsite/',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=60',
    category: 'Frontend',
    featured: false
  }
];

export const experience = [
  {
    company: 'Freelance',
    role: 'Web Developer & Graphic Designer',
    duration: 'Present',
    description: [
      'Built small websites and landing pages for local clients.',
      'Designed logos, posters, and social media graphics.',
      'Worked directly with clients to meet specific requirements and deadlines.'
    ]
  }
];

export const education = [
  {
    institution: 'University',
    degree: 'Bachelor of Science in Computer Science',
    duration: '3rd Year Student',
    description: 'Focusing on core CS principles, web technologies, and software engineering.'
  }
];

export const certifications = [
  'Web Development Fundamentals (HTML, CSS, JavaScript)',
  'React Basics (Self-learning & Projects)',
  'Graphic Design Certificate'
];

export const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Creative Director',
    content: 'Haileab is a dedicated developer who always goes the extra mile. His design sense combined with technical skills is a rare find.'
  },
  {
    name: "Sarah Lee",
    role: "Client",
    content: "The landing page Haileab built for my business exceeded expectations. It's fast, beautiful, and works perfectly on mobile."
  }
];
