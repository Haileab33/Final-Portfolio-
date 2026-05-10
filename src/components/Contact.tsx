import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import { personalInfo } from "../data";
import { cn } from "../lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykbqawk";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Unable to send your message right now.");
      }

      setIsSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-base font-bold uppercase tracking-widest text-primary-600">
            Get In Touch
          </h2>
          <h3 className="mb-8 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Let's Start a Project
          </h3>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h5 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                    Email Me
                  </h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    Our support team is here to help you.
                  </p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="mt-2 block font-medium text-primary-600 hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                    Call Me
                  </h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="mt-2 block font-medium text-blue-600 hover:underline"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                    Location
                  </h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    Visit my studio or meet for coffee.
                  </p>
                  <span className="mt-2 block font-medium text-purple-600">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 dark:bg-slate-900/50">
              <h5 className="mb-6 font-display text-xl font-bold text-slate-900 dark:text-white">
                Follow My Work
              </h5>
              <div className="space-y-4">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "Haileab33",
                    link: personalInfo.github,
                    color: "hover:border-slate-900 hover:text-slate-900 dark:hover:text-white",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    value: personalInfo.instagramHandle,
                    link: personalInfo.instagram,
                    color: "hover:border-pink-500 hover:text-pink-500",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "Haileab Gashaw",
                    link: personalInfo.linkedin,
                    color: "hover:border-blue-600 hover:text-blue-600",
                  },
                  {
                    icon: Send,
                    label: "Telegram",
                    value: personalInfo.telegramHandle,
                    link: personalInfo.telegram,
                    color: "hover:border-sky-500 hover:text-sky-500",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border border-transparent bg-white px-4 py-3 text-slate-500 shadow-sm transition-all dark:bg-slate-800",
                      social.color,
                    )}
                  >
                    <social.icon size={20} />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {social.label}
                      </p>
                      <p className="text-sm">{social.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] bg-slate-50 p-8 dark:bg-slate-900/50 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-slate-700 dark:text-slate-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-all focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-slate-700 dark:text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-all focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-all focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="What is this about?"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-all focus:border-primary-600 focus:ring-2 focus:ring-primary-600/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "btn btn-primary w-full py-5 text-lg shadow-xl shadow-primary-500/30",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send size={20} />
                  </span>
                )}
              </button>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-green-500/10 p-4 text-center text-sm font-bold text-green-500"
                >
                  Success! I'll get back to you as soon as possible.
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-red-500/10 p-4 text-center text-sm font-bold text-red-500"
                >
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
