import React, { createContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = Context.Provider;

function TicketContext({ children }) {
  const [ticketInfo, setTicketInfo] = useState({});
  const [cinemaInfo, setCinemaInfo] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [listFoodContext, setListFoodContext] = useState([]);
  const [listDataShowtime, setListDataShowtime] = useState(null);
  const [listDataRoomFind, setListDataRoomFind] = useState(null);
  const [priceShowtime, setPriceShowtime] = useState(null);
  const [amount, setAmount] = useState(null);

  return (
    <Provider
      value={{
        setTicketInfo,
        ticketInfo,
        selectedSeats,
        setSelectedSeats,
        setCinemaInfo,
        cinemaInfo,
        setListDataShowtime,
        listDataShowtime,
        setListDataRoomFind,
        listDataRoomFind,
        setPriceShowtime,
        priceShowtime,
        setListFoodContext,
        listFoodContext,
        setAmount,
        amount,
      }}
    >
      {children}
    </Provider>
  );
}

export { Context, TicketContext };
