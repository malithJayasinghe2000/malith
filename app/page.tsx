"use client";

import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 200; // offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const experiences = [
    {
      period: "2025 Apr — Present",
      title: "Intern Software Engineer",
      company: "One Billion Technology",
      description: "Working on microservices-based application using Spring Boot and React.js, improving system scalability and maintainability",
      tags: ["Spring Boot", "React", "MongoDB", "AWS","Microservices", "Bitbucket", "Jira", "Postman"]
    },
    {
      period: "2024 Feb — 2024 Oct",
      title: "Intern Software Engineer",
      company: "Softmint Software Solutions",
      description: "Optimized SQL queries and improved database performance. Specialized in creating scalable and secure backend services using Laravel, focusing on database management and API integration.",
      tags: ["Laravel", "React", "MySql", "WordPress", "Node.js", "Github", "Digital Ocean", "CPanel"]
    }
  ];

  const projects = [
    {
      title: "Coworking Space Booking web app (Millionspaces)",
      description: "Contributed to the development of a web application for booking coworking spaces in Sri Lanka. Users can browse, book, and manage coworking space reservations with real-time availability and secure payments.",
      tags: ["React", "Spring Boot", "MongoDB", "AWS"],
      link: "https://millionspaces.com/Sri-Lanka",
      image: "/images/millionspaces.png"
    },
    {
      title: "Stores Management System",
      description: "Collaborated on the development of a comprehensive system for Survey department of Sri Lanka to manage procurement, tenders, employees, and equipment across the country. The system streamlined operations by centralizing data, improving transparency, and ensuring efficient resource management for the department.",
      tags: ["Laravel", "Filament", "MySQL", "Bootstrap"],
      link: "#",
      image: "/images/stores.jpg"
    },
    {
      title: "Blockchain based e-voting system",
      description: "My final year research focuses on ensuring secure voting and data integrity using homomorphic encryption for encrypted vote tabulation and blockchain for verifying vote integrity.",
      tags: ["Next.js", "Ethereum", "Blockchain", "Solidity", "Homomorphic Encryption"],
      link: "#",
      image: "/images/voting.gif"
    },
    {
      title: "Lecture notes based Chat bot",
      description: "This chatbot is designed to answer questions based on lecture notes, making it a useful study companion. Used RAG with LangChain to connect an LLM with a document retrieval system. The bot pulls relevant info from course materials to give accurate answers - pretty handy for studying.",
      tags: ["RAG", "LangChain", "LLM", "OpenAI"],
      link: "#",
      image: "/images/chatbot.jpg"
    },
    {
      title: "Tour management system",
      description: "Contributed to the development of a centralized admin panel for managing hotel, activity, and tour bookings, resulting in streamlined operations. Integrated the custom admin panel with the existing WordPress Advanced Database Structure, ensuring seamless data synchronization and comprehensive management capabilities for booking records.",
      tags: ["WordPress", "Laravel", "JavaScript", "MySQL", "Digital Ocean"],
      link: "#",
      image: "/images/tour.jpg"
    },
    {
      title: "Weather Forecast Web Application",
      description: "A web application with provides current weather in a city and 7-day daily forecasting. It fetches real-time data from a weather API and displays it in a user-friendly interface, allowing users to plan their activities based on accurate weather information.",
      tags: ["React", "Open Weather API"],
      link: "https://github.com/malithJayasinghe2000/Weather-Forecast-web-Application",
      image: "/images/weather.png"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-400">
      {/* Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      ></div>
      
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Header */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                Malith Jayasinghe
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Software Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                Transforming ideas into seamless digital experience.
              </p>
              
              {/* Navigation */}
              <nav className="nav hidden lg:block mt-16">
                <ul className="space-y-4">
                  <li>
                    <a href="#about" className="group flex items-center py-3">
                      <span className={`mr-4 h-px transition-all ${
                        activeSection === 'about' 
                          ? 'w-16 bg-slate-200' 
                          : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                      }`}></span>
                      <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'about'
                          ? 'text-slate-200'
                          : 'text-slate-500 group-hover:text-slate-200'
                      }`}>
                        About
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#experience" className="group flex items-center py-3">
                      <span className={`mr-4 h-px transition-all ${
                        activeSection === 'experience' 
                          ? 'w-16 bg-slate-200' 
                          : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                      }`}></span>
                      <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'experience'
                          ? 'text-slate-200'
                          : 'text-slate-500 group-hover:text-slate-200'
                      }`}>
                        Experience
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="group flex items-center py-3">
                      <span className={`mr-4 h-px transition-all ${
                        activeSection === 'projects' 
                          ? 'w-16 bg-slate-200' 
                          : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                      }`}></span>
                      <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        activeSection === 'projects'
                          ? 'text-slate-200'
                          : 'text-slate-500 group-hover:text-slate-200'
                      }`}>
                        Projects
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul className="ml-1 mt-8 flex items-center space-x-5">
              <li>
                <a href="https://github.com/malithJayasinghe2000" className="block hover:text-slate-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/malithjayasinghe/" className="block hover:text-slate-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </header>

          {/* Right Column - Content */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
              </div>
              <div>
                <p className="mb-4">
                  As a recent graduate from SLIIT and a passionate Software Engineer,
                </p>
                <p className="mb-4">
                  My technical expertise is diverse, allowing me to adapt to different project needs. On the front-end, 
                  I specialize in creating dynamic and responsive user interfaces using React.js and Next.js. 
                  For the back-end, I have hands-on experience building robust APIs and server-side logic with Spring Boot, Node.js, and Laravel. I also have familiarity with cloud deployment and services using AWS.
                </p>
                <p className="mb-4">
                  Beyond my core web development skills, 
                  I am deeply enthusiastic about the fields of Artificial Intelligence and Machine Learning. 
                  I am actively expanding my knowledge in Deep Learning models and data-driven solutions, 
                  and I am eager to apply these skills to build more intelligent and predictive applications.
                </p>
                <p>
                  I am a dedicated problem-solver and a quick learner, 
                  always looking for opportunities to tackle complex challenges and contribute to innovative projects. 
                  I'm currently seeking a role where I can leverage my full-stack capabilities while growing my passion for AI/ML.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience</h2>
              </div>
              <div>
                <ol className="group/list">
                  {experiences.map((exp, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-4">
                          {exp.period}
                        </header>
                        <div className="z-10 sm:col-span-8">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <a href="#" className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base">
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>{exp.title} · {exp.company}</span>
                              <svg 
                                className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">{exp.description}</p>
                          <ul className="mt-2 flex flex-wrap">
                            {exp.tags.map((tag, tagIndex) => (
                              <li key={tagIndex} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tag}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* View Full Resume Button */}
              <div className="mt-12">
                <a 
                  href="/malith-jayasinghe-cv.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base"
                >
                  <span className="border-b border-transparent pb-px transition group-hover:border-teal-300">
                    View Full Résumé
                  </span>
                  <svg 
                    className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Projects</h2>
              </div>
              <div>
                <ol className="group/list">
                  {projects.map((project, index) => (
                    <li key={index} className="mb-12">
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        
                        {/* Project Image */}
                        <div className="z-10 sm:col-span-2">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30"
                          />
                        </div>

                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <a href={project.link} className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base">
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>{project.title}</span>
                              <svg 
                                className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal">{project.description}</p>
                          {/* {project.stats && (
                            <p className="mt-2 text-sm font-medium text-slate-400">{project.stats}</p>
                          )} */}
                          <ul className="mt-2 flex flex-wrap">
                            {project.tags.map((tag, tagIndex) => (
                              <li key={tagIndex} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tag}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              {/* <p>
                Coded in <a href="#" className="font-medium text-slate-400 hover:text-teal-300">Visual Studio Code</a>. Built with <a href="#" className="font-medium text-slate-400 hover:text-teal-300">Next.js</a> and <a href="#" className="font-medium text-slate-400 hover:text-teal-300">Tailwind CSS</a>, deployed with <a href="#" className="font-medium text-slate-400 hover:text-teal-300">Vercel</a>.
              </p> */}
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
