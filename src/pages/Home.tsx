import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Project';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { personalInfo } from '../data';

interface HomeProps {
  section?: string;
}

export default function Home({ section }: HomeProps) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, section]);

  return (
    <>
      <Helmet>
        <title>{personalInfo.name} | Portfolio</title>
        <meta name="description" content={personalInfo.bio} />
        <meta property="og:title" content={`${personalInfo.name} | Portfolio`} />
        <meta property="og:description" content={personalInfo.bio} />
        <meta name="twitter:title" content={`${personalInfo.name} | Portfolio`} />
      </Helmet>

      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Experience />
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
