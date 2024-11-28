import React, { useState } from 'react';
import { Card, Button, Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';
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
                ? prev.filter((id) => id !== categoryId) // Remove if already selected
                : [...prev, categoryId] // Add if not selected
        );
        setCurrentPage(1); // Reset to the first page
    };

    // Filter projects based on selected categories
    const filteredProjects = selectedCategories.length
        ? projects.filter((project) => selectedCategories.includes(project.categoryId))
        : projects;

    // Paginate the filtered projects
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

    return (
        <div className={`${mainStyles.panel} ${styles.projectsContainer}`}>
            {/* Owner Introduction Section */}
            {ownerData && <OwnerIntroduction ownerData={ownerData} />}

            {/* Dropdown Filter Section */}
            <div className={`mb-4 ${styles.filterSection}`}>
                <DropdownButton
                    id="dropdown-category"
                    title={`Filter by Categories ${selectedCategories.length > 0 ? `(${selectedCategories.length})` : ''}`}
                    variant="outline-primary"
                >
                    <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
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
                                    onChange={() => handleCategoryChange(category.id)}
                                    checked={selectedCategories.includes(category.id)}
                                    className="mb-2"
                                />
                            );
                        })}
                    </div>
                </DropdownButton>
            </div>

            {/* Projects Grid */}
            <Row>
                {paginatedProjects.map((project) => (
                    <Col key={project.id} md={6} className="mb-4">
                        <Card className={`${styles.cardContainer} shadow-sm`}>
                            {/* Move Title Above Image */}
                            <Card.Header className={`${styles.cardHeader} text-center`}>
                                <h5 className="mb-0">{project.title}</h5>
                                <Card.Subtitle className="mb-2 text-muted text-center" style={{marginTop: '0.5rem'}}>
                                    {project.organization}
                                </Card.Subtitle>
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
                                <Card.Text>
                                    {project.summaryHeader.length > 100
                                        ? `${project.summaryHeader.slice(0, 100)}...`
                                        : project.summaryHeader}
                                </Card.Text>
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
