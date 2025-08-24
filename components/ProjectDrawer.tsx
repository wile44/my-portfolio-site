'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, GitFork as GitHubIcon, Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import { getProjectById, getOptimizedImageUrl } from '@/lib/directus';
import type { Project } from '@/lib/directus';

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

export default function ProjectDrawer({ isOpen, onClose, projectId }: ProjectDrawerProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      setLoading(true);
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId && isOpen) {
      fetchProject();
    }
  }, [projectId, isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full w-full md:w-3/4 lg:w-3/4 xl:max-w-4xl bg-background border-r border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : project ? (
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg hover:shadow-xl"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image ? getOptimizedImageUrl(project.image, 800, 400) : '/placeholder.jpg'}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{project.title}</h1>
                  <p className="text-foreground/70">{project.short_description}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    {project.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                    <span className="text-sm text-foreground/70 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(project.date_created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent/50 text-foreground/70 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">About</h3>
                  <div 
                    className="text-foreground/70 leading-relaxed [&>*]:mb-3 [&>*:last-child]:mb-0 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-accent/50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-accent/20 [&_pre]:p-4 [&_pre]:rounded [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:my-4"
                    dangerouslySetInnerHTML={{ __html: project.long_description || project.description }}
                  />
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                      <GitHubIcon className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-foreground/70">Project not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}