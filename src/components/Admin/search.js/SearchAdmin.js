import React, { useState } from "react";

const SearchAdmin = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-3">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border w-full mt-1 text-lg font-semibold rounded-lg bg-inherit p-[10px]"
          />

          <button
            className="bg-[#fff] text-black font-semibold rounded-lg cursor-pointer text-center w-[100px]"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAdmin;
