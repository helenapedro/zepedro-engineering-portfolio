import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = [...Array(pagesCount).keys()].map(x => x + 1);

  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {pages.map(page => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pagesCount} />
      <Pagination.Last onClick={() => onPageChange(pagesCount)} disabled={currentPage === pagesCount} />
    </Pagination>
  );
};

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default React.memo(PaginationComponent);
