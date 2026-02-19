import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import db from "../firebase";
import { createCacheKey, getOrFetchCached } from "../utils/cacheStore";

const useCategoryCounts = (categories = []) => {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      if (!categories.length) {
        setCategoryCounts({});
        return;
      }

      try {
        const entries = await Promise.all(
          categories.map(async (category) => {
            const count = await getOrFetchCached({
              key: createCacheKey("count", `projects:category:${category.id}`),
              fetcher: async () => {
                const countQuery = query(
                  collection(db, "projects"),
                  where("categoryId", "==", category.id)
                );
                const snapshot = await getCountFromServer(countQuery);
                return snapshot.data().count;
              },
            });
            return [category.id, count];
          })
        );

        if (isMounted) {
          setCategoryCounts(Object.fromEntries(entries));
        }
      } catch (error) {
        if (isMounted) {
          setCategoryCounts({});
        }
      }
    };

    fetchCounts();

    return () => {
      isMounted = false;
    };
  }, [categories]);

  return categoryCounts;
};

export default useCategoryCounts;
