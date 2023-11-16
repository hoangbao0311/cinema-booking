import React from "react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pt-5 flex justify-center gap-5">
      <button
        className={`border px-3 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        className={`border px-3 rounded ${currentPage === maxPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
