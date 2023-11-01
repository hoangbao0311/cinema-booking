import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FilmEdit = () => {
  const [listFilm, setListFilm] = useState([]);

  const data = async () => {
    const responseFilms = await axios.get("http://localhost:3004/films");
    if (responseFilms.status === 200) {
      setListFilm(responseFilms.data);
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

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập phim</div>
        <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
          <Link to="/admin/filmnew">Thêm phim mới</Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {listFilm?.map((item) => {
          return (
            <div className="flex items-center gap-5">
              <div>{item.id}</div>
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
    </div>
  );
};

export default FilmEdit;
