import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { searchContext } from "../../context/searchContext";

function Search() {
  const { listFilm } = useContext(Context);
  const {
    setSearchResults,
    searchResults,
    setNoResults,
    noResults,
    setSearch,
    search,
  } = useContext(searchContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryLower = search.toLowerCase();

    const filteredResults = listFilm.filter((film) => {
      const { name, main_actor, startDay, director } = film;

      const nameMatch = name.toLowerCase().includes(queryLower);
      const main_actorMatch = main_actor.toLowerCase().includes(queryLower);
      const startDayMatch = startDay.toLowerCase().includes(queryLower);
      const directorMatch = director.toLowerCase().includes(queryLower);

      return nameMatch || main_actorMatch || startDayMatch || directorMatch;
    });

    setSearchResults(filteredResults);
    setNoResults(filteredResults.length === 0 || search === "");
    navigate(`/searchResult`);
  };

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none"
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
    </div>
  );
}

export default Search;
