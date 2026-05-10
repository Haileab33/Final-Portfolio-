import React from 'react';
import { motion } from 'motion/react';
import { ReactTyped } from 'react-typed';
import { Github, Linkedin, Mail, Send, FileText, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data';
import { cn } from '../lib/utils';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-400/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-400/20 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="h-32 w-32 rounded-3xl bg-gradient-to-tr from-primary-600 to-blue-500 p-1 shadow-2xl md:h-40 md:w-40">
              <div className="flex h-full w-full items-center justify-center rounded-[calc(1.5rem-4px)] bg-white dark:bg-slate-900 overflow-hidden">
                 <span className="text-4xl font-display font-bold text-primary-600">HG</span>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-2 -right-2 rounded-full border-4 border-white bg-green-500 p-3 dark:border-slate-900"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 font-display text-5xl font-bold tracking-tight text-slate-950 dark:text-white md:text-7xl lg:text-8xl"
          >
            I'm <span className="text-primary-600">{personalInfo.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-xl font-medium text-slate-600 dark:text-slate-400 md:text-3xl"
          >
            <ReactTyped
              strings={[
                'Frontend Developer',
                'React Expert',
                'UI/UX Enthusiast',
                'Graphic Designer'
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10 max-w-2xl text-slate-500 dark:text-slate-400 md:text-lg"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#projects" className="btn btn-primary shadow-lg shadow-primary-500/30">
              View Work <ChevronDown className="ml-2" size={20} />
            </a>
            <a href="/contact" className="btn btn-secondary">
              Contact Me <Send className="ml-2" size={18} />
            </a>
            <a
              href="/Junior-Web-Developer.pdf"
              download="Junior Web Developer.pdf"
              className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FileText className="mr-2" size={18} /> Resume (PDF)
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex space-x-6"
          >
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600">
              <Github size={24} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-slate-400 hover:text-primary-600">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>
      </motion.div>
    </section>
  );
}
