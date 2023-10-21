import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Seat from "../../components/CinemaSeat/index";
import axios from "axios";
import { Context, TicketContext } from "../../context/ticketContext";
import SelectFilm from "../../components/SelectFilm/SelectFilm";

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    ticketInfo,
    setListDataShowtime,
    setListDataRoomFind,
    setPriceShowtime,
    selectedSeats,
  } = useContext(Context);
  const [listDataTicket, setListDataTicket] = useState([]);
  const [listDataRoom, setListDataRoom] = useState([]);
  const [numRow, setNumRow] = useState([]);
  const [numCol, setNumCol] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const data = async () => {
    const responseShowtime = await axios.get(
      `http://localhost:3004/showtimes/${id}?_expand=films&_expand=rooms&_expand=cinemas`
    );
    if (responseShowtime.status === 200) {
      setListDataShowtime(responseShowtime.data);
    } else {
      console.log("loi");
    }

    const responseTicket = await axios.get(
      `http://localhost:3004/ticket?_expand=seats&_expand=showtimes`
    );
    if (responseTicket.status === 200) {
      setListDataTicket(responseTicket.data);
    } else {
      console.log("loi");
    }

    const responseRoom = await axios.get(
      `http://localhost:3004/rooms?_expand=cinemas`
    );
    if (responseRoom.status === 200) {
      setListDataRoom(responseRoom.data);
    } else {
      console.log("loi");
    }

    const roomFind = await responseRoom.data.find(
      (item) => item.id == ticketInfo.roomsId
    );
    setListDataRoomFind(roomFind);

    setPriceShowtime(responseShowtime.data.unitPrice);

    const ticketFilter = await responseTicket.data.filter(
      (item) => item.showtimes.id == id
    );

    const seatMap = await ticketFilter.reduce(
      (acc, item) => acc.concat(item.seats.name),
      []
    );

    setNumRow(responseShowtime.data.rooms.horizon);
    setNumCol(responseShowtime.data.rooms.vertical);
    setBookedSeats(seatMap);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  console.log(selectedSeats.length);
  useEffect(() => {
    data();
  }, [id]);

  return (
    <div className="flex justify-center gap-5">
      <div className="bg-orange-500">
        <h2 className="text-2xl font-semibold text-white m-5">Chọn ghế:</h2>
        <div className="bg-white mx-3 mt-6 px-20">
          <Seat
            numRows={numRow}
            numColumns={numCol}
            bookedSeats={bookedSeats}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-around">
        <SelectFilm />
        <div className="flex gap-2">
          <Link
            className=" rounded-xl text-[#F58020] font-bold text-center px-10 py-2"
            onClick={handleGoBack}
          >
            Quay lại
          </Link>
          {selectedSeats.length === 0 ? (
            // Hiển thị một nút không hoạt động khi selectedSeats.length === 0
            <button
              className="bg-gray-400 rounded-xl text-white font-bold text-center px-10 py-2 cursor-not-allowed"
              disabled
            >
              Tiếp tục
            </button>
          ) : (
            // Hiển thị nút Tiếp tục bình thường khi selectedSeats.length > 0
            <Link
              className="bg-[#F58020] rounded-xl text-white font-bold text-center hover:bg-[#e8933f] px-10 py-2"
              to={`/food/${id}`}
            >
              Tiếp tục
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
