'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Play, ExternalLink } from 'lucide-react';
import { getArticles } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import type { Article } from '@/lib/directus';
import NewsDrawer from './NewsDrawer';
import Image from 'next/image';


export default function News() {
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'article'>('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await getArticles();
      console.log('Fetched articles:', data);
      // Log first few articles to see their structure
      if (data.length > 0) {
        console.log('First article:', {
          id: data[0].id,
          slug: data[0].slug,
          title: data[0].title
        });
      }
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = selectedType === 'all' 
    ? articles 
    : articles.filter(article => article.type === selectedType);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openNewsDrawer = (articleSlug: string) => {
    console.log('Opening drawer for article slug/id:', articleSlug);
    setSelectedArticleSlug(articleSlug);
    setDrawerOpen(true);
  };

  const closeNewsDrawer = () => {
    setDrawerOpen(false);
    setSelectedArticleSlug(null);
  };

  if (loading) {
    return (
      <section id="news" className="py-20 sm:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest News & Updates
            </h2>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              Stay updated with my latest thoughts, tutorials, and insights on technology and development.
            </p>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-20 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Latest News & Updates
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/70">
            Stay updated with my latest thoughts, tutorials, and insights on technology and development.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-accent/50 p-1">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedType === 'all'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedType === 'video'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedType('article')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedType === 'article'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Articles
            </button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredArticles.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openNewsDrawer(post.slug || post.id)}
            >
              {post.type === 'video' && post.image && (
                <div className="relative w-full">
                  <Image
                    src={getOptimizedImageUrl(post.image, 800, 450)}
                    alt={post.title}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/90 rounded-full p-4">
                      <Play className="h-8 w-8 text-primary-foreground" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="max-w-xl mt-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.published_at} className="text-foreground/70 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.published_at)}
                  </time>
                  {post.read_time && (
                    <span className="text-foreground/70 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.read_time}
                    </span>
                  )}
                </div>
                
                <div className="group relative mt-3">
                  <h3 
                    className="text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors"
                  >
                    {post.title}
                  </h3>
                  <p 
                    className="mt-5 line-clamp-3 text-sm leading-6 text-foreground/70"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {post.external_url && (
                  <div className="mt-4">
                    <a
                      href={post.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read More
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>
      </div>
      
      <NewsDrawer 
        isOpen={drawerOpen} 
        onClose={closeNewsDrawer} 
        articleSlug={selectedArticleSlug} 
      />
    </section>
  );
}