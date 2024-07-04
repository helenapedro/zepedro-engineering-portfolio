import React from 'react';
import styles from './Certificate.module.css';

import Academic from '../Education/Academic';
import ProfessionalMe from '../Education/ProfessionalMe';
import SkillsTable from '../Skills/SkillsTable';
import academicData from '../../data/academicData.json';
import professionalData from '../../data/professionalData.json';
import otherEducationData from '../../data/otherEducationData.json';
import OtherEducationData from '../Education/otherEducation'

const Certificate = () => {
    return (
        <div className={styles.certificate}>
            <h1 className={styles['certificate-title']}>ACADEMIC EDUCATION</h1>
            <div>
                <Academic academicData={academicData} />
            </div>
            <h1 className={styles['certificate-title']}>MOTA-ENGIL TRAINING</h1>
            <div>
                <ProfessionalMe professionalData={professionalData} />
            </div>
            <h1 className={styles['certificate-title']}>TECHNICAL SKILLS</h1>
            <div>
                <SkillsTable />
            </div>
            <h1 className={styles['certificate-title']}>OTHER</h1>
            <div>
                <OtherEducationData otherEducationData={otherEducationData} />
            </div>
            <a href="#certificate" className={`${styles.arrowIcon} solid fa-arrow-up`}></a>
        </div> 
    );
};

export default Certificate;