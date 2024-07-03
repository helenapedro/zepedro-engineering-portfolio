import React from "react";
import styles from './Skills.module.css';

const SkillsBody = ({ data }) => {
    return (
        <tbody className={styles['skills-table-body']}>
            {data.map((skill, index) => (
                <tr key={index} className={styles['skills-table-row']}>
                    <td className={styles['skills-table-cell']}>{skill.year}</td>
                    <td className={styles['skills-table-cell']}>{skill.skill}</td>
                    <td className={styles['skills-table-cell']}>{skill.level}</td>
                </tr>
            ))}
        </tbody>
    );
};

export default SkillsBody;
