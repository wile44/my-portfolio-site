import Link from 'next/link';
import { Article } from '@/lib/directus';
import BlogCard from './blog/BlogCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedBlogsProps {
  articles: Article[];
}

export default function FeaturedBlogs({ articles }: FeaturedBlogsProps) {
  if (articles.length === 0) return null;

  return (
    <section id="blog" className="py-20 px-4 bg-accent/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="gradient-text">Articles & Media</span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Insights, tutorials, and content from the tech world
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="md:hidden text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
