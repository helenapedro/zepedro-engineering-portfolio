import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
} from "../utils/cacheStore";
import useCachedAsyncData from "./useCachedAsyncData";

<<<<<<< HEAD:src/Hooks/homeData.ts
type UseHomeDataResult<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
};

function useHomeData<T = any>(collectionName: string, docName: string): UseHomeDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, collectionName, docName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as T);
        } else {
          setError("No such document!");
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
=======
const useHomeData = (collectionName, docName, options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
    revalidate = true,
  } = options || {};

  const cacheKey = createCacheKey("doc", `${collectionName}/${docName}`);
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/Hooks/homeData.js

  const fetcher = async () => {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document!");
    }
    return docSnap.data();
  };

<<<<<<< HEAD:src/Hooks/homeData.ts
  return { data, loading, error };
}
=======
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
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/Hooks/homeData.js

export default useHomeData;
