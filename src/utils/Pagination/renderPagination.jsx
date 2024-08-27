import React from 'react';
import PaginationComponent from './PaginationComponent';

const renderPagination = (dataLength, pageSize, currentPage, handlePageChangeWrapper, className) => (
  <div className={className}>
    <PaginationComponent
      itemsCount={dataLength}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={handlePageChangeWrapper}
    />
  </div>
);

export default renderPagination;
