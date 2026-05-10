# Haileab Gashaw Portfolio

A professional, high-performance portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with a custom navigation menu.
- **Dark/Light Mode**: Full theme toggle with local storage persistence and system preference detection.
- **Smooth Animations**: Powered by Framer Motion (motion/react).
- **Interactive Projects**: Project filtering, detailed case study modal, and dedicated project pages.
- **Typing Effect**: Dynamic role titles in the hero section.
- **Skills Visualization**: Animated progress bars and categorized skill tags.
- **Contact Form**: Interactive form with validation and submission states (ready for EmailJS/Formspree integration).
- **SEO Ready**: Meta tags managed by React Helmet Async.
- **Clean Architecture**: Modular component structure and centralized data management.

## Tech Stack

- **Framework**: React 19
- **Styler**: Tailwind CSS 4
- **Animations**: Framer Motion (motion/react)
- **Icons**: Lucide React
- **Routing**: React Router 7
- **Type Safety**: TypeScript

## Getting Started

### Installation

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`.

### Development

Run the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

## Customization Guide

### Content

All site content is centralized in `src/data.ts`. Update this file to change:

- Personal info (name, bio, social links)
- Projects (titles, descriptions, images, tech stack)
- Skills (categories, proficiency levels)
- Experience & Education timeline
- Testimonials

.

