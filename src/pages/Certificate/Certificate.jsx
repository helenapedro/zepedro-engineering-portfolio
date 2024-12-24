import styles from './Certificate.module.css';
import mainStyles from '../../components/Main.module.css';
import SkillsTable from '../../components/Skills/SkillsTable';
import Courses from '../../components/courses/Courses';
import Other from '../../components/other/Other';
import Education from './../../components/Academic/Education';
import Certificates from '../../components/certificates/Certificates';

const Certificate = () => {
    return (
        <div className={mainStyles.panel}>
            <div className={styles['certificate-title']}>
                <div>
                    <h1>EDUCATION</h1>
                    <Education />
                </div>
                <div>
                    <h1>IT SKILLS</h1>
                    <SkillsTable />
                </div>
                <div>
                    <Courses />
                </div>
                <div>
                    <Certificates />
                </div>
                <div className={styles['certificate-title']}>
                    <Other />
                </div>
            </div>
        </div>
    );
};

export default Certificate;
