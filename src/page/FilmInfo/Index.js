import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {
  const { id } = useParams();

  const [listDataShowtime, setListDataShowtime] = useState([]);
  const [listDataRoom, setListDataRoom] = useState([]);
  const [listCinema, setListCinema] = useState([]);
  const [showtimeData, setShowtimeData] = useState(null);
  const [listShowTimeInCinema, setListShowTimeInCinema] = useState([]);
  const [listFilm, setListFilm] = useState([]);
  const [listFilmFind, setListFilmFind] = useState([]);

  const data = async () => {
    // API
    const responseShowtime = await axios.get(
      "http://localhost:3004/showtime?_expand=films&_expand=rooms&_expand=cinemas"
    );
    if (responseShowtime.status === 200) {
      setListDataShowtime(responseShowtime.data);
    } else {
      console.log("loi");
    }

    const responseFilms = await axios.get("http://localhost:3004/films");
    if (responseFilms.status === 200) {
      setListFilm(responseFilms.data);
    } else {
      console.log("loi");
    }

    const responseRoom = await axios.get(
      "http://localhost:3004/rooms?_expand=cinemas"
    );
    if (responseRoom.status === 200) {
      setListDataRoom(responseRoom.data);
    }

    const responseCinema = await axios.get("http://localhost:3004/cinemas");
    if (responseCinema.status === 200) {
      setListCinema(responseCinema.data);
    }
    console.log("responseCinema", responseCinema.data);

    const showtimeDataFind = await responseShowtime.data.filter(
      (item) => item.films.id == id
    );
    setShowtimeData(showtimeDataFind);

    const filmFind = await responseFilms.data.find((item) => item.id == id);
    setListFilmFind(filmFind);

    const cinemaShowtimes = new Map();

    showtimeDataFind.forEach((item) => {
      const cinemaName = item.cinemas.name;
      const showtime = item.starttime;
      const idShowtime = item.id;
      const roomId = item.roomsId;
      console.log(roomId);
      if (cinemaShowtimes.has(cinemaName)) {
        cinemaShowtimes
          .get(cinemaName)
          .push({ showtime, id: idShowtime, roomsId: roomId });
      } else {
        cinemaShowtimes.set(cinemaName, [
          { showtime, id: idShowtime, roomsId: roomId },
        ]);
      }
    });
    setListShowTimeInCinema(cinemaShowtimes);
  };

  useEffect(() => {
    data();
  }, [id, setShowtimeData]);

  return (
    <div className="flex justify-center flex-col w-full items-center">
      {listFilmFind ? (
        <div>
          <div className="flex justify-center gap-8">
            <img
              className="h-[335px] w-[225px]"
              src={listFilmFind.banner}
              alt=""
            />
            <div className="flex flex-col gap-3">
              <p className="font-bold text-lg"> {listFilmFind.name}</p>
              <p>Thời lượng: {listFilmFind.time} phút</p>
              <p>Nhà sản xuất: {listFilmFind.author}</p>
              <p>Diễn viên: {listFilmFind.main_actor}</p>
              <p>Quốc gia: {listFilmFind.coutry}</p>
              <p>Đạo diễn: {listFilmFind.director}</p>
              <p>Ngày khởi chiếu: {listFilmFind.startDay} </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1/2">
              <h1 className="text-2xl font-bold ">Nội dung phim:</h1>
              <p className="border-b-[2px] border-orange-600 w-40 my-2"></p>
            </div>
            <p className="w-1/2">{listFilmFind.description}</p>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
      <div className="flex flex-col items-center w-full">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold ">Lịch chiếu</h1>
          <p className="border-b-[2px] border-orange-600 w-28 my-2"></p>
        </div>
      </div>
      <div className="w-1/2">
        <div>
          {listShowTimeInCinema.size > 0 ? (
            Array.from(listShowTimeInCinema).map(([cinema, showtimes]) => {
              return (
                <div key={cinema}>
                  <div className="w-full bg-[#f26b38] text-white font-medium px-4 py-2">
                    {cinema}
                  </div>
                  <div className="flex gap-5 items-center my-3">
                    Xuất chiếu:
                    {showtimes?.map((item, index) => {
                      return (
                        <div>
                          <Link to={`/selectseat/${item.id}`}>
                            <div key={index}>
                              <div className="font-medium border-[1px] border-stone-400 py-1 px-4 cursor-pointer hover:border-[#f26b38] hover:text-[#f26b38]">
                                {item.showtime}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div>Phim này hiện chưa có xuất chiếu</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
