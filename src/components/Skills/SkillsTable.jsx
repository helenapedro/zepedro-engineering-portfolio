import React, { useState } from "react";
import SkillsHeader from "./SkillsHeader";
import SkillsBody from "./SkillsBody";
import styles from './Skills.module.css'; // Import the Skills module CSS

const SkillsTable = () => {
  const [sortColumn, setSortColumn] = useState({ path: 'year', order: 'asc' });

  const [skills, setSkills] = useState([
    { year: '2023', skill: 'Lumion', level: 'Basic' },
    { year: '2023', skill: 'Drone Piloting', level: 'Intermediate' },
    { year: '2021', skill: 'SAP HANA S4P (procurement, logistics and warehouse)', level: 'Intermediate' },
    { year: '2020', skill: 'MS Project', level: 'Basic' },
    { year: '2020', skill: 'SketchUp', level: 'Intermediate' },
    { year: '2020', skill: 'Adobe Sketchbook', level: 'Intermediate' },
    { year: '2019', skill: 'Revit - Architecture', level: 'Basic' },
    { year: '2018', skill: 'GanttProject', level: 'Intermediate' },
    { year: '2018', skill: 'Adobe Premiere Pro', level: 'Intermediate' },
    { year: '2017', skill: 'SAP 2000 - Analysis and Structural Design', level: 'Intermediate' },
    { year: '2016', skill: 'FTool', level: 'Intermediate' },
    { year: '2010', skill: 'AutoCAD 2D - 3D', level: 'Intermediate' },
    { year: '2009', skill: 'Software and Hardware', level: 'Intermediate' },
    { year: '2009', skill: 'Microsoft Office', level: 'Intermediate' },
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
    <div> 
      <header className={styles['skills-table']}>
        <section className={styles.panel}>
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
