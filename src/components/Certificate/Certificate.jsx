import React from 'react';
import SkillsTable from '../Skills/SkillsTable';
import Academic from '../Education/Academic';
import ProfessionalMe from '../Education/ProfessionalMe'; 
import styles from './Certificate.module.css';
import academicData from '../../data/academicData.json';
import professionalData from '../../data/professionalData.json'
import config from '../../config';

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
            <a href="#certificate" className="arrow icon solid fa-arrow-up"></a>
        </div>
    );
};

export default Certificate;
