import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchAdmin from "../search.js/SearchAdmin";
import Pagination from "../../Pagination/Pagination";

const CinemaAdmin = () => {
  const [listCinema, setListCinema] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cinemas, setCinemas] = useState("");
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const data = async () => {
    const responseFilms = await axios.get("http://localhost:3004/cinemas");
    if (responseFilms.status === 200) {
      setListCinema(responseFilms.data);
      setCinemas(responseFilms.data);
      setMaxPage(Math.ceil(responseFilms.data.length / itemsPerPage));
    } else {
      console.log("loi");
    }
  };
  const handleSearch = () => {
    const filteredCinemas = cinemas.filter((cinema) => {
      const searchString =
        cinema.name.toLowerCase() + cinema.address.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setListCinema(filteredCinemas);
    setMaxPage(Math.ceil(filteredCinemas.length / itemsPerPage));
  };

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedCinemas = listCinema.slice(firstItem, lastItem);

  console.log(listCinema);
  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-between p-3 border-b-4 border-[#151929]">
          <div className="p-3 font-semibold text-xl ">Thiết lập rạp</div>
          <SearchAdmin
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
            <Link to="/admin/cinemanew">Thêm rạp mới</Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex">
            <div className="flex-1">STT</div>
            <div className="flex-1">Tên rạp</div>
            <div className="flex-1">Địa chỉ</div>
          </div>
          {displayedCinemas?.map((item, index) => {
            return (
              <div className="flex items-center gap-5">
                <div className="flex-1">{index + 1 + firstItem}</div>
                <div className="flex-1 font-semibold text-xl">{item.name}</div>
                <div className="flex-1 font-semibold text-xl">
                  {item.address}
                </div>
                <Link to={`/admin/editcinema/${item.id}`}>
                  <button
                    className="flex-1 hover:bg-green-900 bg-green-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                    type=""
                  >
                    Edit
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={listCinema.length}
          currentPage={currentPage}
          onPageChange={(newpage) => setCurrentPage(newpage)}
        />
      </div>
    </div>
  );
};

export default CinemaAdmin;
