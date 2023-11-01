import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/ticketContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SearchFilter() {
  const navigate = useNavigate();
  const { setTicketInfo, setCinemaInfo, ticketInfo, cinemaInfo } =
    useContext(Context);
  const [films, setFilms] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [room, setRoom] = useState(null);
  const [roomId, setRoomId] = useState(0);
  const [cinemaCT, setCinemaCT] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3004/films").then((response) => {
      setFilms(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedFilm) {
      axios
        .get(
          `http://localhost:3004/showtimes?_expand=rooms&_expand=cinemas&filmsId=${selectedFilm}`
        )
        .then((response) => {
          const cinemasSet = new Set();
          response.data.forEach((showtime) => {
            cinemasSet.add(showtime.cinemas);
          });
          setCinemas(Array.from(cinemasSet));
          setSelectedCinema("");
          setSelectedDate("");
          setSelectedTime("");
        });
    } else {
      setCinemas([]);
      setDates([]);
      setTimes([]);
      setSelectedCinema("");
      setSelectedDate("");
      setSelectedTime("");
    }
  }, [selectedFilm]);

  useEffect(() => {
    if (selectedCinema) {
      axios
        .get(
          `http://localhost:3004/showtimes?_expand=rooms&filmsId=${selectedFilm}&cinemasId=${selectedCinema}&_expand=cinemas`
        )
        .then((response) => {
          const datesSet = new Set();
          response.data.forEach((showtime) => {
            datesSet.add(showtime.date);
          });
          setDates(Array.from(datesSet));
          setSelectedDate("");
          setSelectedTime("");

          setCinemaCT(response.data);
        });
    } else {
      setDates([]);
      setTimes([]);
      setSelectedDate("");
      setSelectedTime("");
    }
  }, [selectedCinema, selectedFilm]);

  const nameCinema = cinemaCT ? cinemaCT[0] : "";
  console.log(nameCinema);
  useEffect(() => {
    if (selectedDate) {
      axios
        .get(
          `http://localhost:3004/showtimes?_expand=rooms&filmsId=${selectedFilm}&cinemas.name=${selectedCinema}&date=${selectedDate}`
        )
        .then((response) => {
          const timesSet = new Set();
          response.data.forEach((showtime) => {
            timesSet.add(showtime.starttime);
          });
          setTimes(Array.from(timesSet));
          setSelectedTime("");
        });
    } else {
      setTimes([]);
      setSelectedTime("");
    }
  }, [selectedDate, selectedCinema, selectedFilm]);

  useEffect(() => {
    if (selectedTime) {
      axios
        .get(
          `http://localhost:3004/showtimes?_expand=rooms&filmsId=${selectedFilm}&cinemas.name=${selectedCinema}&date=${selectedDate}&starttime=${selectedTime}`
        )
        .then((response) => {
          setRoom(response.data);
          response ? setRoomId(response.data[0]) : setRoomId(0);
        });
    } else {
      setRoom({});
    }
  }, [selectedDate, selectedCinema, selectedFilm, selectedTime]);

  console.log("roomId", roomId);

  const idRoom = roomId ? roomId.roomsId : null;

  const ticketContexts = {
    showtime: selectedTime,
    id: selectedFilm,
    roomsId: idRoom,
    date: selectedDate,
  };

  console.log("ticketContexts", ticketContexts);

  const handleBuy = () => {
    if (selectedFilm && selectedCinema && selectedDate && selectedTime) {
      setTicketInfo(ticketContexts);
      setCinemaInfo(nameCinema?.cinemas.name);
      navigate(`/selectseat/${selectedFilm}`);
    } else {
      toast.warning("Vui lòng chọn đủ các trường.");
    }
  };
  return (
    <div className="pb-9">
      <div className="flex flex-col gap-5 py-3 shadow-xl">
        <div className="flex w-full px-5 ">
          <select
            value={selectedFilm}
            onChange={(e) => setSelectedFilm(e.target.value)}
            className="flex-1 text-black outline-none p-4 cursor-pointer "
          >
            <option value="" className="text-black p-2">
              Chọn phim
            </option>
            {films.map((film) => (
              <option key={film.id} value={film.id} className="text-black">
                {film.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            className="flex-1 text-black outline-none p-4 "
          >
            <option value="" className="text-black p-2">
              Chọn rạp
            </option>
            {cinemas.map((cinema, index) => (
              <option key={index} value={cinema.id} className="text-black">
                {cinema.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 text-black outline-none p-4 "
          >
            <option value="" className="text-black p-2">
              Chọn ngày
            </option>
            {dates.map((date, index) => (
              <option key={index} value={date} className="text-black">
                {date}
              </option>
            ))}
          </select>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="flex-1 text-black outline-none p-4 "
          >
            <option value="" className="text-black p-2">
              Chọn suất
            </option>
            {times.map((time, index) => (
              <option key={index} value={time} className="text-black">
                {time}
              </option>
            ))}
          </select>
          <div onClick={() => handleBuy()} className="">
            <button className="bg-[#f26b38] text-white text-[17px] p-[11px_15px]">
              Mua vé nhanh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
