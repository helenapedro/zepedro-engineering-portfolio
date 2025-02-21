/* useProjects.js – Manages project data, categories, filtering, and pagination. */
import { useState, useEffect } from "react";
import useData from "../Hooks/useData";

const useProjects = () => {
  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError,
  } = useData("projects");
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useData("category");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const pageSize = 10;

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const filteredProjects = selectedCategories.length
    ? projects?.filter((project) =>
        selectedCategories.includes(project.categoryId)
      )
    : projects;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = filteredProjects?.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    projects: paginatedProjects,
    projectsLoading,
    projectsError,
    categories,
    categoriesLoading,
    categoriesError,
    currentPage,
    pageSize,
    filteredProjects,
    handlePageChange,
    handleCategoryChange,
  };
};

export default useProjects;
