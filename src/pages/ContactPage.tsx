import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';
import { personalInfo } from '../data';

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Helmet>
        <title>Contact | {personalInfo.name}</title>
        <meta name="description" content={`Get in touch with ${personalInfo.name} for projects and collaborations.`} />
      </Helmet>
      
      <div className="bg-slate-50 py-20 dark:bg-slate-900/40">
        <div className="container-custom text-center">
          <h1 className="mb-4 font-display text-5xl font-bold tracking-tight text-slate-950 dark:text-white md:text-7xl">
            Let's <span className="text-primary-600">Connect</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities, creative ideas or original projects.
          </p>
        </div>
      </div>

      <Contact />

      <div className="container-custom mb-24 h-[400px] overflow-hidden rounded-[40px] shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Placeholder for map */}
        <div className="relative h-full w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="z-10 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary-600 shadow-xl dark:bg-slate-800">
              <span className="text-2xl">📍</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{personalInfo.location}</h4>
            <p className="text-slate-500 dark:text-slate-400">Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
