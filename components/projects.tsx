'use client';

import { useState } from 'react';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern features',
    longDescription: 'A comprehensive e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, payment integration with Stripe, and admin dashboard with real-time analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma'],
    githubUrl: 'https://github.com/goodluckwile/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    category: 'Full-Stack',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates',
    longDescription: 'A real-time collaborative task management application featuring drag-and-drop functionality, team collaboration, file attachments, notifications, and advanced filtering capabilities.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/goodluckwile/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
    category: 'Full-Stack',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with location-based forecasts',
    longDescription: 'A responsive weather dashboard that provides real-time weather data, 7-day forecasts, interactive maps, and location-based alerts with beautiful animations and intuitive design.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/goodluckwile/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.netlify.app',
    category: 'Frontend',
    featured: false,
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio showcasing my work',
    longDescription: 'A cutting-edge portfolio website built with Next.js and modern web technologies, featuring smooth animations, dark mode, responsive design, and optimized performance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/goodluckwile/portfolio',
    liveUrl: 'https://goodluckwile.dev',
    category: 'Frontend',
    featured: true,
  },
  {
    id: 5,
    title: 'AI Chatbot',
    description: 'Intelligent chatbot powered by OpenAI GPT',
    longDescription: 'An AI-powered chatbot that provides intelligent responses, context awareness, conversation history, and customizable personalities for various use cases.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    technologies: ['Python', 'FastAPI', 'OpenAI API', 'React', 'WebSocket', 'PostgreSQL'],
    githubUrl: 'https://github.com/goodluckwile/ai-chatbot',
    liveUrl: 'https://ai-chat-demo.vercel.app',
    category: 'AI/ML',
    featured: false,
  },
  {
    id: 6,
    title: 'Expense Tracker',
    description: 'Personal finance management with data visualization',
    longDescription: 'A comprehensive expense tracking application with budget management, spending analytics, receipt scanning, and detailed financial insights with charts and reports.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    technologies: ['React', 'Node.js', 'Chart.js', 'MongoDB', 'Express', 'Cloudinary'],
    githubUrl: 'https://github.com/goodluckwile/expense-tracker',
    category: 'Full-Stack',
    featured: false,
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Full-Stack', 'Frontend', 'AI/ML'];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);


  return (
    <section id="projects" className="py-20 sm:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating my skills in full-stack development, 
            modern technologies, and creative problem-solving.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-accent/50 p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up delay-${index * 100}`}
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-accent/50 text-foreground/70 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-accent/50 text-foreground/70 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                    
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    )}
                  </div>
                  
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    onClick={() => {
                      // Could open modal with full details
                      console.log('View details for:', project.title);
                    }}
                  >
                    Details
                    <ArrowRight className="inline-block h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all projects CTA */}
        <div className="text-center">
          <a
            href="https://github.com/goodluckwile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white gradient-bg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
          >
            View All Projects on GitHub
            <Github className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}