import React from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Award, Briefcase, GraduationCap, Users } from "lucide-react";
import { personalInfo, experience, education, certifications } from "../data";

const stats = [
  { label: "Years Experience", value: "1+", icon: Briefcase },
  { label: "Projects Completed", value: "10+", icon: Award },
  { label: "Satisfied Clients", value: "0", icon: Users },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="container-custom">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 font-display text-base font-bold uppercase tracking-widest text-primary-600">
              About Me
            </h2>
            <h3 className="mb-8 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
              I balance <span className="text-primary-600">design</span> and{" "}
              <span className="text-primary-600">technology</span> to build
              better experiences.
            </h3>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
              <p>{personalInfo.bio}</p>
              <p>
                As a 3rd-year Computer Science student, I've spent the last few
                years immersing myself in the world of web development. My
                journey started with graphic design, which gave me a keen eye
                for detail and aesthetics that I now bring to every line of code
                I write.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800"
                >
                  <stat.icon className="mb-3 text-primary-600" size={24} />
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certificates */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h4 className="mb-6 flex items-center gap-3 font-display text-xl font-bold text-slate-900 dark:text-white">
                <GraduationCap className="text-primary-600" /> Education
              </h4>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div
                    key={index}
                    className="relative border-l-2 border-primary-600/30 pl-6 dark:border-primary-600/20"
                  >
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary-600" />
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h5>
                    <p className="text-sm font-medium text-primary-600">
                      {item.duration}
                    </p>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                      {item.institution}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-6 flex items-center gap-3 font-display text-xl font-bold text-slate-900 dark:text-white">
                <Award className="text-primary-600" /> Certifications
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary-600" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {cert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
