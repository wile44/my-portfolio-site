'use client';

import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:bg-blue-600" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000 dark:bg-purple-600" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000 dark:bg-pink-600" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Animated greeting */}
          <div className="fade-in-up mb-6">
            <p className="text-lg text-foreground/60 mb-2">Hello, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Goodluck Wile
            </h1>
          </div>

          {/* Animated role */}
          <div className="fade-in-up delay-100 mb-8">
            <p className="text-2xl md:text-3xl text-foreground/80 font-light">
              Full-Stack Software Engineer
            </p>
            <p className="text-lg text-foreground/60 mt-2">
              Crafting digital experiences with modern technologies
            </p>
          </div>

          {/* Animated description */}
          <div className="fade-in-up delay-200 mb-10 max-w-2xl mx-auto">
            <p className="text-lg text-foreground/70 leading-relaxed">
              I build scalable web applications, design elegant user interfaces, 
              and solve complex problems with clean, efficient code. 
              Passionate about creating impactful digital solutions.
            </p>
          </div>

          {/* Animated CTA buttons */}
          <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('#contact')}
              className="group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white gradient-bg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
            >
              Get In Touch
              <Mail className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection('#projects')}
              className="group inline-flex items-center justify-center px-8 py-3 border border-foreground/20 text-base font-medium rounded-full text-foreground hover:bg-accent/50 transition-all duration-200 transform hover:scale-105"
            >
              View My Work
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Animated social links */}
          <div className="fade-in-up delay-400 flex justify-center space-x-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-200 transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-foreground group-hover:text-blue-600 transition-colors" />
            </a>
            
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-200 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-foreground group-hover:text-blue-600 transition-colors" />
            </a>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-4 py-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-200 transform hover:scale-110"
              aria-label="Download Resume"
            >
              <Download className="h-5 w-5 mr-2 text-foreground group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium text-foreground group-hover:text-blue-600 transition-colors">Resume</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('#about')}
            className="flex flex-col items-center text-foreground/60 hover:text-foreground transition-colors duration-200"
            aria-label="Scroll to about section"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}