import { Timestamp, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export type Activity =
  | string
  | {
      header: string;
      items: string[];
    };

export interface Project {
  id: string; // doc id (slug)
  title: string;
  organization: string;
  placeandyear: string;
  description: string;
  activities: Activity[];
  finalDescription: string;
  mainImageUrl: string;
  imageRefs: string[];
  slug: string;
  isVisible: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  skillsShowcased?: string[];
  client?: string;
  modelAsset?: ProjectModelAsset;
  modelAssets?: ProjectModelAsset[];
}

export interface ProjectModelAsset {
  url: string;
  title?: string;
  format?: string;
  sizeLabel?: string;
  source?: string;
  previewImage?: string;
}


export interface ProjectsPage {
  projects: Project[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}
