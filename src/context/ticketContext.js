import React, { createContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = Context.Provider;

function TicketContext({ children }) {
  const [ticketInfo, setTicketInfo] = useState({});
  const [cinemaInfo, setCinemaInfo] = useState({});

  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <Provider
      value={{
        setTicketInfo,
        ticketInfo,
        selectedSeats,
        setSelectedSeats,
        setCinemaInfo,
        cinemaInfo,
      }}
    >
      {children}
    </Provider>
  );
}

export { Context, TicketContext };
