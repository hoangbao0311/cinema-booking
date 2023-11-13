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
  const [itemsPerPage] = useState(5);
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
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">STT</th>
              <th className="p-2 border font-semibold text-xl">NameRoom</th>
              <th className="p-2 border font-semibold text-xl">Số hàng</th>
              <th className="p-2 border font-semibold text-xl">Số cột</th>
              <th className="p-2 border" type=""></th>
            </tr>
          </thead>
          <tbody>
            {displayedRooms?.map((item, index) => {
              return (
                <tr>
                  <td className="p-2 border">{index + 1 + firstItem}</td>
                  <td className="p-2 border font-semibold text-xl">
                    {item.nameRoom}
                  </td>
                  <div className="p-2 border font-semibold text-xl">
                    {item.horizon}
                  </div>
                  <td className="p-2 border font-semibold text-xl">
                    {item.vertical}
                  </td>
                  <td className="p-2 border">
                    <Link to={`/admin/editroom/${item.id}`}>
                      <button
                        className="p-2 border hover:bg-green-900 bg-green-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
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
          totalItems={listRoom.length}
          currentPage={currentPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </div>
  );
};

export default RoomAdmin;
