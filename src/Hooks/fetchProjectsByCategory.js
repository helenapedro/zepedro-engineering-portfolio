import { getDocs, collection } from 'firebase/firestore';
import db from '../firebase';
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
  getOrFetchCached,
} from '../utils/cacheStore';

const fetchProjectsByCategory = async (options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
  } = options || {};

  return getOrFetchCached({
    key: createCacheKey('collection', 'categories-with-projects'),
    ttlMs,
    persist,
    fetcher: async () => {
      const categoriesSnapshot = await getDocs(collection(db, 'category'));
      const categories = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      const projects = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return categories.map((category) => ({
        ...category,
        projects: projects.filter((project) => project.categoryId === category.id),
      }));
    },
  });
};

export default fetchProjectsByCategory;
