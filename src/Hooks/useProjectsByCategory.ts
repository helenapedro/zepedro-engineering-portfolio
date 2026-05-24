import { useState, useEffect, useCallback } from 'react';
import { getProjectsPage } from '../api/projects';

interface Project {
     id: string;
     // Add other fields as needed
     [key: string]: any;
}

export function useProjectsByCategory(
     categories: string[],
     pageSize: number = 12
) {
     const [projects, setProjects] = useState<Project[]>([]);
     const [lastDoc, setLastDoc] = useState<any>(null);
     const [hasMore, setHasMore] = useState<boolean>(true);
     const [loading, setLoading] = useState<boolean>(false);

     const loadPage = useCallback(
          async (reset: boolean = false) => {
               if (loading || (!hasMore && !reset)) return;
               setLoading(true);

               const { projects: docs, lastDoc: newCursor, hasMore: more } =
                    await getProjectsPage({
                         categories,
                         after: reset ? null : lastDoc,
                         pageSize,
                    });

               const pageData = docs.map((d: any) => ({ id: d.id, ...d.data() } as Project));

               setProjects((prev) => (reset ? pageData : [...prev, ...pageData]));
               setLastDoc(newCursor);
               setHasMore(more);
               setLoading(false);
          },
          [categories.join(','), pageSize, lastDoc, hasMore, loading]
     );

     useEffect(() => {
          setProjects([]);
          setLastDoc(null);
          setHasMore(true);
          loadPage(true);
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [categories.join(',')]);

     return {
          projects,
          loading,
          hasMore,
          reload: () => loadPage(true),
          loadNext: () => loadPage(false),
     };
}
