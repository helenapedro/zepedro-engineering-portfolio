import React, { useState } from 'react';
import Slider from 'react-slick';
import * as iconsfa from 'react-icons/fa';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mainStyles from '../../components/Main.module.css';
import OwnerIntroduction from '../Home/OwnerIntroduction';
import useData from './../Hooks/useData';
import useHomeData from './../Hooks/homeData';
import renderPagination from './../../utils/Pagination/renderPagination';
import handlePageChange from './../../utils/handlePageChange';
import CategoryFilterDropdown from '../../utils/CategoryFilterDropdown';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProjectContainer.module.css';
import imagestyles from '../../components/ui/Image.module.css'
import iconstyles from '../../components/ui/Icon.module.css'
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css'

const ProjectsContainer = () => {
    const { data: projects, loading: projectsLoading, error: projectsError } = useData('projects');
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useData('category');
    const { data: ownerData, loading: ownerLoading, error: ownerError } = useHomeData('home', 'homeInfo');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);

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

    // Left Arrow Component
    const PrevArrow = ({ onClick }) => (
        <div className={imagestyles.customArrow} style={{ left: '10px' }} onClick={onClick}>
            <iconsfa.FaChevronLeft size={24} />
        </div>
    );

    // Right Arrow Component
    const NextArrow = ({ onClick }) => (
        <div className={imagestyles.customArrow} style={{ right: '10px' }} onClick={onClick}>
            <iconsfa.FaChevronRight size={24} />
        </div>
    );




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
                                <h5 className={`${prodetailsstyles.title} number mb-0`}>{project.title}</h5>
                                <Card.Subtitle className={`${prodetailsstyles.subtitle}`}>
                                    <div className={prodetailsstyles.organization}>
                                        <iconsfa.FaBuilding className={`${iconstyles.icon}`} /> {project.organization}
                                    </div>
                                    <div className={`${prodetailsstyles.place}`}>
                                        <iconsfa.FaMapMarkerAlt className={iconstyles.icon} /> {project.projectPlace?.address}, {project.projectPlace?.province}, {project.projectPlace?.country}  <span className={`${prodetailsstyles.year} number`}> <iconsfa.FaCalendarAlt className={`${iconstyles.icon}`} /> {project.endYear} </span>
                                    </div>
                                </Card.Subtitle>

                            </Card.Header>
                            {project.images && project.images.length > 0 && (
                                <>
                                    {/* Main Image Carousel */}
                                    <Slider
                                        dots={false}
                                        infinite={false}
                                        speed={500}
                                        slidesToShow={1}
                                        slidesToScroll={1}
                                        autoplay={false}
                                        prevArrow={<PrevArrow />}
                                        nextArrow={<NextArrow />}
                                        afterChange={(current) => setActiveSlide(current)}
                                        className={imagestyles.imageCarousel}
                                    >
                                        {project.images.map((image, index) => (
                                            <div key={index} onClick={() => openModal(image)}>
                                                <img
                                                    src={image.startsWith('http') ? image : `${process.env.REACT_APP_BASE_URL}${image}`}
                                                    alt={`${project.title} image ${index + 1}`}
                                                    className={`${imagestyles.imageContainer}`}
                                                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                                                />
                                            </div>
                                        ))}
                                    </Slider>

                                    {/* Slide Counter */}
                                    <div className={imagestyles.slideCounter}>
                                        {activeSlide + 1} / {project.images.length}
                                    </div>

                                    {/* Thumbnails */}
                                    <div className={imagestyles.thumbnailContainer}>
                                        {project.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`${imagestyles.thumbnail} ${index === activeSlide ? imagestyles.activeThumbnail : ''}`}
                                                onClick={() => setActiveSlide(index)}
                                            >
                                                <img
                                                    src={image.startsWith('http') ? image : `${process.env.REACT_APP_BASE_URL}${image}`}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
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
