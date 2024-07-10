import React from 'react';
import { Link } from 'react-router-dom';

import containerStyles from '../Container/MainContainer.module.css';
import panelStyles from '../Container/Panel.module.css';
import arrowStyles from '../comon/Arrow.module.css'; 
import cardStyles from '../Container/CardContainer.module.css' 

const Home = () => {
    return (
        <div className={`container ${containerStyles.mainContainer}`}>
            <div className={`card ${panelStyles.introPanel} ${panelStyles.panel}`}>
                <div className="card-body">
                    <h2 className={`card-title ${cardStyles['card-title']}`}>José Francisco Pedro</h2>
                    <p className={`card-text ${cardStyles['card-text']}`}>
                        Hello, my name is <Link to="/card">ZéPedro</Link> and I'm an experienced Civil Engineer,
                        with over <i className={panelStyles.year}>3</i> years in
                        project management and nearly <i className={panelStyles.year}>1</i> year
                        as Coordinator of QHSE-Quality at <Link to='https://www.linkedin.com/company/mota-engil-angola/' target='_blank' rel='noopener noreferrer'>Mota-Engil Angola</Link>.
                    </p>
                    <p className={`card-text ${cardStyles['card-text']}`}>
                        This is a showcase of my 
                        <Link to="/projects" className='fst-italic'>projects</Link> and <Link to="/certificate" className='fst-italic'>abilities</Link>.     
                    </p>
                </div>
                <div>
                    <Link to="/projects" className={`btn btn-light position-relative`}>
                        <span className={`${arrowStyles.arrow} fas fa-chevron-right`}></span>
                        <img 
                            src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" 
                            alt="José Francisco Pedro" 
                            className="card-img-top" 
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
