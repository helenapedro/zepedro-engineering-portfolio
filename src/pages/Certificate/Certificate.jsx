import styles from './Certificate.module.css';
import mainStyles from '../../components/Main.module.css';
import Academic from '../../components/Academic/Academic';
import SkillsTable from '../../components/Skills/SkillsTable';
import MotaEngilTraining from '../../components/METraining/MotaEngilTraining';
import AdditionalTraining from '../../components/AdditionalTraining/AdditionalTraing';
import Other from '../../components/OtherDocs/Other';

const Certificate = () => {
    return (
        <div className={mainStyles.panel}>
            <div className={styles['certificate-title']}>
                <div>
                    <h1>ACADEMIC EDUCATION</h1>
                    <Academic />
                </div>
                <div>
                    <h1>IT SKILLS</h1>
                    <SkillsTable />
                </div>
                <div>
                    <h1>MOTA-ENGIL TRAINING</h1>
                    <MotaEngilTraining />
                </div>
                <div>
                    <h1>ADDITIONAL TRAINING</h1>
                    <AdditionalTraining />
                </div>
                <div className={styles['certificate-title']}>
                    <h1>OTHER</h1>
                    <Other />
                </div>
            </div>
        </div>
    );
};

export default Certificate;
