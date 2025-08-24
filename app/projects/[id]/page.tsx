'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

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
  date: string;
  challenges: string[];
  solutions: string[];
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern features',
    longDescription: 'A comprehensive e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, payment integration with Stripe, and admin dashboard with real-time analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Prisma'],
    githubUrl: 'https://github.com/wile44/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    category: 'Full-Stack',
    featured: true,
    date: '2024-03-15',
    challenges: [
      'Implementing secure payment processing',
      'Managing complex state across multiple components',
      'Optimizing for performance with large product catalogs',
      'Real-time inventory management'
    ],
    solutions: [
      'Integrated Stripe with webhook handling for secure payments',
      'Used React Query for efficient state management',
      'Implemented pagination and lazy loading',
      'Built real-time updates with WebSocket connections'
    ],
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Payment processing with Stripe',
      'Admin dashboard with analytics',
      'Order management system',
      'Customer reviews and ratings',
      'Email notifications'
    ]
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates',
    longDescription: 'A real-time collaborative task management application featuring drag-and-drop functionality, team collaboration, file attachments, notifications, and advanced filtering capabilities.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/wile44/task-manager',
    liveUrl: 'https://task-manager-demo.vercel.app',
    category: 'Full-Stack',
    featured: true,
    date: '2024-02-20',
    challenges: [
      'Real-time synchronization across multiple users',
      'Handling file uploads efficiently',
      'Managing complex drag-and-drop interactions',
      'Ensuring data consistency'
    ],
    solutions: [
      'Implemented Socket.io for real-time communication',
      'Used AWS S3 for file storage with signed URLs',
      'Built custom drag-and-drop hooks with React DnD',
      'Implemented optimistic updates with rollback'
    ],
    features: [
      'Real-time collaboration',
      'Drag-and-drop task management',
      'File attachments and sharing',
      'Team member management',
      'Activity tracking',
      'Advanced filtering and search',
      'Mobile-responsive design',
      'Notification system'
    ]
  }
];

export default function ProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectId = parseInt(params.id as string);
    const foundProject = projects.find(p => p.id === projectId);
    setProject(foundProject || null);
  }, [params.id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-accent/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {project.description}
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              {project.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  <Star className="h-4 w-4 mr-1" />
                  Featured
                </span>
              )}
              <span className="text-foreground/70 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <div className="mb-16">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Project Overview</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {project.longDescription}
              </p>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-foreground/70">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges and Solutions */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Challenges & Solutions</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Challenges</h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="text-foreground/70 flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Solutions</h3>
                  <ul className="space-y-2">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="text-foreground/70 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-accent/30 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Project Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Category</h4>
                  <p className="text-foreground/70">{project.category}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}