import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Seat from "../../components/CinemaSeat/index";
import axios from "axios";

const Index = () => {
  const { id } = useParams();
  const [listDataShowtime, setListDataShowtime] = useState([]);

  const [numRow, setNumRow] = useState([]);
  const [numCol, setNumCol] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const data = async () => {
    const responseShowtime = await axios.get(
      `http://localhost:3004/showtime/${id}?_expand=films&_expand=rooms&_expand=cinemas`
    );
    if (responseShowtime.status === 200) {
      setListDataShowtime(responseShowtime.data);
    } else {
      console.log("loi");
    }

    setNumRow(responseShowtime.data.rooms.horizon);
    setNumCol(responseShowtime.data.rooms.vertical);
    // setBookedSeats(["1-3", "2-4", "3-5"]);
  };

  useEffect(() => {
    data();
  }, [id]);

  return (
    <div>
      <Seat numRows={numRow} numColumns={numCol} bookedSeats={bookedSeats} />
    </div>
  );
};

export default Index;
