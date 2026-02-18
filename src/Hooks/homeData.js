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
  } = options || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const key = createCacheKey("doc", `${collectionName}/${docName}`);
      const cached = getCachedValue(key, { persist });
      if (cached !== null) {
        setData(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const docRef = doc(db, collectionName, docName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const nextData = docSnap.data();
          if (!isMounted) return;
          setData(nextData);
          setCachedValue(key, nextData, { ttlMs, persist });
        } else {
          if (isMounted) setError("No such document!");
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionName, docName, ttlMs, persist]);

  return { data, loading, error };
};

export default useHomeData;
