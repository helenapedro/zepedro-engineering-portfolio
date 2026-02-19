import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
} from "../utils/cacheStore";
import useCachedAsyncData from "./useCachedAsyncData";

const useHomeData = (collectionName, docName, options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
    revalidate = true,
  } = options || {};

  const cacheKey = createCacheKey("doc", `${collectionName}/${docName}`);

  const fetcher = async () => {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    return docSnap.data();
  };

  return useCachedAsyncData({
    cacheKey,
    fetcher,
    initialData: null,
    ttlMs,
    persist,
    revalidate,
    dependencies: [collectionName, docName],
  });
};

export default useHomeData;
