import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
} from "../utils/cacheStore";
import useCachedAsyncData from "./useCachedAsyncData";

const useData = (collectionName, id = null, options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
    revalidate = true,
  } = options || {};

  const cacheKey = id
    ? createCacheKey("doc", `${collectionName}/${id}`)
    : createCacheKey("collection", collectionName);

  const fetcher = async () => {
    if (id) {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Document not found");
      }
      return { id: docSnap.id, ...docSnap.data() };
    }

    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  };

  return useCachedAsyncData({
    cacheKey,
    fetcher,
    initialData: id ? null : [],
    ttlMs,
    persist,
    revalidate,
    dependencies: [collectionName, id],
  });
};

export default useData;
