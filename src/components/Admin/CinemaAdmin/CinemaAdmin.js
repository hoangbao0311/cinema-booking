import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CinemaAdmin = () => {
  const [listCinema, setListCinema] = useState([]);

  const data = async () => {
    const responseFilms = await axios.get("http://localhost:3004/cinemas");
    if (responseFilms.status === 200) {
      setListCinema(responseFilms.data);
    } else {
      console.log("loi");
    }
  };

  console.log(listCinema);
  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-between p-3 border-b-4 border-[#151929]">
          <div className="p-3 font-semibold text-xl ">Thiết lập rạp</div>
          <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
            <Link to="/admin/cinemanew">Thêm rạp mới</Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5">
          <div className="flex">
            <div className="flex-1">ID</div>
            <div className="flex-1">Tên rạp</div>
            <div className="flex-1">Địa chỉ</div>
          </div>
          {listCinema?.map((item) => {
            return (
              <div className="flex items-center gap-5">
                <div className="flex-1">{item.id}</div>
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
      </div>
    </div>
  );
};

export default CinemaAdmin;
