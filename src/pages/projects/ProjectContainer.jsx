import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useData from './../../Hooks/useData';
import useHomeData from './../../Hooks/homeData';
import * as iconsfa from 'react-icons/fa';
import ProjectCarousel from '../../components/Project/ProjectCarousel';
import OwnerIntroduction from '../Home/OwnerIntroduction';
import renderPagination from './../../utils/Pagination/renderPagination';
import handlePageChange from './../../utils/handlePageChange';
import CategoryFilterDropdown from '../../utils/CategoryFilterDropdown';
import styles from './ProjectContainer.module.css';
import mainStyles from '../../components/Main.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css';

const ProjectsContainer = () => {
    const { data: projects, loading: projectsLoading, error: projectsError } = useData('projects');
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useData('category');
    const { data: ownerData, loading: ownerLoading, error: ownerError } = useHomeData('home', 'homeInfo');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const pageSize = 8;

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
        const imageUrl = image.startsWith('http') ? image : `${process.env.REACT_APP_BASE_URL}${image}`;
        setModalImage(imageUrl);
        setShowModal(true);
    };


    const closeModal = () => setShowModal(false);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    return (
        <div className={`${mainStyles.panel} ${styles.panel}`}>
            {ownerData && <OwnerIntroduction ownerData={ownerData} />}

            <Row className={containerstyles.container}>
                <CategoryFilterDropdown
                    categories={categories}
                    selectedCategories={selectedCategories}
                    projects={projects}
                    onCategoryChange={handleCategoryChange}
                />

                {paginatedProjects.map((project) => (
                    <Col key={project.id} md={6} style={{ marginBottom: '1rem' }}>
                        <Card className={`${styles.cardContainer} shadow-sm`}>
                            <Card.Header className={`${styles.cardHeader} text-center`}>
                                <h5 className={`${prodetailsstyles.title} number mb-0`}>{project.title}</h5>
                                <Card.Subtitle className={`${prodetailsstyles.subtitle}`}>
                                    <div className={prodetailsstyles.organization}>
                                        <iconsfa.FaBuilding className={`${prodetailsstyles.icon}`} /> {project.organization} <span className={`${prodetailsstyles.year} number`}><iconsfa.FaCalendarAlt className={`${prodetailsstyles.icon}`} /> {project.endYear}</span>
                                    </div>
                                    <div className={`${prodetailsstyles.place}`}>
                                        <iconsfa.FaMapMarkerAlt className={prodetailsstyles.icon} /> {project.placeandyear}
                                    </div>
                                    <div className={prodetailsstyles.category}>
                                        <iconsfa.FaTags className={prodetailsstyles.icon} /> {getCategoryName(project.categoryId)}
                                    </div>
                                </Card.Subtitle>
                            </Card.Header>

                            {project.imageRefs && project.imageRefs.length > 0 && (
                                <ProjectCarousel
                                    images={project.imageRefs}
                                    title={project.title}
                                    onImageClick={openModal}
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

                <div className={styles.pagination}>
                    {renderPagination(
                        filteredProjects.length,
                        pageSize,
                        currentPage,
                        handlePageChangeWrapper,
                        styles.paginationContainer
                    )}
                </div>
            </Row>


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
