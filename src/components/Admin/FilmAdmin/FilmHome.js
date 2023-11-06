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
  const [itemsPerPage] = useState(1);
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
      <div className="flex flex-col gap-5 p-5">
        {displayedFilms?.map((item, index) => {
          return (
            <div className="flex items-center gap-5">
              <div>{index + 1 + firstItem}</div>
              <img className=" h-36" src={item.banner} alt="" />
              <div className="flex-1 font-semibold text-xl">{item.name}</div>
              <Link to={`/admin/filmhome/${item.id}`}>
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
                onClick={() => handleDeleteFilm(item.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
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
