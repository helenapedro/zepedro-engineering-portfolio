import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import db from '../config/firebase';
import type { ProjectsPage, Project } from '../types';

interface PageOpts {
  categories?: string[];
  after?: QueryDocumentSnapshot<DocumentData> | null;
  pageSize?: number;
}

export async function getProjectsPage({
  after = null,
  pageSize = 9,
}: PageOpts = {}): Promise<ProjectsPage> {
  const q = query(
    collection(db, 'projects'),
    where('isVisible', '==', true), // ← only live projects
    orderBy('createdAt', 'desc'),
    limit(pageSize),
    ...(after ? [startAfter(after)] : [])
  );

  const snap = await getDocs(q);
  const projects = snap.docs.map(
    (d) => {
      const { id: _id, ...data } = d.data() as Project & { id?: string };
      return { id: d.id, ...data };
    }
  );

  return {
    projects,
    lastDoc: snap.docs.at(-1) ?? null,
    hasMore: snap.size === pageSize,
  };
}
