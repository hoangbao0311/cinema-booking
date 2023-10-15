import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Seat from "../../components/CinemaSeat/index";
import axios from "axios";
import { Context, TicketContext } from "../../context/ticketContext";

const Index = () => {
  const { id } = useParams();

  const { ticketInfo, selectedSeats, cinemaInfo } = useContext(Context);
  const [listDataShowtime, setListDataShowtime] = useState(null);
  const [listDataTicket, setListDataTicket] = useState([]);
  const [listDataRoom, setListDataRoom] = useState([]);
  const [listDataRoomFind, setListDataRoomFind] = useState(null);

  const [numRow, setNumRow] = useState([]);
  const [numCol, setNumCol] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // let seatArr = [];

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
    console.log("roomFind", roomFind);

    console.log("Ticket", responseTicket.data);
    console.log("Showtime", responseShowtime.data);

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
      <div className="flex flex-col gap-2 justify-center text-start">
        {listDataShowtime != null ? (
          <div className="flex flex-col items-center gap-1">
            <img className="h-40" src={listDataShowtime?.films.banner} alt="" />
            <div className="font-semibold">{listDataShowtime.films.name}</div>
          </div>
        ) : (
          <div>loading...</div>
        )}
        <div className="flex gap-2">
          <div className="font-semibold">Xuất chiếu:</div>
          <div>{ticketInfo.showtime}</div>
          {console.log(ticketInfo)}
          <div>|</div>
          <div>{ticketInfo.date}</div>
        </div>
        {listDataRoomFind != null ? (
          <div className="flex gap-2">
            <div>
              <label className="font-semibold" for="">
                Rạp:
              </label>{" "}
              {cinemaInfo}
            </div>
            <div>|</div>
            <div>
              <label className="font-semibold" for="">
                Phòng:
              </label>{" "}
              {listDataRoomFind.nameRoom}
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )}
        {selectedSeats.length != 0 ? (
          <div>
            <p>
              <label className="font-semibold" for="">
                Ghế đã chọn:
              </label>{" "}
              {selectedSeats.join(", ")}
            </p>
          </div>
        ) : (
          <div className="font-semibold">Ghế đã chọn:</div>
        )}
        <button className="bg-green-500 text-white font-bold py-2 hover:bg-green-600">
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

export default Index;
