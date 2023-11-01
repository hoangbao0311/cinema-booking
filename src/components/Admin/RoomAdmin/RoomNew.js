import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RoomNew = () => {
  const [nameRoom, setNameRoom] = useState(null);
  const [vertical, setVertical] = useState(null);
  const [horizon, setHorizon] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [listCinema, setListCinema] = useState([]);

  console.log("selectedCinema", selectedCinema);
  const newRoom = async () => {
    if (
      (nameRoom == null) | (vertical == null) ||
      horizon == null ||
      selectedCinema == ""
    ) {
      toast.warning("Không được để trống");
      return;
    } else {
      const response = await axios.post("http://localhost:3004/rooms", {
        nameRoom: nameRoom,
        cinemasId: +selectedCinema,
        horizon: +horizon,
        vertical: +vertical,
      });
      if (response.status === 201) {
        toast.success("Tải lên thành công !");
      } else {
        console.log("Thất bại !");
      }
    }
  };

  const getData = async () => {
    const responseFilms = await axios.get("http://localhost:3004/cinemas");
    if (responseFilms.status === 200) {
      setListCinema(responseFilms.data);
    } else {
      console.log("loi");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <div className="text-black font-bold">THÊM PHÒNG CHIẾU</div>
          <div className="mb-4"></div>
          <div className="text-black w-full">
            <label for="" className="font-semibold">
              Tên phòng:
            </label>
            <input
              onChange={(e) => setNameRoom(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
              type="text"
            />
          </div>
          <div className="text-black w-full">
            <label for="" className="font-semibold ">
              Số hàng:
            </label>
            <input
              onChange={(e) => setVertical(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
              type="number"
            />
          </div>
          <div className="text-black w-full">
            <label for="" className="font-semibold ">
              Số cột:
            </label>
            <input
              onChange={(e) => setHorizon(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
              type="number"
            />
          </div>{" "}
          <div className="text-black w-full">
            <select
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
              className="flex-1 text-black outline-none p-2 w-full border border-[#1C2438] rounded-lg"
            >
              <option value="" className="text-black ">
                Chọn rạp
              </option>
              {listCinema?.map((cinema, index) => (
                <option key={index} value={cinema.id} className="text-black">
                  {cinema.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
            onClick={() => newRoom()}
          >
            UPLOAD
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomNew;
