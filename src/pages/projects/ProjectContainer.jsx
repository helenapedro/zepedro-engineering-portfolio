import React, { useMemo, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import useHomeData from "../../Hooks/homeData";
import useData from "../../Hooks/useData";
import useProjectsServer from "../../Hooks/useProjectsServer";
import useCategoryCounts from "../../Hooks/useCategoryCounts";
import OwnerIntroduction from "../Home/OwnerIntroduction";
import renderPagination from "../../utils/Pagination/renderPagination";
import CategoryFilterDropdown from "../../utils/CategoryFilterDropdown";
import FeaturedMediaCard from "./components/FeaturedMediaCard";
import ProjectCard from "./components/ProjectCard";
import styles from "./ProjectContainer.module.css";
import mainStyles from "../../components/Main.module.css";
import containerstyles from "../../components/ui/Container.module.css";

const FEATURED_IMAGE_URL = "https://zepedro.s3.us-east-2.amazonaws.com/media/TPA_Online.jpeg";
const FEATURED_PROJECT_TITLE = "Construction of 120 Social Apartments in Buco-Zau";
const FEATURED_PROJECT_PATH = "/projects/construction-of-120-social-apartments-in-buco-zau";

const getCategoryName = (categories, categoryId) => {
  const category = categories.find((item) => item.id === categoryId);
  return category ? category.name : "Unknown Category";
};

const ProjectsContainer = () => {
  const {
    projects,
    totalCount,
    loading: projectsLoading,
    error: projectsError,
    currentPage,
    pageSize,
    selectedCategories,
    handlePageChange,
    handleCategoryChange,
  } = useProjectsServer({ pageSize: 8 });
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useData(
    "category"
  );
  const { data: ownerData, loading: ownerLoading, error: ownerError } = useHomeData(
    "home",
    "homeInfo"
  );

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const categoryCounts = useCategoryCounts(categories);

  const categoryNameMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category.name])),
    [categories]
  );

  const openModal = (image) => {
    const imageUrl = image.startsWith("http")
      ? image
      : `${process.env.REACT_APP_BASE_URL}${image}`;
    setModalImage(imageUrl);
    setShowModal(true);
  };

  if (projectsLoading || categoriesLoading || ownerLoading) return <p>Loading...</p>;
  if (projectsError) return <p>Error: {projectsError.message}</p>;
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;
  if (ownerError) return <p>Error: {ownerError.message}</p>;

  return (
    <div className={`${mainStyles.panel} ${styles.panel}`}>
      {ownerData && <OwnerIntroduction ownerData={ownerData} />}

      <FeaturedMediaCard
        imageUrl={FEATURED_IMAGE_URL}
        projectTitle={FEATURED_PROJECT_TITLE}
        projectPath={FEATURED_PROJECT_PATH}
      />

      <Row className={containerstyles.container}>
        <CategoryFilterDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          categoryCounts={categoryCounts}
          onCategoryChange={handleCategoryChange}
        />

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            categoryName={
              categoryNameMap[project.categoryId] ||
              getCategoryName(categories, project.categoryId)
            }
            onOpenImage={openModal}
          />
        ))}

        <div className={styles.pagination}>
          {renderPagination(
            totalCount,
            pageSize,
            currentPage,
            handlePageChange,
            styles.paginationContainer
          )}
        </div>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <img src={modalImage} alt="Project" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectsContainer;
