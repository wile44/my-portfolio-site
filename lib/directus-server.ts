/**
 * Server-side only Directus client
 * This file should NEVER be imported in client components
 */
import 'server-only';
import { createDirectus, rest, readItems, createItem, staticToken } from '@directus/sdk';
import { logger } from './logger';
import type { About, Project, Skill, Experience, Article, ContactMessage } from './directus';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
}

if (!process.env.DIRECTUS_TOKEN) {
  throw new Error('DIRECTUS_TOKEN is not defined');
}

// Create the server-side Directus client with authentication
const directusServer = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_TOKEN));

// Server-side data fetching functions
export async function getAboutInfo(): Promise<About | null> {
  try {
    const about = await directusServer.request(readItems('about', {
      limit: 1,
    })) as About[];
    return about[0] || null;
  } catch (error) {
    logger.directus.fetchError('about', error);
    return null;
  }
}

export async function getProjects(featured = false): Promise<Project[]> {
  try {
    const filter = featured ? { featured: { _eq: true } } : { status: { _eq: 'published' } };
    const projects = await directusServer.request(readItems('projects', {
      filter,
      sort: ['sort'],
    })) as Project[];
    return projects;
  } catch (error) {
    logger.directus.fetchError('projects', error);
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const skills = await directusServer.request(readItems('skills', {
      sort: ['category', 'sort'],
    })) as Skill[];
    return skills;
  } catch (error) {
    logger.directus.fetchError('skills', error);
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const experience = await directusServer.request(readItems('experience', {
      sort: ['-start_date'],
    })) as Experience[];
    return experience;
  } catch (error) {
    logger.directus.fetchError('experience', error);
    return [];
  }
}

export async function getArticles(type?: 'video' | 'article'): Promise<Article[]> {
  try {
    const filter = type ? { type: { _eq: type }, status: { _eq: 'published' } } : { status: { _eq: 'published' } };
    const articles = await directusServer.request(readItems('articles', {
      filter,
      sort: ['-published_at'],
    })) as Article[];
    logger.directus.fetchSuccess('articles', articles.length);
    return articles;
  } catch (error) {
    logger.directus.fetchError('articles', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    logger.directus.fetchStart('articles', { slug });
    const articles = await directusServer.request(readItems('articles', {
      filter: { 
        _or: [
          { slug: { _eq: slug } },
          { id: { _eq: slug } }
        ],
        status: { _eq: 'published' } 
      },
      limit: 1,
    })) as Article[];
    logger.directus.fetchSuccess('articles', articles.length);
    return articles[0] || null;
  } catch (error) {
    logger.directus.fetchError('articles', error);
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projects = await directusServer.request(readItems('projects', {
      filter: { id: { _eq: id }, status: { _eq: 'published' } },
      limit: 1,
    })) as Project[];
    return projects[0] || null;
  } catch (error) {
    logger.directus.fetchError('projects', error);
    return null;
  }
}

export async function submitContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'date_created'>): Promise<boolean> {
  try {
    await directusServer.request(createItem('contact_messages', {
      ...data,
      status: 'new',
    }));
    return true;
  } catch (error) {
    logger.error('Failed to submit contact message', error);
    return false;
  }
}

export default directusServer;
