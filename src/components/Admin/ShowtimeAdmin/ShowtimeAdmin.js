import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";

const ShowtimeAdmin = () => {
  const [listShowtime, setListShowtime] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showtimes, setShowtimes] = useState([]);

  const data = async () => {
    const responseFilms = await axios.get(
      "http://localhost:3004/showtimes?_expand=films&_expand=rooms&_expand=cinemas"
    );
    if (responseFilms.status === 200) {
      setListShowtime(responseFilms.data);
      setShowtimes(responseFilms.data);
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
  };

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
      <div className="flex flex-col gap-5 p-5">
        {listShowtime?.map((item, index) => {
          return (
            <div className="flex items-center gap-5">
              <div>{index + 1}</div>
              <div className="flex-1 font-semibold text-xl">
                {item.films.name}
              </div>
              <div className="flex-1 font-semibold text-xl">
                {item.starttime}
              </div>
              <div className="flex-1 font-semibold text-xl">
                {item.cinemas.name}
              </div>
              <div className="flex-1 font-semibold text-xl">{item.date}</div>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowtimeAdmin;
