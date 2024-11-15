import styles from './Certificate.module.css';
import mainStyles from '../../components/Main.module.css';
import SkillsTable from '../../components/Skills/SkillsTable';
import Courses from '../../components/courses/Courses';
import Certificates from '../../components/certificates/Certificates';
import Education from './../../components/Academic/Education';
import Training from '../../components/training/Training';

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
                    <h1>MOTA-ENGIL TRAINING</h1>
                    <Courses />
                </div>
                <div>
                    <h1>TRAINING</h1>
                    <Training />
                </div>
                <div className={styles['certificate-title']}>
                    <h1>Certificates</h1>
                    <Certificates />
                </div>
            </div>
        </div>
    );
};

export default Certificate;
