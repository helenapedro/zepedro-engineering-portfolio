import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../firebase";
import {
  createCacheKey,
  DEFAULT_CACHE_TTL_MS,
} from "../utils/cacheStore";
import useCachedAsyncData from "./useCachedAsyncData";

<<<<<<< HEAD:src/Hooks/useData.ts
type FirestoreData = { id: string; [key: string]: any };

function useData<T = FirestoreData>(
  collectionName: string,
  id?: string | null
): {
  data: T | T[] | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | T[] | null>(id ? null : []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
=======
const useData = (collectionName, id = null, options = {}) => {
  const {
    ttlMs = DEFAULT_CACHE_TTL_MS,
    persist = true,
    revalidate = true,
  } = options || {};
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/Hooks/useData.js

  const cacheKey = id
    ? createCacheKey("doc", `${collectionName}/${id}`)
    : createCacheKey("collection", collectionName);

<<<<<<< HEAD:src/Hooks/useData.ts
      try {
        if (id) {
          // Fetch single document
          const docRef = doc(db, collectionName, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() } as T);
          } else {
            throw new Error("Document not found");
          }
        } else {
          // Fetch all documents
          const snapshot = await getDocs(collection(db, collectionName));
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(docs);
        }
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err as Error);
      } finally {
        setLoading(false);
=======
  const fetcher = async () => {
    if (id) {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Document not found");
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/Hooks/useData.js
      }
      return { id: docSnap.id, ...docSnap.data() };
    }

    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  };

<<<<<<< HEAD:src/Hooks/useData.ts
  return { data, loading, error };
}
=======
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
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/Hooks/useData.js

export default useData;
