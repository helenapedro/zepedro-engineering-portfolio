import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
  getCachedValue,
  setCachedValue,
} from "../utils/cacheStore";

const useData = (collectionName, id = null, options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
  } = options || {};
  const [data, setData] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const key = id
        ? createCacheKey("doc", `${collectionName}/${id}`)
        : createCacheKey("collection", collectionName);

      const cached = getCachedValue(key, { persist });
      if (cached !== null) {
        setData(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let nextData = null;

        if (id) {
          // Fetch single document
          const docRef = doc(db, collectionName, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            nextData = { id: docSnap.id, ...docSnap.data() };
          } else {
            throw new Error("Document not found");
          }
        } else {
          // Fetch all documents
          const snapshot = await getDocs(collection(db, collectionName));
          nextData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        if (!isMounted) return;

        setData(nextData);
        setCachedValue(key, nextData, { ttlMs, persist });
      } catch (err) {
        if (!isMounted) return;
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionName, id, ttlMs, persist]);

  return { data, loading, error };
};

export default useData;
