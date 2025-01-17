import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
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
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const pageSize = 10;

    const handlePageChangeWrapper = (page) => handlePageChange(page, setCurrentPage);

    if (projectsLoading || categoriesLoading || ownerLoading) return <p>Loading...</p>;
    if (projectsError) return <p>Error: {projectsError.message}</p>;
    if (categoriesError) return <p>Error: {categoriesError.message}</p>;
    if (ownerError) return <p>Error: {ownerError.message}</p>;

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
        prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
        setCurrentPage(1);
    };

    const filteredProjects = selectedCategories.length
        ? projects.filter((project) => selectedCategories.includes(project.categoryId))
        : projects;

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

    const openModal = (image) => {
        setModalImage(image);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className={`${mainStyles.panel}`}>
        {ownerData && <OwnerIntroduction ownerData={ownerData} />}
        <CategoryFilterDropdown
            categories={categories}
            selectedCategories={selectedCategories}
            projects={projects}
            onCategoryChange={handleCategoryChange}
        />

        <div className={styles.pagination}>
            {renderPagination(
            filteredProjects.length,
            pageSize,
            currentPage,
            handlePageChangeWrapper,
            styles.paginationContainer
            )}
        </div>

        <Row className={styles.container}>
            {paginatedProjects.map((project) => (
                <Col key={project.id} md={6} style={{ marginBottom: '1rem' }}>
                    <Card className={`${styles.cardContainer} shadow-sm`}>
                        <Card.Header className={`${styles.cardHeader} text-center`}>
                            <h5 className={`${styles.title} mb-0`}>{project.title}</h5>
                            <Card.Subtitle className={`${styles.subtitle} text-muted`}>
                            {project.organization}, <i>{project.endYear}</i>
                            </Card.Subtitle>
                        </Card.Header>
                        {project.images && project.images.length > 0 && (
                            <Card.Img
                                variant="top"
                                src={
                                project.images[0].startsWith('http') 
                                    ? project.images[0] 
                                    : `${process.env.REACT_APP_BASE_URL}${project.images[0]}`
                                }
                                alt={`${project.title} image`}
                                className={styles.cardImage}
                                onClick={() => openModal(
                                project.images[0].startsWith('http') 
                                    ? project.images[0] 
                                    : `${process.env.REACT_APP_BASE_URL}${project.images[0]}`
                                )}
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                        <Card.Body>
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

        <div className={styles.pagination}>
            {renderPagination(
            filteredProjects.length,
            pageSize,
            currentPage,
            handlePageChangeWrapper,
            styles.paginationContainer
            )}
        </div>

        {/* Modal for Image Preview */}
        <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Body>
            <img src={modalImage} alt="Project" className="img-fluid" />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default ProjectsContainer;
