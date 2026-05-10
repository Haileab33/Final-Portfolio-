import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-display text-[120px] font-black leading-none text-slate-100 dark:text-slate-900 md:text-[200px]">
          404
        </span>
        <div className="relative -mt-12 md:-mt-20">
          <h1 className="mb-4 font-display text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
            Oops! Page not found
          </h1>
          <p className="mx-auto mb-10 max-w-md text-lg text-slate-500 dark:text-slate-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/" className="btn btn-primary w-full sm:w-auto">
              <Home className="mr-2" size={18} /> Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2" size={18} /> Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
