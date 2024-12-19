import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mainStyles from '../../components/Main.module.css';
import styles from './ProjectContainer.module.css';
import OwnerIntroduction from '../Home/OwnerIntroduction';
import useData from './../Hooks/useData';
import useHomeData from './../Hooks/homeData';
import renderPagination from './../../utils/Pagination/renderPagination';
import handlePageChange from './../../utils/handlePageChange';
import CategoryFilterDropdown from '../../utils/CategoryFilterDropdown';

const ProjectsContainer = () => {
    const { data: projects, loading: projectsLoading, error: projectsError } = useData('projects');
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useData('category');
    const { data: ownerData, loading: ownerLoading, error: ownerError } = useHomeData('home', 'homeInfo');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const pageSize = 10;

    const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);

    if (projectsLoading || categoriesLoading || ownerLoading) return <p>Loading...</p>;
    if (projectsError) return <p>Error: {projectsError.message}</p>;
    if (categoriesError) return <p>Error: {categoriesError.message}</p>;
    if (ownerError) return <p>Error: {ownerError.message}</p>;

    // Handle checkbox selection
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId) 
                : [...prev, categoryId] 
        );
        setCurrentPage(1);
    };

    // Filter projects based on selected categories
    const filteredProjects = selectedCategories.length
        ? projects.filter((project) => selectedCategories.includes(project.categoryId))
        : projects;

    // Paginate the filtered projects
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

    return (
        <div className={`${mainStyles.panel}`}>
            {/* Owner Introduction Section */}
            {ownerData && <OwnerIntroduction ownerData={ownerData} />}
            {/* Dropdown Filter Section */}
            <CategoryFilterDropdown
                categories={categories}
                selectedCategories={selectedCategories}
                projects={projects}
                onCategoryChange={handleCategoryChange}
            />

            {/* Projects Grid */}
            <Row className={styles.container}>
                {paginatedProjects.map((project) => (
                    <Col key={project.id} md={6} style={{ marginBottom: '1rem' }}>
                        <Card className={`${styles.cardContainer} shadow-sm`}>
                            {/* Move Title Above Image */}
                            <Card.Header className={`${styles.cardHeader} text-center`}>
                                <h5 className={`${styles.title} mb-0`}>{project.title}</h5>
                                <Card.Subtitle className={` ${styles.subtitle} text-muted text-center `}  style={{ marginTop: '0.5rem' }}>
                                    {project.organization}, <i className={styles.number}>{project.endYear}</i> 
                                </Card.Subtitle>
                                <Card.Text className={` ${styles.subtitle} text-muted text-center `} style={{ marginTop: '0.5rem' }}>
                                    <strong>Location: </strong> 
                                    {project.projectPlace?.address}, {project.projectPlace?.province}, {project.projectPlace?.country}
                                </Card.Text>
                            </Card.Header>
                            {project.images && project.images.length > 0 && (
                                <Card.Img
                                    variant="top"
                                    src={`${process.env.REACT_APP_BASE_URL}${project.images[0]}`}
                                    alt={`${project.title} image`}
                                    className={styles.cardImage}
                                />
                            )}
                            <Card.Body>
                                {/* <Card.Text>
                                    {project.summaryHeader.length > 100
                                        ? `${project.summaryHeader.slice(0, 100)}...`
                                        : project.summaryHeader}
                                </Card.Text> */}

                                <div className="text-center">
                                    <Link to={`/projects/${project.id}`}>
                                        <Button variant="primary">View Details</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <div className={styles.pagination}>
                {renderPagination(
                    filteredProjects.length,
                    pageSize,
                    currentPage,
                    handlePageChangeWrapper,
                    styles.paginationContainer
                )}
            </div>
        </div>
    );
};

export default ProjectsContainer;
