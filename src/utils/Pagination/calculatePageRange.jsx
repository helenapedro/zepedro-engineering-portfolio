export const calculatePageRange = (currentPage, pagesCount, maxPagesToShow = 5) => {
     // Calculate start and end pages
     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
     let endPage = Math.min(pagesCount, currentPage + Math.floor(maxPagesToShow / 2));
   
     // Adjust end page if the start page is too close to the beginning
     if (startPage === 1) {
       endPage = Math.min(pagesCount, startPage + maxPagesToShow - 1);
     } 
     // Adjust start page if the end page is too close to the end
     else if (endPage === pagesCount) {
       startPage = Math.max(1, endPage - maxPagesToShow + 1);
     }
   
     const pages = [];
     // Add the first page and ellipsis if needed
     if (startPage > 1) {
       pages.push(1);
       if (startPage > 2) pages.push('ellipsis-start');
     }
   
     // Add pages in the range
     for (let i = startPage; i <= endPage; i++) {
       pages.push(i);
     }
   
     // Add ellipsis and last page if needed
     if (endPage < pagesCount) {
       if (endPage < pagesCount - 1) pages.push('ellipsis-end');
       pages.push(pagesCount);
     }
   
     return pages;
   };
   