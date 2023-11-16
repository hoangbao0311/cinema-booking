import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";
import Pagination from "../../Pagination/Pagination";

const FilmEdit = () => {
  const [listFilm, setListFilm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [films, setFilms] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const data = async () => {
    const responseFilms = await axios.get("http://localhost:3004/films");
    if (responseFilms.status === 200) {
      setListFilm(responseFilms.data);
      setFilms(responseFilms.data);
      setMaxPage(Math.ceil(responseFilms.data.length / itemsPerPage));
    } else {
      console.log("loi");
    }
  };

  const handleDeleteFilm = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3004/films/${id}`);
      if (response.status === 200) {
        data();
        toast.success("Xóa thành công !");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.warning("Không thành công !");
    }
  };
  const handleSearch = () => {
    const filteredFilms = films.filter((film) => {
      const searchString = film.name.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setListFilm(filteredFilms);
    setCurrentPage(1);
    setMaxPage(Math.ceil(filteredFilms.length / itemsPerPage));
  };

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedFilms = listFilm.slice(firstItem, lastItem);

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập phim</div>
        <SearchAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
          <Link to="/admin/filmnew">Thêm phim mới</Link>
        </div>
      </div>
      <div className="px-4">
        <table className="mt-4 w-full border-collapse border-b border-gray-300">
          <thead>
            <tr>
              <th className=" border-b text-left font-semibold">STT</th>
              <th className=" border-b text-left font-semibold text-xl"></th>
              <th className=" border-b text-left font-semibold text-xl">
                Tên phim
              </th>
              <th className=" border-b text-left font-semibold text-xl">
                Thời lượng
              </th>
              <th className=" border-b text-left font-semibold text-xl">
                Ngày khởi chiếu
              </th>
              <th className=" border-b text-left font-semibold text-xl"></th>
            </tr>
          </thead>
          <tbody>
            {displayedFilms?.map((item, index) => {
              return (
                <tr>
                  <td className="border-b">{index + 1 + firstItem}</td>
                  <td className="border-b p-3">
                    <img className=" h-36" src={item.banner} alt="" />
                  </td>
                  <td className="border-b font-semibold text-xl">
                    {item.name}
                  </td>
                  <td className="border-b font-semibold text-xl">
                    {item.time} phút
                  </td>
                  <td className="border-b font-semibold text-xl">
                    {item.startDay}
                  </td>
                  <td className="border-b text-right">
                    <Link to={`/admin/filmhome/${item.id}`}>
                      <button
                        className="hover:bg-green-900 bg-green-700 m-3 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                        type=""
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="hover:bg-red-900 bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                      type=""
                      onClick={() => handleDeleteFilm(item.id)}
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
        totalItems={listFilm.length}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default FilmEdit;
