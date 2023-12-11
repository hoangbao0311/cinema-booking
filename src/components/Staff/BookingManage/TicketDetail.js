import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TicketDetail = () => {
  const { id } = useParams();
  const [ticketDetail, setTicketDetail] = useState({});
  const [filmName, setFilmName] = useState("");
  const [customerName, setCustomerName] = useState("");

  const getTicketDetail = async () => {
    try {
      const response = await axios.get(
        `https://r636qt-3000.csb.app/payment/${id}?_expand=showtimes&_expand=users`
      );
      if (response.status === 200) {
        setTicketDetail(response.data);
        setCustomerName(response.data.users.fullname);
      }
    } catch (error) {
      console.error("Error fetching ticket detail: ", error);
    }
  };

  const getFilmName = async () => {
    try {
      const response = await axios.get(
        `https://r636qt-3000.csb.app/showtimes/${ticketDetail.showtimesId}?_expand=films`
      );
      if (response.status === 200) {
        setFilmName(response.data.films.name);
      }
    } catch (error) {
      console.error("Error fetching film name: ", error);
    }
  };

  useEffect(() => {
    getTicketDetail();
  }, [id]);

  useEffect(() => {
    if (ticketDetail.showtimesId) {
      getFilmName();
    }
  }, [ticketDetail.showtimesId]);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl">Chi tiết vé đặt chỗ</div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="font-semibold text-xl">Mã vé: {ticketDetail.code}</div>
        <div className="font-semibold text-xl">Khách hàng: {customerName}</div>
        <div className="font-semibold text-xl">Tên phim: {filmName}</div>
        <div className="font-semibold text-xl">
          Số ghế: {ticketDetail.seat ? ticketDetail.seat.join(", ") : "N/A"}
        </div>
        <div className="font-semibold text-xl">
          Ngày mua: {ticketDetail.date}
        </div>
        <div className="font-semibold text-xl">
          Thức ăn:
          <ul>
            {ticketDetail.food && Array.isArray(ticketDetail.food) ? (
              ticketDetail.food.map((foodItem) => (
                <li key={foodItem.id}>{foodItem.foodname}</li>
              ))
            ) : (
              <li>Không có thông tin thức ăn</li>
            )}
          </ul>
        </div>
        <div className="font-semibold text-xl">Rạp: {ticketDetail.cinema}</div>
        <div className="font-semibold text-xl">Phòng: {ticketDetail.room}</div>
      </div>
    </div>
  );
};

export default TicketDetail;
