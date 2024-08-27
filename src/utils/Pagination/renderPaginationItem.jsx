import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const renderPaginationItem = (page, currentPage, onPageChange) => {
  if (page === 'ellipsis-start' || page === 'ellipsis-end') {
    return <Pagination.Ellipsis key={page} disabled />;
  }
  return (
    <Pagination.Item
      key={page}
      active={page === currentPage}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Pagination.Item>
  );
};

export default renderPaginationItem;
