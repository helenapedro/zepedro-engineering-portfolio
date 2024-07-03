import React from 'react';
import SkillsTable from '../comon/SkillsTable';
import Academic from '../Education/Academic';
import styles from './Certificate.module.css';
import academicData from '../../data/academicData.json';

const Certificate = () => {
    return (
        <div className={styles.certificate}>
            <h1>FORMAÇÃO ACADÊMICA</h1>
            <div>
                <Academic academicData={academicData} />
            </div>
            <SkillsTable />
            <a href="#certificate" className="arrow icon solid fa-arrow-up"></a>
        </div>
    );
};

export default Certificate;
