import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data';
import { cn } from '../lib/utils';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
      <div className="container-custom">
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-display text-base font-bold uppercase tracking-widest text-primary-600">
            Social Proof
          </h2>
          <h3 className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Kind Words from Partners
          </h3>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -left-4 -top-12 opacity-10 md:-left-12 md:-top-20">
            <Quote size={160} className="text-primary-600" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[40px] bg-white p-10 shadow-xl dark:bg-slate-900 md:p-16 lg:p-20"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <p className="mb-10 text-xl font-medium italic leading-relaxed text-slate-700 dark:text-slate-300 md:text-2xl lg:text-3xl">
                  "{testimonials[current].content}"
                </p>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-slate-900 dark:text-white">
                    {testimonials[current].name}
                  </h5>
                  <p className="text-sm font-medium text-primary-600">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-8">
            <button
              onClick={prev}
              className="rounded-full border border-slate-200 bg-white p-4 text-slate-600 shadow-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300',
                    current === idx ? 'w-8 bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full border border-slate-200 bg-white p-4 text-slate-600 shadow-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
