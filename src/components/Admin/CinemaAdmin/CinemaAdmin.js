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
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">STT</th>
              <th className="p-2 border">Tên rạp</th>
              <th className="p-2 border">Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            {displayedCinemas?.map((item, index) => {
              return (
                <tr>
                  <td className="p-2 border">{index + 1 + firstItem}</td>
                  <td className="p-2 border font-semibold text-xl">{item.name}</td>
                  <td className="p-2 border font-semibold text-xl">{item.address}</td>
                  <td className="p-2 border">
                    <Link to={`/admin/editcinema/${item.id}`}>
                      <button
                        className="flex-1 hover:bg-green-900 bg-green-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                        type=""
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
