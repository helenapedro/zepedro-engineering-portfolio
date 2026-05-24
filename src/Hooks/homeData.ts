import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

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

    fetchData();
  }, [collectionName, docName]);

  return { data, loading, error };
}

export default useHomeData;
