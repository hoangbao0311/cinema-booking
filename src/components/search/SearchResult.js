import React, { useState, useContext } from "react";
import { searchContext } from "../../context/searchContext";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const {
    setSearchResults,
    searchResults,
    setNoResults,
    noResults,
    setSearch,
    search,
  } = useContext(searchContext);

  return (
    <div className="flex justify-center">
      {noResults ? (
        <p>Không có kết quả tìm kiếm cho từ khóa: {search}</p>
      ) : (
        searchResults.length > 0 && (
          <div className="grid gap-x-8 gap-y-12 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {searchResults.map((item, index) => (
              <div className="overflow-hidden w-[225px]" key={index}>
                <Link to={`/film/${item.id}`}>
                  <img
                    className="h-[335px] w-[225px]"
                    src={item.banner}
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <div className="flex justify-between">
                      <label htmlFor="">93 Phút</label>
                      <label htmlFor="">{item.startDay}</label>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default SearchResult;
