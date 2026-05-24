import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

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
      }
    };

    fetchData();
  }, [collectionName, id]);

  return { data, loading, error };
}

export default useData;
