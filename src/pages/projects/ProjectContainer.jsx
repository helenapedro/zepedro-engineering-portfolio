import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mainStyles from '../../components/Main.module.css';
import styles from './ProjectContainer.module.css';
import useData from './../Hooks/useData';
//import renderPagination from './../../utils/Pagination/renderPagination';
import handlePageChange from './../../utils/handlePageChange';

const ProjectsContainer = () => {
    const { data: projects, loading: projectsLoading, error: projectsError } = useData('projects');
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useData('category');
    const [selectedCategory, setSelectedCategory] = useState(null);
    /* const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9; */

    //const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);

    
    // Group projects by categoryId
    const groupedProjects = categories.reduce((acc, category) => {
        acc[category.id] = {
            name: category.name,
            projects: projects.filter((project) => project.categoryId === category.id),
        };
        return acc;
    }, {});
    
    if (projectsLoading || categoriesLoading) return <p>Loading...</p>;
    if (projectsError) return <p>Error: {projectsError.message}</p>;
    if (categoriesError) return <p>Error: {categoriesError.message}</p>;
    
    const filteredProjects = selectedCategory
        ? projects.filter((project) => project.categoryId === selectedCategory)
        : projects;

    return (
        <div className={`${mainStyles.panel} ${styles.projectsContainer}`}>
            <div className={styles.title}>
                <h1>PROJECTS By CATEGORY</h1>
                {Object.keys(groupedProjects).map((categoryId) => {
                    const category = groupedProjects[categoryId];
                    return (
                        <div key={categoryId} className={styles.categoryContainer}>
                            <h2>{category.name}</h2>
                            <Row>
                                {category.projects.map((project) => (
                                    <Col key={project.id} md={4} className="mb-4">
                                        <Card className={styles.cardContainer}>
                                            {project.images && project.images.length > 0 && (
                                                <Card.Img
                                                    variant="top"
                                                    src={`${process.env.REACT_APP_BASE_URL}${project.images[0]}`}
                                                    alt={`${project.title} image`}
                                                />
                                            )}
                                            <Card.Body>
                                                <Card.Title>{project.title}</Card.Title>
                                                <Card.Subtitle>{project.organization}</Card.Subtitle>
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
                        </div>
                    );
                })}
                {/* <div>
                    {renderPagination(
                        projects.length,
                        pageSize,
                        currentPage,
                        handlePageChangeWrapper,
                        styles.paginationContainer
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default ProjectsContainer;
