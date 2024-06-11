'use client';

import React, { useEffect, useState } from 'react';
import TypingAnimation from '../TypingAnimation';
import data from '../../data/profile';
import './styles.css';
import Card from '../Card';
import ProjectCard from '../ProjectCard';

export default function Profile() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const light = document.querySelector('.background-light') as HTMLElement;
      const { clientX: x, clientY: y } = e;

      if (light) {
        light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(58, 120, 239, 0.1), transparent 90%)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="background-light pointer-events-none fixed inset-0 z-30 transition duration-300"></div>
      <div className="profile-container relative px-6 py-12 font-sans md:px-12 md:py-12 lg:px-24 lg:py-12 max-w-screen-xl mx-auto">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:pt-12">
            <div className="flex flex-col items-center lg:items-start">
              <div className='flex flex-col items-center lg:flex-row lg:justify-start gap-4 w-full'>
                <img className="w-24 h-24 rounded-full lg:w-24 lg:h-24" src={data.avatarUrl} alt="Gabriel Rodrigues" draggable="false" />
                <div className="ml-4 lg:ml-0 w-full max-w-xs lg:max-w-full text-center lg:text-left">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-200 sm:text-5xl overflow-hidden">
                    {data.firstName} <TypingAnimation texts={[data.lastName, `<span class="text-violet-500">${data.nickname}</span>`]} delayBeforeErasing={2000} />
                  </h1>
                  <h2 className="mt-3 text-lg tracking-tight text-slate-200 sm:text-xl font-light">
                    {data.position}
                  </h2>
                </div>
              </div>
              <p className="mt-2 leading-normal text-slate-500 text-center lg:text-left">{data.summary}</p>
              <nav className="nav hidden lg:block mt-8" aria-label="In-page jump links">
                <ul>
                  <li>
                    <button className={`group flex items-center py-2 ${activeSection === 'about' ? 'text-violet-500' : ''}`} onClick={() => handleNavClick('about')} draggable="false">
                      <span className="nav-symbol mr-4">$</span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">About</span>
                    </button>
                  </li>
                  <li>
                    <button className={`group flex items-center py-2 ${activeSection === 'experience' ? 'text-violet-500' : ''}`} onClick={() => handleNavClick('experience')} draggable="false">
                      <span className="nav-symbol mr-4">$</span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">Experience</span>
                    </button>
                  </li>
                  <li>
                    <a className="group flex items-center py-2 ${activeSection === 'projects' ? 'text-violet-500' : ''}" onClick={() => handleNavClick('projects')} draggable="false">
                      <span className="nav-symbol mr-4">$</span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">Projects</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-2" href={data.resumeUrl} draggable="false" target="_blank" rel="noopener noreferrer">
                      <span className="nav-symbol mr-4">$</span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">Full résumé</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <div className="pt-12 lg:w-1/2">
            <section id="about" className="scroll-mt-16 lg:scroll-mt-24" aria-label="About me">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
              </div>
              <div>
                {data.about.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-slate-400 tracking-wide font-light">{paragraph}</p>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="mt-6" id="experience">
          <section id="experience" className="experience-section scroll-mt-16 lg:scroll-mt-24">
            <h2 className="text-lg tracking-wide text-slate-200"><span className='uppercase font-bold'>Experience</span></h2>
            <div className="experience-cards mt-4">
              {data.experience.map((experience, index) => (
                <Card key={index} period={experience.period} position={experience.position} description={experience.description} tags={experience.tags} url={experience.url} />
              ))}
            </div>
          </section>
        </div>
        <div className="mt-2" id="projects">
          <section id="projects" className="projects-section scroll-mt-16 lg:scroll-mt-24">
            <h2 className="text-lg tracking-wide text-slate-200"><span className='uppercase font-bold'>Projects</span></h2>
            <div className="projects-cards mt-4">
              {data.projects.map((project, index) => (
                <ProjectCard key={index} period={project.thumbnail} title={project.title} description={project.description} tags={project.tags} thumbnail={project.thumbnail} links={project.links} />
              ))}
            </div>
          </section>
        </div>
        <footer className="mt-12 text-center">
          <p className="text-slate-500">Made with <span className="text-red-500">♥</span> by Gabriel Rodrigues (0xda203). Inspired by <a className="text-violet-500" href="https://brittanychiang.com/" target="_blank" rel="noopener noreferrer">Brittany Chiang</a> website.</p>
        </footer>
      </div>
    </div>
  );
}
