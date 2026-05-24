import { useCallback, useEffect, useState } from 'react';
import { getProjectsPage } from '../api/projects';
import type { Project } from '../types';

export function useProjects(pageSize = 9) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lastDoc, setLastDoc]   = useState<any>(null);
  const [hasMore, setHasMore]   = useState(true);
  const [loading, setLoading]   = useState(false);

  const loadPage = useCallback(async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    const { projects: page, lastDoc: cursor, hasMore: more } =
      await getProjectsPage({ after: reset ? null : lastDoc, pageSize });

    setProjects((prev) => (reset ? page : [...prev, ...page]));
    setLastDoc(cursor);
    setHasMore(more);
    setLoading(false);
  }, [lastDoc, hasMore, loading, pageSize]);

  /* initial mount */
  useEffect(() => { loadPage(true); }, []);

  return { projects, loading, hasMore, loadNext: () => loadPage(false), reload: () => loadPage(true) };
}
