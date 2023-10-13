import React, { useState, createContext } from "react";
import { RoomContext } from "../../context/roomContext";

const SeatPicker = ({ numRows, numColumns, bookedSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, col) => {
    const seat = `${row}-${col}`;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatSelected = (row, col) => {
    return selectedSeats.includes(`${row}-${col}`);
  };

  const isSeatBooked = (row, col) => {
    return bookedSeats.includes(`${row}-${col}`);
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= numRows; row++) {
      const rowSeats = [];
      for (let col = 1; col <= numColumns; col++) {
        const seat = `${row}-${col}`;
        const isSelected = isSeatSelected(row, col);
        const isBooked = isSeatBooked(row, col);
        const seatClass = isSelected
          ? "bg-red-500"
          : isBooked
          ? "bg-white cursor-not-allowed"
          : "bg-green-500 cursor-pointer";
        const clickHandler = isBooked ? null : () => toggleSeat(row, col);
        rowSeats.push(
          <div
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center ${seatClass}`}
            onClick={clickHandler}
            // Thêm thuộc tính 'disabled' nếu ghế đã đặt
            disabled={isBooked}
          >
            {`${row}-${col}`}
          </div>
        );
      }
      seats.push(
        <div key={row} className="flex">
          {rowSeats}
        </div>
      );
    }
    return seats;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chọn ghế xem phim</h2>
      <div className="flex gap-5 flex-col justify-center items-center">
        <div>Màng hình</div>
        <div>{renderSeats()}</div>
      </div>
      <div className="mt-4">
        <p>Ghế đã chọn: {selectedSeats.join(", ")}</p>
      </div>
    </div>
  );
};

export default SeatPicker;
