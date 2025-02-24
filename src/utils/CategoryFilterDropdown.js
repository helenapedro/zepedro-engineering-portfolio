import React from "react";
import { Form, DropdownButton } from "react-bootstrap";

const CategoryFilterDropdown = ({
  categories,
  selectedCategories,
  projects,
  onCategoryChange,
}) => {
  return (
    <DropdownButton
      id="dropdown-category"
      title={`Filter by Categories ${
        selectedCategories.length > 0 ? `(${selectedCategories.length})` : ""
      }`}
      variant="outline-primary"
      className={`mb-4`}
    >
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {categories.map((category) => {
          const projectCount = projects.filter(
            (project) => project.categoryId === category.id
          ).length;
          return (
            <Form.Check
              key={category.id}
              type="checkbox"
              id={`category-${category.id}`}
              label={`${category.name} (${projectCount})`}
              onChange={() => onCategoryChange(category.id)}
              checked={selectedCategories.includes(category.id)}
              className="mb-2"
            />
          );
        })}
      </div>
    </DropdownButton>
  );
};

export default CategoryFilterDropdown;
