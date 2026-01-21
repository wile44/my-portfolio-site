import { Metadata } from 'next';
import { getArticles } from '@/lib/directus-server';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog & Media',
  description: 'Articles, videos, and insights about software engineering, technology, and innovation.',
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 sm:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog & <span className="gradient-text">Media</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Articles, tutorials, videos, and insights about software engineering, 
              web development, and the latest in tech.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <BlogList initialArticles={articles} />
    </div>
  );
}
