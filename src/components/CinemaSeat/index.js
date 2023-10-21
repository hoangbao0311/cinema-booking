import React, { useState, createContext, useContext } from "react";
import { Context, TicketContext } from "../../context/ticketContext";

const SeatPicker = ({ numRows, numColumns, bookedSeats }) => {
  const { selectedSeats, setSelectedSeats } = useContext(Context);

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
          ? "bg-green-500 cursor-pointer"
          : isBooked
          ? "bg-red-500 cursor-not-allowed text-white  "
          : "bg-gray-300 cursor-pointer ";
        const clickHandler = isBooked ? null : () => toggleSeat(row, col);
        rowSeats.push(
          <div
            key={seat}
            className={`w-10 h-10 m-1 flex items-center justify-center  ${seatClass}`}
            onClick={clickHandler}
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
      <div className="flex gap-5 flex-col justify-center items-center">
        <div>Màng hình</div>
        <div>{renderSeats()}</div>
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-2">
            <div className="bg-green-500 w-2 h-2" for=""></div>
            <label for="">Ghế đang chọn: </label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-red-500 w-2 h-2" for=""></div>
            <label for="">Ghế đã bán: </label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-gray-300 w-2 h-2" for=""></div>
            <label for="">Có thể chọn: </label>
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
};

export default SeatPicker;
