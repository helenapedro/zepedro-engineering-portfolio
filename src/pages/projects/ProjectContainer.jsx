import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mainStyles from '../../components/Main.module.css';
import styles from './ProjectContainer.module.css';
import useData from './../Hooks/useData';
import renderPagination from './../../utils/Pagination/renderPagination';
import handlePageChange from './../../utils/handlePageChange';

const ProjectsContainer = () => {
    const { data, loading, error } = useData('projects');
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredProject, setHoveredProject] = useState(null);
    const pageSize = 9;

    const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);
    const handleMouseEnter = (project) => setHoveredProject(project.id);
    const handleMouseLeave = () => setHoveredProject(null);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProjects = data.slice(startIndex, startIndex + pageSize);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={`${mainStyles.panel} ${styles.projectsContainer}`}>
            <div className={styles.title}>
                <h1>PROJECTS</h1>
                <Row>
                    {paginatedProjects.map((project) => (
                        <Col key={project.id} md={4} className="mb-4">
                            <Card
                                className={`${styles.cardContainer} ${styles.card}`}
                                onMouseEnter={() => handleMouseEnter(project)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {project.images && project.images.length > 0 && (
                                    <Card.Img
                                        variant="top"
                                        src={
                                            hoveredProject === project.id && project.images.length > 1
                                                ? `${process.env.REACT_APP_BASE_URL}${project.images[1]}`
                                                : `${process.env.REACT_APP_BASE_URL}${project.images[0]}`
                                        }
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
                <div>
                    {renderPagination(
                        data.length,
                        pageSize,
                        currentPage,
                        handlePageChangeWrapper,
                        styles.paginationContainer
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectsContainer;
