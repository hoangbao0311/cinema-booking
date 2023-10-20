import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

function Search ()  {
  const { listFilm } = useContext(Context);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

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
    setNoResults(filteredResults.length === 0 || search === '');
  };
  console.log(searchResults);

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>

      {noResults ? (  
        <p>Không có kết quả tìm kiếm cho từ khóa: {search}</p>
      ) : (
        searchResults.length > 0 && (
          <div className="grid gap-x-8 gap-y-12 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {searchResults.map((item, index) => (
              <div className="overflow-hidden w-[225px]" key={index}>
                <Link to={`/film/${item.id}`}>
                  <img className="h-[335px] w-[225px]" src={item.banner} alt="" />
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

export default Search;
