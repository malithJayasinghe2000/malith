"use client";

import React, { useState, useEffect } from 'react';

import { experiences, featuredProjects, otherProjects, type Project } from "@/lib/profile";
import AskAI, { OPEN_ASK_AI_EVENT } from "@/components/AskAI";

const SECTIONS = ['about', 'experience', 'projects', 'contact'] as const;

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
      {tags.map((tag) => (
        <li key={tag} className="rounded bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function SectionLabel({ id, label }: { id: string; label: string }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-ink/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:w-full lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
      <h2 id={`${id}-heading`} className="text-sm font-bold uppercase tracking-widest text-fg lg:sr-only">{label}</h2>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="mb-12">
      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100!">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:-inset-x-6 lg:block lg:group-hover:bg-surface"></div>
        <div className="z-10 sm:order-1 sm:col-span-2">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="aspect-video w-full rounded border border-line object-cover transition group-hover:border-accent/40 sm:aspect-auto"
          />
        </div>
        <div className="z-10 sm:order-2 sm:col-span-6">
          <h3 className="font-medium leading-snug text-fg">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-baseline gap-1 text-base hover:text-accent focus-visible:text-accent">
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                <span>{project.title}</span>
                <ArrowIcon className="translate-y-0.5" />
              </a>
            ) : (
              <span className="text-base">{project.title}</span>
            )}
          </h3>
          {project.badge && (
            <span className={`mt-2 inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
              project.badge === "Live" ? "border-accent/40 text-accent" : "border-line text-muted"
            }`}>
              {project.badge === "Live" && <span className="h-1.5 w-1.5 bg-accent"></span>}
              {project.badge}
            </span>
          )}
          <p className="mt-2 text-sm leading-relaxed">{project.description}</p>
          <Tags tags={project.tags} />
        </div>
      </div>
    </li>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) {
        setActiveSection('contact');
        return;
      }
      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ink text-muted">
      {/* Subtle cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 hidden transition duration-300 motion-reduce:hidden lg:block"
        style={{ background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 126, 34, 0.05), transparent 80%)` }}
      ></div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left column */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                Malith Jayasinghe
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-fg sm:text-xl">
                Software Engineer · <span className="text-accent">Backend & AI</span>
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                I build reliable backends and AI-powered systems that solve real problems.
              </p>
              {/* <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-line px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 bg-accent"></span>
                Currently: AI Automation Engineer @ Aahaas
              </p> */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_ASK_AI_EVENT))}
                className="cursor-pointer group/link mt-8 flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-muted transition hover:border-accent/50 hover:text-fg"
              >
                <span className="relative flex h-2 w-2">
                  <span className="status-blink relative inline-flex h-2 w-2 bg-accent"></span>
                </span>
                Don&apos;t want to read? <span className="font-semibold text-fg group-hover/link:text-accent">Ask my AI about me</span>
                <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-0.5">→</span>
              </button>

              <nav className="hidden lg:block mt-16" aria-label="In-page navigation">
                <ul className="w-max space-y-1">
                  {SECTIONS.map((section) => {
                    const active = activeSection === section;
                    return (
                      <li key={section}>
                        <a href={`#${section}`} className="group flex items-center py-3">
                          <span className={`mr-4 h-px transition-all ${active ? 'w-16 bg-accent' : 'w-8 bg-subtle group-hover:w-16 group-hover:bg-fg'}`}></span>
                          <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${active ? 'text-fg' : 'text-subtle group-hover:text-fg'}`}>
                            {section}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
              <li>
                <a href="https://github.com/malithJayasinghe2000" target="_blank" rel="noopener noreferrer" className="block hover:text-accent" aria-label="GitHub">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/malithjayasinghe/" target="_blank" rel="noopener noreferrer" className="block hover:text-accent" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="mailto:malith2jayasinghe@gmail.com" className="block hover:text-accent" aria-label="Email">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </li>
            </ul>
          </header>

          {/* Right column */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            <section id="about" aria-labelledby="about-heading" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionLabel id="about" label="About" />
              <div className="space-y-4 leading-relaxed">
                <p>
                  I’m a Software Engineer and SLIIT graduate with two years of experience across industry roles and freelance projects.
                  I work mostly on the backend: APIs, integrations and cloud services with <span className="text-fg">Spring Boot, Node.js, Python and AWS</span>, plus React and Next.js when a product needs a front end.
                </p>
                <p>
                  I’m currently a Junior AI Automation Engineer at <span className="text-fg">Aahaas</span>, where I build and maintain production AI automation systems.
                  Outside work I build my own AI products, from multi-agent systems with <span className="text-fg">LangGraph and MCP</span> to RAG-based assistants that cite their sources.
                </p>
                <p>
                  I use AI-assisted tools like Claude Code and Cursor every day to work faster and keep code quality high.
                  I care about building software that is reliable, secure and scales.
                </p>
              </div>
            </section>

            <section id="experience" aria-labelledby="experience-heading" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionLabel id="experience" label="Experience" />
              <ol className="group/list">
                {experiences.map((exp) => (
                  <li key={exp.company} className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100!">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:-inset-x-6 lg:block lg:group-hover:bg-surface"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-subtle sm:col-span-2">
                        {exp.period}
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="text-base font-medium leading-snug text-fg">
                          {exp.title} · <span className="group-hover:text-accent transition-colors">{exp.company}</span>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed">{exp.description}</p>
                        <Tags tags={exp.tags} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href="/malith-jayasinghe-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1 font-semibold text-fg hover:text-accent focus-visible:text-accent"
              >
                <span className="border-b border-transparent pb-px transition group-hover/link:border-accent">View Full Resume</span>
                <ArrowIcon />
              </a>
            </section>

            <section id="projects" aria-labelledby="projects-heading" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <SectionLabel id="projects" label="Projects" />
              <h3 className="mb-8 text-xs font-bold uppercase tracking-widest text-accent">Featured</h3>
              <ul className="group/list">
                {featuredProjects.map((p) => <ProjectCard key={p.title} project={p} />)}
              </ul>
              <h3 className="mb-8 mt-16 text-xs font-bold uppercase tracking-widest text-subtle">Other work</h3>
              <ul className="group/list">
                {otherProjects.map((p) => <ProjectCard key={p.title} project={p} />)}
              </ul>
            </section>

            <section id="contact" aria-labelledby="contact-heading" className="mb-16 scroll-mt-16 lg:scroll-mt-24">
              <SectionLabel id="contact" label="Contact" />
              <div className="rounded-lg border border-line p-8">
                <p className="text-2xl font-semibold tracking-tight text-fg">Let’s build something.</p>
                <p className="mt-3 leading-relaxed">
                  Have a role, project or idea involving backend systems or AI? I’d be glad to hear about it.
                </p>
                <a
                  href="mailto:malith2jayasinghe@gmail.com"
                  className="group/link mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent/90"
                >
                  malith2jayasinghe@gmail.com
                  <ArrowIcon />
                </a>
              </div>
            </section>

            <footer className="pb-16 text-sm text-subtle sm:pb-0">
              © {new Date().getFullYear()} Malith Jayasinghe. Built with Next.js and Tailwind CSS.
            </footer>
          </main>
        </div>
      </div>
      <AskAI />
    </div>
  );
}
