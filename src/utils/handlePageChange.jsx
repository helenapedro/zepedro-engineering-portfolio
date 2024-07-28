import handleScrollToTop from "./HandleScroll";

const handlePageChange = (page, setCurrentPage) => {
     setCurrentPage(page);
     handleScrollToTop();
};

export default handlePageChange;