import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RoomAdmin = () => {
  const [listRoom, setListRoom] = useState([]);

  const data = async () => {
    const responseFilms = await axios.get("http://localhost:3004/rooms");
    if (responseFilms.status === 200) {
      setListRoom(responseFilms.data);
    } else {
      console.log("loi");
    }
  };

  console.log(listRoom);

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div>
        <div className="flex justify-between p-3 border-b-4 border-[#151929]">
          <div className="p-3 font-semibold text-xl ">
            Thiết lập phòng chiếu
          </div>
          <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
            <Link to="/admin/roomnew">Thêm phòng chiếu mới</Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center gap-5 ">
            <div className="flex-1">ID</div>
            <div className="flex-1 font-semibold text-xl">NameRoom</div>
            <div className="flex-1 font-semibold text-xl">Số hàng</div>
            <div className="flex-1 font-semibold text-xl">Số cột</div>
            <div className="flex-1 w-3" type=""></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          {listRoom?.map((item) => {
            return (
              <div className="flex items-center gap-5">
                <div className="flex-1">{item.id}</div>
                <div className="flex-1 font-semibold text-xl">
                  {item.nameRoom}
                </div>
                <div className="flex-1 font-semibold text-xl">
                  {item.horizon}
                </div>
                <div className="flex-1 font-semibold text-xl">
                  {item.vertical}
                </div>
                <Link to={`/admin/editroom/${item.id}`}>
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

export default RoomAdmin;
