import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, ChevronUp, Lock } from 'lucide-react';
import { usePortfolioData } from '../context/DataContext';

export default function Footer() {
  const { personalInfo } = usePortfolioData();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              to="/"
              className="font-display text-2xl font-bold tracking-tighter text-primary-600 dark:text-primary-400"
            >
              HG.
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              {personalInfo.subtitle} based in {personalInfo.location}.
            </p>
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-primary-600"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-primary-600"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-slate-400 transition-colors hover:text-primary-600"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary-600">Home</Link>
              </li>
              <li>
                <Link to={{ pathname: '/', hash: '#about' }} className="hover:text-primary-600">About</Link>
              </li>
              <li>
                <Link to={{ pathname: '/', hash: '#projects' }} className="hover:text-primary-600">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-600">Contact</Link>
              </li>
              <li>
                <Link to="/admin/login" className="flex items-center gap-2 hover:text-primary-600">
                  <Lock size={14} />
                  <span>Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>{personalInfo.location}</li>
              <li>{personalInfo.email}</li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.telegramHandle}</li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center md:items-end">
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-2 rounded-full border border-slate-200 bg-white p-4 text-slate-500 shadow-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-slate-800 dark:bg-slate-900"
            >
              <ChevronUp className="transition-transform group-hover:-translate-y-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to top</span>
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-xs text-slate-400 dark:border-slate-800">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
