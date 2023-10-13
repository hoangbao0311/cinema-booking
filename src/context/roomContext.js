import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext();

const Provider = Context.Provider;

function RoomContext({ children }) {
  const [numColumns, setNumColums] = useState(0);
  const [numRows, setNumRow] = useState(0);
  const [bookedSeats, setBookedSeats] = useState(0);

  return (
    <Provider
      value={{
        numColumns,
        setNumColums,
        numRows,
        setNumRow,
        bookedSeats,
        setBookedSeats,
      }}
    >
      {children}
    </Provider>
  );
}

export { Context, RoomContext };
