import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
  getCachedValue,
  setCachedValue,
} from "../utils/cacheStore";

const useHomeData = (collectionName, docName, options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
    revalidate = true,
  } = options || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const key = createCacheKey("doc", `${collectionName}/${docName}`);
      const cached = getCachedValue(key, { persist });
      const hasCached = cached !== null;

      if (hasCached) {
        setData(cached);
        setLoading(false);
      }

      if (hasCached && !revalidate) return;

      if (!hasCached) setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, collectionName, docName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const nextData = docSnap.data();
          if (!isMounted) return;
          setData(nextData);
          setCachedValue(key, nextData, { ttlMs, persist });
        } else {
          if (isMounted && !hasCached) setError("No such document!");
        }
      } catch (err) {
        if (isMounted && !hasCached) {
          setError(err);
        }
      } finally {
        if (isMounted && !hasCached) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionName, docName, ttlMs, persist, revalidate]);

  return { data, loading, error };
};

export default useHomeData;
