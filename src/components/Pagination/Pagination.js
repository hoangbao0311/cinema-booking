import React from "react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center gap-5 ">
      <button
        className="border px-3 rounded"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        className="border px-3 rounded"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
