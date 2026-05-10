import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { personalInfo } from '../data';

const posts = [
  {
    id: 1,
    title: 'Mastering React Server Components',
    excerpt: 'Deep dive into the new era of React and how it changes the way we build web applications.',
    date: 'May 15, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: 'React'
  },
  {
    id: 2,
    title: 'The Future of CSS with Tailwind 4',
    excerpt: 'Exploring the upcoming features and improvements in the next generation of utility-first CSS.',
    date: 'Apr 28, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
    category: 'CSS'
  },
  {
    id: 3,
    title: 'Building Inclusive Interfaces',
    excerpt: 'Practical tips and techniques for ensuring your web applications are accessible to everyone.',
    date: 'Mar 12, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=800&q=80',
    category: 'Accessibility'
  }
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-24">
      <Helmet>
        <title>Blog | {personalInfo.name}</title>
        <meta name="description" content={`Articles and thoughts by ${personalInfo.name} on web development and design.`} />
      </Helmet>

      <div className="container-custom">
        <div className="mb-20 text-center">
          <h1 className="mb-4 font-display text-5xl font-bold tracking-tight text-slate-950 dark:text-white md:text-7xl">
            Recent <span className="text-secondary-600">Thoughts</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Sharing my journey, learnings, and insights about frontend technologies and modern design practices.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition-all hover:shadow-xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary-600">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h3 className="mb-4 font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white">
                  {post.title}
                </h3>
                <p className="mb-8 line-clamp-3 text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <Link to={`/blog/${post.id}`} className="flex items-center gap-1 text-sm font-bold text-primary-600 transition-all hover:gap-2">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 rounded-[40px] bg-primary-600 p-12 text-center text-white md:p-20">
          <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">Stay Updated</h2>
          <p className="mx-auto mb-10 max-w-xl text-primary-100 md:text-lg">
            Join my newsletter to get the latest articles and project updates directly in your inbox.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-grow rounded-full bg-white/20 px-6 py-4 text-white placeholder-white/60 outline-none backdrop-blur-md transition-all focus:bg-white/30"
            />
            <button className="rounded-full bg-white px-8 py-4 font-bold text-primary-600 transition-transform active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
