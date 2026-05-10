import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, ChevronRight } from 'lucide-react';
import { projects, personalInfo } from '../data';
import { cn } from '../lib/utils';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Project not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div className="pt-24 pb-24">
      <Helmet>
        <title>{project.title} | {personalInfo.name}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-16 lg:grid-cols-2"
        >
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[40px] shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-3xl">
                <img
                   src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80`}
                   className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                   alt="code snippet"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-3xl">
                <img
                   src={`https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80`}
                   className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                   alt="workflow"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-slate-950 dark:text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              {project.longDescription}
            </p>

            <div className="mb-12 flex flex-wrap gap-4">
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary px-10">
                  Live Preview <ExternalLink className="ml-2" size={20} />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary px-10">
                  GitHub Repository <Github className="ml-2" size={20} />
                </a>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
              <h4 className="mb-6 font-display text-xl font-bold text-slate-900 dark:text-white">Project Highlights</h4>
              <ul className="space-y-4">
                {[
                  'Performance optimized architecture',
                  'Fully responsive and mobile-first design',
                  'Seamless integration with modern APIs',
                  'Clean and maintainable code structure'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Next Project Teaser */}
        <div className="mt-32 border-t border-slate-200 pt-16 dark:border-slate-800">
          <Link to={`/project/${nextProject.id}`} className="group block">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors group-hover:text-primary-600">
              Next Project
            </p>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
                {nextProject.title}
              </h2>
              <ChevronRight className="h-12 w-12 text-slate-300 transition-all group-hover:translate-x-4 group-hover:text-primary-600 md:h-20 md:w-20" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
