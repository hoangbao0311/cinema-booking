import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";
import Pagination from "../../Pagination/Pagination";

const ShowtimeAdmin = () => {
  const [listShowtime, setListShowtime] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const data = async () => {
    const responseFilms = await axios.get(
      "http://localhost:3004/showtimes?_expand=films&_expand=rooms&_expand=cinemas"
    );
    if (responseFilms.status === 200) {
      setListShowtime(responseFilms.data);
      setShowtimes(responseFilms.data);
      setMaxPage(Math.ceil(responseFilms.data.length / itemsPerPage));
    } else {
      console.log("loi");
    }
  };

  const handleSearch = () => {
    const filteredShowtimes = showtimes.filter((time) => {
      const searchString =
        time.films.name.toLowerCase() +
        time.starttime +
        time.cinemas.name.toLowerCase() +
        time.date;
      return searchString.includes(searchTerm.toLowerCase());
    });
    setListShowtime(filteredShowtimes);
    setMaxPage(Math.ceil(filteredShowtimes.length / itemsPerPage));
  };

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedShowtimes = listShowtime.slice(firstItem, lastItem);

  console.log(listShowtime);

  useEffect(() => {
    data();
  }, []);
  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập xuất chiếu</div>
        <SearchAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <Link to="/admin/showtimenew">
          <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
            Thêm xuất chiếu
          </div>
        </Link>
      </div>
      <div className="px-4">
        <table className="mt-4 w-full border-collapse border-b border-gray-300">
          <thead>
            <tr>
              <th className=" p-2 border-b text-left py-4 border-gray-300">
                STT
              </th>
              <th className=" p-2 border-b text-left py-4 border-gray-300">
                Tên phim
              </th>
              <th className=" p-2 border-b text-left py-4 border-gray-300">
                Suất chiếu
              </th>
              <th className=" p-2 border-b text-left py-4 border-gray-300">
                Rạp
              </th>
              <th className=" p-2 border-b text-left py-4 border-gray-300">
                Ngày
              </th>
              <th className=" p-2 border-b text-left py-4 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {displayedShowtimes?.map((item, index) => {
              return (
                <tr>
                  <td className="p-2 border-b">{index + 1 + firstItem}</td>
                  <td className="p-2 border-b font-semibold text-xl">
                    {item.films.name}
                  </td>
                  <td className="p-2 border-b font-semibold text-xl">
                    {item.starttime}
                  </td>
                  <td className="p-2 border-b font-semibold text-xl">
                    {item.cinemas.name}
                  </td>
                  <td className="p-2 border-b font-semibold text-xl">
                    {item.date}
                  </td>
                  <td className="p-2 text-right border-b flex gap-2">
                    <Link to={`/admin/editshowtime/${item.id}`}>
                      <button
                        className="hover:bg-green-900 bg-green-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                        type=""
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="hover:bg-red-900 bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                      type=""
                      // onClick={() => handleDeleteFilm(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={listShowtime.length}
        currentPage={currentPage}
        onPageChange={(newpage) => setCurrentPage(newpage)}
      />
    </div>
  );
};

export default ShowtimeAdmin;
