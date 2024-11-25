import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './Home/Home'; 
import ProjectsContainer from './projects/ProjectContainer'; 
import styles from './playground.module.css';

const HomeAndProjectsPage = () => {
     return (
       <Container fluid className={styles.pageContainer}>
         <Row >
           <Col lg={8} md={10} sm={12}>
             <div className={styles.homeSection}>
               <Home />
             </div>
           </Col>
         </Row>
         {/* Projects Section */}
         <Row >
           <Col>
             <div className={styles.projectsSection}>
               <ProjectsContainer />
             </div>
           </Col>
         </Row>
       </Container>
     );
};
   /* "justify-content-center mb-5" */

export default HomeAndProjectsPage;
