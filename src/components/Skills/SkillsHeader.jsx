import React from "react";
import styles from './Skills.module.css';

const SkillsHeader = ({ sortColumn, onSort }) => {
    const raiseSort = (path) => {
        const newSortColumn = { ...sortColumn };
        if (newSortColumn.path === path)
            newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
        else {
            newSortColumn.path = path;
            newSortColumn.order = "asc";
        }
        onSort(newSortColumn);
    };

    const renderSortIcon = (column) => {
        if (column.path !== sortColumn.path) return null;
        return sortColumn.order === "asc" ? (
            <i className="fa fa-sort-asc" />
        ) : (
            <i className="fa fa-sort-desc" />
        );
    };

    return (
        <thead className={styles['skills-table-header']}>
            <tr>
                <th className={styles['skills-table-header-cell']} onClick={() => raiseSort('year')}>
                    Start {renderSortIcon({ path: 'year' })}
                </th>
                <th className={styles['skills-table-header-cell']} onClick={() => raiseSort('skill')}>
                    Skill {renderSortIcon({ path: 'skill' })}
                </th>
                <th className={styles['skills-table-header-cell']} onClick={() => raiseSort('level')}>
                    Self-Assessment {renderSortIcon({ path: 'level' })}
                </th>
            </tr>
        </thead>
    );
};

export default SkillsHeader;
