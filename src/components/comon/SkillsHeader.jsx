import React, { memo } from "react";

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
    <thead className="quote__line">
      <tr className="th__first">
        <th className="table__top" onClick={() => raiseSort('year')}>
          Start {renderSortIcon({ path: 'year' })}
        </th>
        <th className="table__top" onClick={() => raiseSort('skill')}>
          Skill {renderSortIcon({ path: 'skill' })}
        </th>
        <th className="auto__avaliacao__header" onClick={() => raiseSort('level')}>
          Self-Assessment {renderSortIcon({ path: 'level' })}
        </th>
      </tr>
    </thead>
  );
};

export default memo(SkillsHeader);
