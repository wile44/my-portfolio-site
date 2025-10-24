'use client';

import { useState } from 'react';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getOptimizedImageUrl } from '@/lib/directus-utils';
import type { Project } from '@/lib/directus';
import ProjectDrawer from './ProjectDrawer';
import { PROJECT_CATEGORIES, TECH_CATEGORIES, IMAGE_SIZES, SOCIAL_LINKS } from '@/lib/constants';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects: initialProjects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const openProjectDrawer = (projectId: string) => {
    setSelectedProjectId(projectId);
    setDrawerOpen(true);
  };

  const closeProjectDrawer = () => {
    setDrawerOpen(false);
    setSelectedProjectId(null);
  };

  const filteredProjects = selectedCategory === 'All' 
    ? initialProjects 
    : initialProjects.filter(project => {
        if (selectedCategory === 'All') return true;
        
        const techs = project.technologies.map(t => t.toLowerCase());
        const categoryTechs = TECH_CATEGORIES[selectedCategory as keyof typeof TECH_CATEGORIES] || [];
        return techs.some(tech => categoryTechs.some(catTech => tech.includes(catTech)));
      });

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
            {PROJECT_CATEGORIES.map((category) => (
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
              className={`group relative bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up ${index === 0 ? '' : index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : index === 3 ? 'delay-300' : index === 4 ? 'delay-400' : index === 5 ? 'delay-500' : ''}`}
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image ? getOptimizedImageUrl(project.image, IMAGE_SIZES.PROJECT_CARD.width, IMAGE_SIZES.PROJECT_CARD.height, IMAGE_SIZES.QUALITY) : '/placeholder.jpg'}
                  alt={project.title}
                  width={IMAGE_SIZES.PROJECT_CARD.width}
                  height={IMAGE_SIZES.PROJECT_CARD.height}
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
                  <p className="text-foreground/70 text-sm leading-relaxed">{project.short_description}</p>
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
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                    
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={() => openProjectDrawer(project.id)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center bg-transparent border-none cursor-pointer"
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
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white gradient-bg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
          >
            View All Projects on GitHub
            <Github className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      <ProjectDrawer 
        isOpen={drawerOpen} 
        onClose={closeProjectDrawer} 
        projectId={selectedProjectId} 
      />
    </section>
  );
}