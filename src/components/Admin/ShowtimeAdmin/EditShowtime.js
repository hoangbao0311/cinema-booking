import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditShowtime = () => {
  const { id } = useParams();
  console.log(id);
  const [cinema, setCinema] = useState([]);
  const [film, setFilm] = useState([]);
  const [room, setRoom] = useState([]);
  const [selectCinema, setSelectCinema] = useState(null);
  const [selectMovie, setSelectMovie] = useState(null);
  const [selectRoom, setSelectRoom] = useState(null);
  const [date, setDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedEndHour, setSelectedEndHour] = useState("12");
  const [selectedEndMinute, setSelectedEndMinute] = useState("00");
  const [dataShowtime, setDataShowtime] = useState();

  let startTimes = selectedHour + ":" + selectedMinute;
  let endTimes = selectedEndHour + ":" + selectedEndMinute;

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const getCinema = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/cinemas`);
      if (response.status === 200) {
        setCinema(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu :", error);
    }
  };

  const getFilm = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/films`);
      if (response.status === 200) {
        setFilm(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu :", error);
    }
  };

  const getRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/rooms`);
      if (response.status === 200) {
        setRoom(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu :", error);
    }
  };

  useEffect(() => {
    getShowtime();
    getCinema();
    getFilm();
    getRoom();
  }, []);

  const handleUploadShowtime = async () => {
    if (date == null || price == null) {
      toast.warning("Không được để trống");
      return;
    } else {
      const response = await axios.patch("http://localhost:3004/showtimes", {
        cinemasId: +selectCinema,
        filmsId: +selectMovie,
        roomsId: +selectRoom,
        starttime: startTimes,
        endtime: endTimes,
        date: date,
        unitPrice: +price,
        stattus: "on",
      });
      if (response.status === 201) {
        toast.success("Tải lên thành công !");
      } else {
        console.log("Thất bại !");
      }
    }
  };

  const getShowtime = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/showtimes/${id}`);
      if (response.status === 200) {
        setDataShowtime(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu :", error);
    }
  };

  useEffect(() => {
    setSelectCinema(dataShowtime ? dataShowtime.cinemasId : []);
    setSelectMovie(dataShowtime ? dataShowtime.filmsId : []);
    setSelectRoom(dataShowtime ? dataShowtime.roomsId : []);
    setDate(dataShowtime ? dataShowtime.date : "");
    setPrice(dataShowtime ? dataShowtime.unitPrice : "");
  }, [dataShowtime]);

  return (
    <div>
      <div className="py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <div className="text-black font-bold">THÊM SUẤT CHIẾU</div>
          <select
            value={selectCinema}
            onChange={(e) => setSelectCinema(e.target.value)}
            className="flex-1 text-black outline-none p-4 cursor-pointer border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
          >
            <option value="" className="text-black p-2">
              Chọn rạp
            </option>
            {cinema?.map((item) => (
              <option key={item.id} value={item.id} className="text-black">
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={selectMovie}
            onChange={(e) => setSelectMovie(e.target.value)}
            className="flex-1 text-black outline-none p-4 cursor-pointer border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
          >
            <option value="" className="text-black p-2">
              Chọn phim
            </option>
            {film?.map((item) => (
              <option key={item.id} value={item.id} className="text-black">
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={selectRoom}
            onChange={(e) => setSelectRoom(e.target.value)}
            className="flex-1 text-black outline-none p-4 cursor-pointer border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
          >
            <option value="" className="text-black p-2">
              Chọn phòng chiếu
            </option>
            {room?.map((item) => (
              <option key={item.id} value={item.id} className="text-black">
                {item.nameRoom}
              </option>
            ))}
          </select>
          <div className="text-black">
            <label for="" className="font-semibold ">
              Chọn giờ bắt đầu
            </label>
            <div className="flex items-center space-x-2">
              <select
                className="border p-2 rounded-md"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                className="border p-2 rounded-md"
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(e.target.value)}
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-black">
            <label for="" className="font-semibold ">
              Chọn giờ kết thúc
            </label>
            <div className="flex items-center space-x-2 ">
              <select
                className="border p-2 rounded-md"
                value={selectedEndHour}
                onChange={(e) => setSelectedEndHour(e.target.value)}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                className="border p-2 rounded-md"
                value={selectedEndMinute}
                onChange={(e) => setSelectedEndMinute(e.target.value)}
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-black w-full">
            <label for="" className="font-semibold ">
              Chọn ngày chiếu
            </label>
            <input
              onChange={(e) => setDate(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
              type="date"
            />
          </div>
          <div className="text-black w-full">
            <label for="" className="font-semibold ">
              Giá vé:
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
              type="number"
              defaultValue={price}
            />
          </div>
          <div
            onClick={() => handleUploadShowtime()}
            className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
          >
            UPLOAD
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShowtime;
