import { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import db from '../config/firebase';

export function useDocument<T = DocumentData>(
  collectionPath: string,
  docId: string,
  opts: { listen?: boolean } = { listen: false }
) {
  const { listen } = opts;

  const [data, setData]       = useState<(T & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<Error | null>(null);

  useEffect(() => {
    if (!docId) return;

    const ref = doc(db, collectionPath, docId);

    if (listen) {
      // realtime listener
      const unsub = onSnapshot(
        ref,
        (snap) => {
          setData(snap.exists() ? ({ id: snap.id, ...(snap.data() as T) }) : null);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError(new Error(err.message));
          setLoading(false);
        }
      );
      return () => unsub();
    }

    // one-shot fetch
    (async () => {
      try {
        const snap = await getDoc(ref);
        setData(snap.exists() ? ({ id: snap.id, ...(snap.data() as T) }) : null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    })();
  }, [collectionPath, docId, listen]);

  return { data, loading, error };
}
