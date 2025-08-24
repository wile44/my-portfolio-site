import { useState, useEffect } from 'react';
import { About, Project, Skill, Experience } from '@/lib/directus';

// Generic hook for fetching data with error handling and loading states
export function useDirectusData<T>(fetcher: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetcher();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('Directus fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

// Specific hooks for different data types
export function useAboutData() {
  return useDirectusData(async () => {
    const { getAboutInfo } = await import('@/lib/directus');
    return getAboutInfo();
  });
}

export function useProjects(featured = false) {
  return useDirectusData(async () => {
    const { getProjects } = await import('@/lib/directus');
    return getProjects(featured);
  }, [featured]);
}

export function useSkills() {
  return useDirectusData(async () => {
    const { getSkills } = await import('@/lib/directus');
    return getSkills();
  });
}

export function useExperience() {
  return useDirectusData(async () => {
    const { getExperience } = await import('@/lib/directus');
    return getExperience();
  });
}
