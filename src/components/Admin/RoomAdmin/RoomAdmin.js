import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";
import Pagination from "../../Pagination/Pagination";

const RoomAdmin = () => {
  const [listRoom, setListRoom] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [itemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const data = async () => {
    const responseFilms = await axios.get("http://localhost:3004/rooms");
    if (responseFilms.status === 200) {
      setListRoom(responseFilms.data);
      setRooms(responseFilms.data);
      setMaxPage(Math.ceil(responseFilms.data.length / itemsPerPage));
    } else {
      console.log("loi");
    }
  };

  const handleSearch = () => {
    const filteredRooms = rooms.filter((room) => {
      const searchString = room.nameRoom.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setListRoom(filteredRooms);
    setCurrentPage(1);
    setMaxPage(Math.ceil(filteredRooms.length / itemsPerPage));
  };

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedRooms = listRoom.slice(firstItem, lastItem);

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
          <SearchAdmin
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
            <Link to="/admin/roomnew">Thêm phòng chiếu mới</Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center gap-5 ">
            <div className="flex-1">STT</div>
            <div className="flex-1 font-semibold text-xl">NameRoom</div>
            <div className="flex-1 font-semibold text-xl">Số hàng</div>
            <div className="flex-1 font-semibold text-xl">Số cột</div>
            <div className="flex-1 w-3" type=""></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          {displayedRooms?.map((item, index) => {
            return (
              <div className="flex items-center gap-5">
                <div className="flex-1">{index + 1 +firstItem}</div>
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
        <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={listRoom.length}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
      </div>
    </div>
  );
};

export default RoomAdmin;
