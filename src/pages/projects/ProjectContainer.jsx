import React, { useState } from 'react';
import { Card, Button, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mainStyles from '../../components/Main.module.css';
import styles from './ProjectContainer.module.css';
import OwnerIntroduction from '../Home/OwnerIntroduction';
import useData from './../Hooks/useData';
import useHomeData from './../Hooks/homeData';
import renderPagination from './../../utils/Pagination/renderPagination';
import handlePageChange from './../../utils/handlePageChange';

const ProjectsContainer = () => {
    const { data: projects, loading: projectsLoading, error: projectsError } = useData('projects');
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useData('category');
    const { data: ownerData, loading: ownerLoading, error: ownerError } = useHomeData('home', 'homeInfo'); // Fetch owner data
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const pageSize = 9;

    const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);

    if (projectsLoading || categoriesLoading || ownerLoading) return <p>Loading...</p>;
    if (projectsError) return <p>Error: {projectsError.message}</p>;
    if (categoriesError) return <p>Error: {categoriesError.message}</p>;
    if (ownerError) return <p>Error: {ownerError.message}</p>;

    // Filter projects by selected category
    const filteredProjects = selectedCategory
        ? projects.filter((project) => project.categoryId === selectedCategory)
        : projects;

    // Paginate the filtered projects
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

    return (
        <div className={`${mainStyles.panel} ${styles.projectsContainer}`}>
            {/* Owner Introduction Section */}
            {ownerData && <OwnerIntroduction ownerData={ownerData} />}

            {/* Dropdown for Filtering */}
            <DropdownButton
                id="dropdown-category"
                title={selectedCategory ? categories.find((cat) => cat.id === selectedCategory)?.name : 'Filter by Category'}
                className="mb-4"
                onSelect={(categoryId) => {
                    setSelectedCategory(categoryId);
                    setCurrentPage(1); // Reset to the first page
                }}
            >
                <Dropdown.Item eventKey={null}>All Categories</Dropdown.Item>
                {categories.map((category) => (
                    <Dropdown.Item key={category.id} eventKey={category.id}>
                        {category.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {/* Projects Grid */}
            <Row>
                {paginatedProjects.map((project) => (
                    <Col key={project.id} md={4} className="mb-4">
                        <Card className={`${styles.cardContainer} shadow-sm`}>
                            {project.images && project.images.length > 0 && (
                                <Card.Img
                                    variant="top"
                                    src={`${process.env.REACT_APP_BASE_URL}${project.images[0]}`}
                                    alt={`${project.title} image`}
                                />
                            )}
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{project.organization}</Card.Subtitle>
                                <Card.Text>
                                    {project.summaryHeader.length > 100
                                        ? `${project.summaryHeader.slice(0, 100)}...`
                                        : project.summaryHeader}
                                </Card.Text>
                                <Link to={`/projects/${project.id}`}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <div>
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
