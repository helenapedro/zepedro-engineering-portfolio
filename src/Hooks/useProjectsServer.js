import { useEffect, useMemo, useState } from "react";
import {
  collection,
  documentId,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import db from "../firebase";
import handleScrollToTop from "../utils/HandleScroll";
import { adaptProjectDocument } from "../utils/adaptProjectDocument";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
  getCachedValue,
  getOrFetchCached,
  setCachedValue,
} from "../utils/cacheStore";

const COLLECTION_NAME = "projects";
const MAX_IN_FILTER_VALUES = 10;

const normalizeCategoryIds = (ids = []) => [...ids].sort();

const makeBaseQueryConstraints = (selectedCategories) => {
  if (!selectedCategories.length) return [];
  return [where("categoryId", "in", selectedCategories)];
};

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const useProjectsServer = (options = {}) => {
  const {
    pageSize = 8,
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
  } = options || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizedCategoryIds = useMemo(
    () => normalizeCategoryIds(selectedCategories),
    [selectedCategories]
  );

  const categoryKeyPart = normalizedCategoryIds.length
    ? normalizedCategoryIds.join(",")
    : "all";

  useEffect(() => {
    let isMounted = true;

    const fetchPage = async ({ baseConstraints, filterKey, page, startAfterId }) => {
      const cursorKeyPart = startAfterId || "start";
      const key = createCacheKey(
        "query",
        `${COLLECTION_NAME}:${filterKey}:page=${page}:size=${pageSize}:cursor=${cursorKeyPart}`
      );

      return getOrFetchCached({
        key,
        ttlMs,
        persist,
        fetcher: async () => {
          const constraints = [
            ...baseConstraints,
            orderBy(documentId()),
            ...(startAfterId ? [startAfter(startAfterId)] : []),
            limit(pageSize),
          ];

          const snapshot = await getDocs(
            query(collection(db, COLLECTION_NAME), ...constraints)
          );
          const docs = snapshot.docs.map((doc) =>
            adaptProjectDocument({ id: doc.id, ...doc.data() })
          );
          const endCursor = snapshot.docs.length
            ? snapshot.docs[snapshot.docs.length - 1].id
            : null;

          return { docs, endCursor };
        },
      });
    };

    const loadPageWithCursor = async ({ baseConstraints, filterKey, page }) => {
      if (page <= 1) {
        return fetchPage({
          baseConstraints,
          filterKey,
          page: 1,
          startAfterId: null,
        });
      }

      const prevCursorKey = createCacheKey(
        "cursor",
        `${COLLECTION_NAME}:${filterKey}:page=${page - 1}:size=${pageSize}`
      );
      const prevCursorMeta = getCachedValue(prevCursorKey, { persist });

      if (prevCursorMeta && hasOwn(prevCursorMeta, "endCursor")) {
        if (!prevCursorMeta.endCursor) return { docs: [], endCursor: null };
        return fetchPage({
          baseConstraints,
          filterKey,
          page,
          startAfterId: prevCursorMeta.endCursor,
        });
      }

      const previousPage = await loadPageWithCursor({
        baseConstraints,
        filterKey,
        page: page - 1,
      });

      setCachedValue(prevCursorKey, { endCursor: previousPage.endCursor }, { ttlMs, persist });

      if (!previousPage.endCursor) return { docs: [], endCursor: null };

      return fetchPage({
        baseConstraints,
        filterKey,
        page,
        startAfterId: previousPage.endCursor,
      });
    };

    const fetchProjects = async () => {
      if (normalizedCategoryIds.length > MAX_IN_FILTER_VALUES) {
        setError(new Error("Firestore IN filter supports up to 10 categories."));
        setProjects([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const baseConstraints = makeBaseQueryConstraints(normalizedCategoryIds);
        const baseQuery = query(collection(db, COLLECTION_NAME), ...baseConstraints);
        const countValue = await getOrFetchCached({
          key: createCacheKey("count", `${COLLECTION_NAME}:${categoryKeyPart}`),
          ttlMs,
          persist,
          fetcher: async () => {
            const countSnapshot = await getCountFromServer(baseQuery);
            return countSnapshot.data().count;
          },
        });

        if (!isMounted) return;
        setTotalCount(countValue);

        if (countValue === 0) {
          setProjects([]);
          return;
        }

        const maxPage = Math.ceil(countValue / pageSize);
        if (currentPage > maxPage) {
          setCurrentPage(maxPage);
          return;
        }

        const pageData = await loadPageWithCursor({
          baseConstraints,
          filterKey: categoryKeyPart,
          page: currentPage,
        });

        if (!isMounted) return;

        setProjects(pageData.docs);
        const currentCursorKey = createCacheKey(
          "cursor",
          `${COLLECTION_NAME}:${categoryKeyPart}:page=${currentPage}:size=${pageSize}`
        );
        setCachedValue(currentCursorKey, { endCursor: pageData.endCursor }, { ttlMs, persist });
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [normalizedCategoryIds, categoryKeyPart, currentPage, pageSize, ttlMs, persist]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleScrollToTop();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  return {
    projects,
    totalCount,
    loading,
    error,
    currentPage,
    pageSize,
    selectedCategories,
    handlePageChange,
    handleCategoryChange,
  };
};

export default useProjectsServer;
