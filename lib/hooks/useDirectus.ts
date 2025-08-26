import { useState, useEffect, useCallback } from 'react';
import type { About, Project, Skill, Experience } from '@/lib/directus';

// Generic hook for fetching data with error handling and loading states
export function useDirectusData<T>(fetcher: () => Promise<T>, dependencies: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger(prev => prev + 1);
  }, []);

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
  // We need to disable this rule because we're using dynamic dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, ...dependencies]);

  return { data, loading, error, refetch };
}

// Create a wrapper that avoids the spread operator warning
function createDirectusHook<T>(fetcherCreator: () => () => Promise<T>, deps: unknown[] = []) {
  return () => {
    const fetcher = useCallback(fetcherCreator(), deps);
    return useDirectusData(fetcher, deps);
  };
}

// Specific hooks for different data types
export const useAboutData = (): { data: About | null; loading: boolean; error: string | null; refetch: () => void } => {
  const fetcher = useCallback(async () => {
    const { getAboutInfo } = await import('@/lib/directus');
    return getAboutInfo();
  }, []);

  return useDirectusData<About | null>(fetcher, []);
};

export const useProjects = (featured = false): { data: Project[] | null; loading: boolean; error: string | null; refetch: () => void } => {
  const fetcher = useCallback(async () => {
    const { getProjects } = await import('@/lib/directus');
    return getProjects(featured);
  }, [featured]);

  return useDirectusData<Project[]>(fetcher, [featured]);
};

export const useSkills = (): { data: Skill[] | null; loading: boolean; error: string | null; refetch: () => void } => {
  const fetcher = useCallback(async () => {
    const { getSkills } = await import('@/lib/directus');
    return getSkills();
  }, []);

  return useDirectusData<Skill[]>(fetcher, []);
};

export const useExperience = (): { data: Experience[] | null; loading: boolean; error: string | null; refetch: () => void } => {
  const fetcher = useCallback(async () => {
    const { getExperience } = await import('@/lib/directus');
    return getExperience();
  }, []);

  return useDirectusData<Experience[]>(fetcher, []);
};
