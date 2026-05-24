import { useState, useEffect } from 'react';
import {
     createCacheKey,
     DEFAULT_CACHE_TTL_MS,
     getCachedValue,
     setCachedValue,
} from '../utils/cacheStore';

const useProjectDevData = (options = {}) => {
     const {
          ttlMs = DEFAULT_CACHE_TTL_MS,
          persist = true,
     } = options || {};
     const [projects, setProjects] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     
     useEffect(() => {
          const key = createCacheKey('asset', 'projectsData.json');
          const cached = getCachedValue(key, { persist });
          if (cached !== null) {
               setProjects(cached);
               setLoading(false);
               return;
          }

          fetch('data/projectsData.json')
          .then((response) => {
               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }
               return response.json();
          })
          .then((data) => {
               setProjects(data);
               setCachedValue(key, data, { ttlMs, persist });
               setLoading(false);
          })
          .catch((error) => {
               console.error('Error fetching data:', error);
               setError('Failed to fetch data.');
               setLoading(false);
          });
     }, [ttlMs, persist]);

     return { projects, loading, error };
};

export default useProjectDevData;
