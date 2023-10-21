import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MyContext } from "./context/Context";
import { RoomContext } from "./context/roomContext";
import { TicketContext } from "./context/ticketContext";
import { AppSearch } from "./context/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MyContext>
      <RoomContext>
        <TicketContext>
          <AppSearch>
            <App />
          </AppSearch>
        </TicketContext>
      </RoomContext>
    </MyContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
