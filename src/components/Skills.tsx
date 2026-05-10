import React from 'react';
import { motion } from 'motion/react';
import { skills } from '../data';
import { cn } from '../lib/utils';

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="container-custom">
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-display text-base font-bold uppercase tracking-widest text-primary-400">
            Expertise
          </h2>
          <h3 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            My Technical Stack
          </h3>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600/20 text-primary-400">
                  <group.icon size={28} />
                </div>
                <h4 className="font-display text-2xl font-bold">{group.category}</h4>
              </div>

              <div className="space-y-8">
                {group.items.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-medium text-slate-300">{skill.name}</span>
                      <span className="text-sm font-bold text-primary-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + skillIdx * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-600 to-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tags at the bottom */}
        <div className="mt-20 flex flex-wrap justify-center gap-4">
          {['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vitest', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'PostgreSQL', 'Docker', 'AWS'].map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx }}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-slate-400 hover:border-primary-500 hover:text-white transition-colors cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
