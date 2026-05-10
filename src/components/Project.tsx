import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Filter, X, ArrowRight } from 'lucide-react';
import { projects } from '../data';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const categories = ['All', ...new Set(projects.map((project) => project.category))];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter(
    (p) => filter === 'All' || p.category === filter
  );

  return (
    <section id="projects" className="bg-white py-24 dark:bg-slate-950">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-base font-bold uppercase tracking-widest text-primary-600">
            Portfolio
          </h2>
          <h3 className="mb-8 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Selected Work
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'rounded-full px-6 py-2 text-sm font-medium transition-all duration-300',
                  filter === cat
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-slate-900',
                  project.featured && 'md:col-span-2 md:flex md:items-center'
                )}
              >
                <div className={cn(
                  'relative aspect-video overflow-hidden',
                  project.featured ? 'md:aspect-auto md:h-full md:w-1/2' : 'w-full'
                )}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="rounded-full bg-white px-6 py-2 text-sm font-bold text-slate-900 shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className={cn(
                  'p-8',
                  project.featured ? 'md:w-1/2' : 'w-full'
                )}>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h4 className="mb-3 font-display text-2xl font-bold text-slate-950 dark:text-white group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h4>
                  <p className="mb-6 line-clamp-2 text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:gap-3 transition-all"
                    >
                      Case Study <ArrowRight size={16} />
                    </button>
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                          <Github size={20} />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
           <Link to="/projects" className="btn btn-secondary border border-transparent hover:border-slate-300">
             Explore All Projects ({projects.length})
           </Link>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedProject.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 z-10 rounded-full bg-slate-100 p-2 text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white"
              >
                <X size={20} />
              </button>

              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-10">
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="rounded-full bg-primary-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mb-6 font-display text-4xl font-bold text-slate-950 dark:text-white">
                  {selectedProject.title}
                </h3>
                <div className="grid gap-12 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <h5 className="mb-4 text-lg font-bold text-slate-900 dark:text-white underline decoration-primary-600 decoration-2 underline-offset-4">
                      Overview
                    </h5>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                      Links
                    </h5>
                    <div className="flex flex-col gap-4">
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                          Live Preview <ExternalLink className="ml-2" size={18} />
                        </a>
                      )}
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                          GitHub Repo <Github className="ml-2" size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
