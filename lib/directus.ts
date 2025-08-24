import { createDirectus, rest, readItems, createItem, staticToken, uploadFiles } from '@directus/sdk';

// Define the schema for your collections
export interface About {
  id: string;
  name: string;
  title: string;
  description: string;
  bio: string;
  resume_url?: string;
  profile_image?: string;
  email: string;
  phone?: string;
  location: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  working_hours?: string;
  availability_status?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  long_description?: string;
  image?: string;
  gallery?: string[];
  technologies: string[];
  github_url?: string;
  live_url?: string;
  featured: boolean;
  sort: number;
  status: 'draft' | 'published';
  date_created: string;
  date_updated?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  description?: string;
  sort: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  published_at: string;
  read_time: string;
  tags: string[];
  type: 'video' | 'article';
  featured: boolean;
  status: 'draft' | 'published';
  video_url?: string;
  external_url?: string;
  author?: {
    name: string;
    avatar: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  date_created: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  location?: string;
  technologies?: string[];
  sort: number;
}

// Create the Directus client
const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL!)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_TOKEN!));

// Utility functions for fetching data
export async function getAboutInfo(): Promise<About | null> {
  try {
    const about = await directus.request(readItems('about', {
      limit: 1,
    }));
    return about[0] || null;
  } catch (error) {
    console.error('Error fetching about info:', error);
    return null;
  }
}

export async function getProjects(featured = false): Promise<Project[]> {
  try {
    const filter = featured ? { featured: { _eq: true } } : { status: { _eq: 'published' } };
    const projects = await directus.request(readItems('projects', {
      filter,
      sort: ['sort'],
    }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const skills = await directus.request(readItems('skills', {
      sort: ['category', 'sort'],
    }));
    return skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const experience = await directus.request(readItems('experience', {
      sort: ['-start_date'],
    }));
    return experience;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function getArticles(type?: 'video' | 'article'): Promise<Article[]> {
  try {
    const filter = type ? { type: { _eq: type }, status: { _eq: 'published' } } : { status: { _eq: 'published' } };
    const articles = await directus.request(readItems('articles', {
      filter,
      sort: ['-published_at'],
    }));
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await directus.request(readItems('articles', {
      filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
      limit: 1,
    }));
    return articles[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projects = await directus.request(readItems('projects', {
      filter: { id: { _eq: id }, status: { _eq: 'published' } },
      limit: 1,
    }));
    return projects[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function submitContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'date_created'>): Promise<boolean> {
  try {
    await directus.request(createItem('contact_messages', {
      ...data,
      status: 'new',
    }));
    return true;
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return false;
  }
}

// Utility function to get asset URL
export function getAssetUrl(assetId: string): string {
  if (!assetId) return '';
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}`;
}

// Utility function to get optimized image URL
export function getOptimizedImageUrl(assetId: string, width?: number, height?: number, quality = 80): string {
  if (!assetId) return '';
  
  const params = new URLSearchParams();
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('quality', quality.toString());
  params.append('format', 'webp');

  console.log(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}?${params.toString()}`);
  
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}?${params.toString()}`;
}

export default directus;
