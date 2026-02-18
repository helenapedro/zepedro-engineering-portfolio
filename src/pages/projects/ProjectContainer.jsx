import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useHomeData from './../../Hooks/homeData';
import useData from './../../Hooks/useData';
import useProjectsServer from './../../Hooks/useProjectsServer';
import * as iconsfa from 'react-icons/fa';
import ProjectCarousel from '../../components/Project/ProjectCarousel';
import OwnerIntroduction from '../Home/OwnerIntroduction';
import renderPagination from './../../utils/Pagination/renderPagination';
import CategoryFilterDropdown from '../../utils/CategoryFilterDropdown';
import styles from './ProjectContainer.module.css';
import mainStyles from '../../components/Main.module.css';
import containerstyles from '../../components/ui/Container.module.css';
import prodetailsstyles from '../../components/ui/ProjectDetails.module.css';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import db from '../../firebase';
import { createCacheKey, getOrFetchCached } from '../../utils/cacheStore';

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
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useData('category');
    const { data: ownerData, loading: ownerLoading, error: ownerError } = useHomeData('home', 'homeInfo');
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [categoryCounts, setCategoryCounts] = useState({});

    useEffect(() => {
        let isMounted = true;

        const fetchCategoryCounts = async () => {
            if (!categories.length) return;

            try {
                const entries = await Promise.all(
                    categories.map(async (category) => {
                        const key = createCacheKey('count', `projects:category:${category.id}`);
                        const count = await getOrFetchCached({
                            key,
                            fetcher: async () => {
                                const countQuery = query(
                                    collection(db, 'projects'),
                                    where('categoryId', '==', category.id)
                                );
                                const snapshot = await getCountFromServer(countQuery);
                                return snapshot.data().count;
                            },
                        });

                        return [category.id, count];
                    })
                );

                if (isMounted) {
                    setCategoryCounts(Object.fromEntries(entries));
                }
            } catch (error) {
                if (isMounted) {
                    setCategoryCounts({});
                }
            }
        };

        fetchCategoryCounts();

        return () => {
            isMounted = false;
        };
    }, [categories]);

    if (projectsLoading || categoriesLoading || ownerLoading) return <p>Loading...</p>;
    if (projectsError) return <p>Error: {projectsError.message}</p>;
    if (categoriesError) return <p>Error: {categoriesError.message}</p>;
    if (ownerError) return <p>Error: {ownerError.message}</p>;

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
                    categoryCounts={categoryCounts}
                    onCategoryChange={handleCategoryChange}
                />

                {projects.map((project) => (
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
                        totalCount,
                        pageSize,
                        currentPage,
                        handlePageChange,
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
