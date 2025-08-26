'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/directus';
import { getOptimizedImageUrl } from '@/lib/directus';
import type { Article } from '@/lib/directus';

interface NewsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articleSlug: string | null;
}

export default function NewsDrawer({ isOpen, onClose, articleSlug }: NewsDrawerProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleSlug) return;
      
      console.log('Fetching article with slug/id:', articleSlug);
      setLoading(true);
      try {
        const data = await getArticleBySlug(articleSlug);
        console.log('Fetched article data:', data);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    if (articleSlug && isOpen) {
      fetchArticle();
    }
  }, [articleSlug, isOpen]);

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

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

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
          ) : article ? (
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg hover:shadow-xl"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero Image/Video */}
              <div className="relative h-64 overflow-hidden">
                {article.type === 'video' && article.video_url ? (
                  <div className="relative w-full h-full">
                    {extractVideoId(article.video_url) ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${extractVideoId(article.video_url)}`}
                        title={article.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    ) : (
                      <Image
                        src={article.image ? getOptimizedImageUrl(article.image, 800, 450) : '/placeholder.jpg'}
                        alt={article.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <Image
                    src={article.image ? getOptimizedImageUrl(article.image, 800, 450) : '/placeholder.jpg'}
                    alt={article.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{article.title}</h1>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-sm text-foreground/70 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {article.read_time && (
                      <span className="text-sm text-foreground/70 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.read_time}
                      </span>
                    )}
                    <span className="text-sm text-foreground/70 bg-primary/10 px-2 py-1 rounded-full">
                      {article.type}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/50 text-foreground/70 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Content</h3>
                  <div 
                    className="text-foreground/70 leading-relaxed [&>*]:mb-3 [&>*:last-child]:mb-0 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-accent/50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-accent/20 [&_pre]:p-4 [&_pre]:rounded [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:my-4"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>

                {/* External Links */}
                <div className="flex gap-3">
                  {article.external_url && (
                    <a
                      href={article.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Article
                    </a>
                  )}
                  {article.video_url && article.type === 'video' && (
                    <a
                      href={article.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch on YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-foreground/70">Article not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}