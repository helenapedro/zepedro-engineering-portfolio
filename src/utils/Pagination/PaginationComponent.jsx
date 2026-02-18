import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import { calculatePageRange } from './calculatePageRange';
import renderPaginationItem from './renderPaginationItem';

const PaginationComponent = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;

  const pages = calculatePageRange(currentPage, pagesCount);

  return (
    <Pagination className="justify-content-center pagination-sm">
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {pages.map(page => renderPaginationItem(page, currentPage, onPageChange))}
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
