'use client';

import { useState, useMemo } from 'react';
import { Article } from '@/lib/directus';
import BlogCard from './BlogCard';

interface BlogListProps {
  initialArticles: Article[];
}

type FilterType = 'all' | 'article' | 'video' | 'external';

export default function BlogList({ initialArticles }: BlogListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredArticles = useMemo(() => {
    if (filter === 'all') return initialArticles;
    if (filter === 'external') {
      return initialArticles.filter((article) => article.external_url);
    }
    return initialArticles.filter((article) => article.type === filter);
  }, [initialArticles, filter]);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'external', label: 'External Links' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === value
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-foreground/60">No {filter !== 'all' ? filter + 's' : 'content'} found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
