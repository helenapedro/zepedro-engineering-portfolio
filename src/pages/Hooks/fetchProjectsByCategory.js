import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import db from '../../firebase';


const fetchProjectsByCategory = async () => {
  // Fetch all categories
  const categoriesSnapshot = await getDocs(collection(db, "category"));
  const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch all projects
  const projectsSnapshot = await getDocs(collection(db, "projects"));
  const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Group projects by category
  const categoriesWithProjects = categories.map(category => {
    return {
      ...category,
      projects: projects.filter(project => project.categoryId === category.id),
    };
  });

  return categoriesWithProjects;
};

export default fetchProjectsByCategory;