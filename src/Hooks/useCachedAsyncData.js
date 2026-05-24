import { useEffect, useState } from "react";
import {
  DEFAULT_CACHE_TTL_MS,
  getCachedValue,
  setCachedValue,
} from "../utils/cacheStore";

const useCachedAsyncData = ({
  cacheKey,
  fetcher,
  initialData,
  ttlMs = DEFAULT_CACHE_TTL_MS,
  persist = true,
  revalidate = true,
  dependencies = [],
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const cached = getCachedValue(cacheKey, { persist });
      const hasCached = cached !== null;

      if (hasCached) {
        setData(cached);
        setLoading(false);
      }

      if (hasCached && !revalidate) return;

      if (!hasCached) setLoading(true);
      setError(null);

      try {
        const freshData = await fetcher();
        if (!isMounted) return;

        setData(freshData);
        setCachedValue(cacheKey, freshData, { ttlMs, persist });
      } catch (err) {
        if (!isMounted) return;
        if (!hasCached) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted && !hasCached) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, ttlMs, persist, revalidate, ...dependencies]);

  return { data, loading, error };
};

export default useCachedAsyncData;
