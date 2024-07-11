import React, { useEffect } from 'react';
import styles from './Certificate.module.css';
import mainStyles from '../../components/Main.module.css';

import Academic from './Academic';
import ProfessionalMe from './professionalMe';
import AditionalTraining from './AdditionalTraing';
import SkillsTable from '../../components/Skills/SkillsTable';
import academicData from '../../data/academicData.json';
import professionalData from '../../data/professionalData.json';
import otherEducationData from '../../data/otherEducationData.json';
import OtherEducationData from './otherEducation';
import otherTrainingData from '../../data/otherTrainingData.json';

const Certificate = () => {
    return (
        <div className={mainStyles.panel}>
            <h1 className={styles['certificate-title']}>ACADEMIC EDUCATION</h1>
            <div>
                <Academic academicData={academicData} />
            </div>
            <h1 className={styles['certificate-title']}>TECHNICAL SKILLS</h1>
            <div>
                <SkillsTable />
            </div>
            <h1 className={styles['certificate-title']}>MOTA-ENGIL TRAINING</h1>
            <div>
                <ProfessionalMe professionalData={professionalData} />
            </div>
            <h1 className={styles['certificate-title']}>ADDITIONAL TRAINING</h1>
            <div>
                <AditionalTraining otherTrainingData={otherTrainingData} />
            </div>
            <h1 className={styles['certificate-title']}>OTHER</h1>
            <div>
                <OtherEducationData otherEducationData={otherEducationData} />
            </div>
        </div>
    );
};

export default Certificate;
