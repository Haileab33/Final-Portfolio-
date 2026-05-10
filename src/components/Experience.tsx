import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { experience, education } from '../data';
import { cn } from '../lib/utils';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-base font-bold uppercase tracking-widest text-primary-600">
            Journey
          </h2>
          <h3 className="mb-8 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            My Professional Story
          </h3>

          <div className="inline-flex rounded-full bg-slate-100 p-1 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('work')}
              className={cn(
                'flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold transition-all duration-300',
                activeTab === 'work'
                  ? 'bg-white text-primary-600 shadow-md dark:bg-slate-800 dark:text-primary-400'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <Briefcase size={18} /> Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={cn(
                'flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold transition-all duration-300',
                activeTab === 'education'
                  ? 'bg-white text-primary-600 shadow-md dark:bg-slate-800 dark:text-primary-400'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <GraduationCap size={20} /> Education
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {activeTab === 'work' ? (
              <motion.div
                key="work"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                {experience.map((exp, idx) => (
                  <div 
                    key={idx}
                    className="group relative rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                  >
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h4 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h4>
                        <p className="text-lg font-medium text-primary-600">
                          {exp.company}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                          <ChevronRight className="mt-1 flex-shrink-0 text-primary-600" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {education.map((edu, idx) => (
                  <div 
                    key={idx}
                    className="group relative rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                  >
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h4 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-lg font-medium text-primary-600">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
