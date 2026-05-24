import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../firebase'; 

interface Category {
  id: string;
  [key: string]: any;
}

interface Project {
  id: string;
  categoryId: string;
  [key: string]: any;
}

interface CategoryWithProjects extends Category {
  projects: Project[];
}

const useProjectsByCategory = () => {
  const [data, setData] = useState<CategoryWithProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories
        const categoriesSnapshot = await getDocs(collection(db, "category"));
        const categories: Category[] = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch all projects
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projects: Project[] = projectsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            categoryId: data.categoryId ?? "",
            ...data,
          };
        });

        // Group projects by category
        const categoriesWithProjects: CategoryWithProjects[] = categories.map(category => ({
          ...category,
          projects: projects.filter(project => project.categoryId === category.id),
        }));

        setData(categoriesWithProjects);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useProjectsByCategory;