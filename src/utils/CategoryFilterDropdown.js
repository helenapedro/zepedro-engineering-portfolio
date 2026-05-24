import React from "react";
import { Form, DropdownButton } from "react-bootstrap";
import styles from "../components/ui/ProjectDetails.module.css";

const CategoryFilterDropdown = ({
  categories,
  selectedCategories,
  projects = [],
  categoryCounts = null,
  onCategoryChange,
}) => {
  const getCategoryCount = (category) => {
    if (categoryCounts && typeof categoryCounts[category.id] === "number") {
      return categoryCounts[category.id];
    }

    return projects.filter((project) => project.categoryId === category.id).length;
  };

  return (
    <DropdownButton
      id="dropdown-category"
      title={`Filter by Categories ${
        selectedCategories.length > 0 ? `(${selectedCategories.length})` : ""
      }`}
      variant="outline-primary"
      className={`mb-8`}
    >
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {categories.map((category) => {
          const projectCount = getCategoryCount(category);
          return (
            <Form.Check
              key={category.id}
              type="checkbox"
              id={`category-${category.id}`}
              label={`${category.name} (${projectCount})`}
              onChange={() => onCategoryChange(category.id)}
              checked={selectedCategories.includes(category.id)}
              className={`${styles.dropdown} mb-6`}
            />
          );
        })}
      </div>
    </DropdownButton>
  );
};

export default CategoryFilterDropdown;
