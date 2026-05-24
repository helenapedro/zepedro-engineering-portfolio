import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
} from "../utils/cacheStore";
import useCachedAsyncData from "./useCachedAsyncData";

type UseHomeDataResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type CacheOptions = {
  ttlMs?: number;
  persist?: boolean;
  revalidate?: boolean;
};

function useHomeData<T = any>(
  collectionName: string,
  docName: string,
  options: CacheOptions = {}
): UseHomeDataResult<T> {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
    revalidate = true,
  } = options || {};

  const cacheKey = createCacheKey("doc", `${collectionName}/${docName}`);

  const fetcher = async (): Promise<T> => {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    return docSnap.data() as T;
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
}

export default useHomeData;
