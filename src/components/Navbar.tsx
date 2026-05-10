import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Github as GithubIcon, Linkedin as LinkedinIcon, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { personalInfo } from '../data';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'glass py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-tighter text-primary-600 dark:text-primary-400"
          onClick={closeMenu}
        >
          HG.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400',
                location.pathname + location.hash === link.href
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400'
              )}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 dark:text-slate-400"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 dark:text-slate-400"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-slate-900 md:hidden overflow-hidden border-b border-slate-200 dark:border-slate-800"
          >
            <div className="container-custom flex flex-col space-y-4 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-medium text-slate-600 dark:text-slate-400"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-6 pt-4">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600">
                  <GithubIcon size={24} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600">
                  <LinkedinIcon size={24} />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="text-slate-400 hover:text-primary-600">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
