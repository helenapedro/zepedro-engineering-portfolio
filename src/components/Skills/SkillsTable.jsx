import React, { useState } from "react";
import SkillsHeader from "./SkillsHeader";
import SkillsBody from "./SkillsBody";
import styles from './Skills.module.css'; // Import the Skills module CSS

const SkillsTable = () => {
  const [sortColumn, setSortColumn] = useState({ path: 'year', order: 'asc' });

  const [skills, setSkills] = useState([
    { year: '2023', skill: 'Lumion', level: 'Básico' },
    { year: '2023', skill: 'Pilotagem de Drones', level: 'Intermediário' },
    { year: '2021', skill: 'SAP HANA S4P (aprovisionamentos, logística e armazém)', level: 'Intermediário' },
    { year: '2020', skill: 'MS Project', level: 'Básico' },
    { year: '2020', skill: 'SketchUp', level: 'Intermediário' },
    { year: '2020', skill: 'Adobe Sketchbook', level: 'Intermediário' },
    { year: '2019', skill: 'Revit - Arquitectura', level: 'Básico' },
    { year: '2018', skill: 'GanttProject', level: 'Intermediário' },
    { year: '2018', skill: 'Adobe Premiere Pro', level: 'Intermediário' },
    { year: '2017', skill: 'SAP 2000 - Análise e Projecto Estrutural', level: 'Intermediário' },
    { year: '2016', skill: 'FTool', level: 'Intermediário' },
    { year: '2010', skill: 'AutoCAD 2D - 3D', level: 'Intermediário' },
    { year: '2009', skill: 'Software e Hardware', level: 'Intermediário' },
    { year: '2009', skill: 'Microsoft Office', level: 'Intermediário' },
  ]);

  const handleSort = (newSortColumn) => {
    setSortColumn(newSortColumn);
    const sortedSkills = [...skills].sort((a, b) => {
      const path = newSortColumn.path;
      const order = newSortColumn.order === "asc" ? 1 : -1;
      // Convert year to numbers for correct numerical comparison
      return order * (parseInt(a[path]) - parseInt(b[path]));
    });
    setSkills(sortedSkills); 
  };

  return (
    <div className={styles.table}>
      <header className={styles['skills-table']}>
        <section>
          <div className={`${styles['skills-table-body']} table-responsive mb-3`}>
            <table className="table table-bordered table-hover border-primary">
              <SkillsHeader sortColumn={sortColumn} onSort={handleSort} />
              <SkillsBody data={skills} />
            </table>
          </div>
        </section>
      </header>
    </div>
  );
};

export default SkillsTable;
