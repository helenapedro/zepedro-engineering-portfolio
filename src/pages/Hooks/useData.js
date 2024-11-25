import { doc, getDoc, getDocs, collection, query, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../../firebase';

const useData = (collectionName, id = null) => {
  const [data, setData] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const docRef = doc(db, collectionName, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() });
          } else {
            throw new Error('Project not found');
          }
        } else {
          const collectionRef = collection(db, collectionName);
          const q = query(collectionRef, orderBy('timestamp'));
          const querySnapshot = await getDocs(q);
          const dataFromFirestore = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(dataFromFirestore);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, id]);

  return { data, loading, error };
};

export default useData;
