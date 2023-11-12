import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context, TicketContext } from "../../context/ticketContext";
import ReactStar from "react-rating-star-with-type";
import { toast } from "react-toastify";
import { AiOutlineStar } from "react-icons/ai";

const Index = () => {
  const [star, setStar] = useState(5);

  const handleOnChangeStar = (nextValue) => {
    setStar(nextValue);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const { setTicketInfo, setCinemaInfo } = useContext(Context);

  const [listDataShowtime, setListDataShowtime] = useState([]);
  const [listDataRoom, setListDataRoom] = useState([]);
  const [listCinema, setListCinema] = useState([]);
  const [showtimeData, setShowtimeData] = useState(null);
  const [listShowTimeInCinema, setListShowTimeInCinema] = useState([]);
  const [listFilm, setListFilm] = useState([]);
  const [listFilmFind, setListFilmFind] = useState([]);
  const [comment, setComment] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2023-11-01");
  const [options, setOptions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [dataComent, setDataComent] = useState([]);
  const [login, setLogin] = useState(true);
  const [starFilm, setStarFlim] = useState(5);
  const data = async () => {
    // API
    const responseShowtime = await axios.get(
      "http://localhost:3004/showtimes?_expand=films&_expand=rooms&_expand=cinemas"
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

    const showtimeDataFind = await responseShowtime.data.filter(
      (item) => item.films.id == id
    );
    setShowtimeData(showtimeDataFind);

    const showtimeDate = await responseShowtime.data.filter(
      (item) => selectedDate == item.date && item.films.id == id
    );

    const filmFind = await responseFilms.data.find((item) => item.id == id);
    setListFilmFind(filmFind);

    const cinemaShowtimes = new Map();

    showtimeDate.forEach((item) => {
      const cinemaName = item.cinemas.name;
      const showtime = item.starttime;
      const idShowtime = item.id;
      const roomId = item.roomsId;
      const date = item.date;

      if (cinemaShowtimes.has(cinemaName)) {
        cinemaShowtimes
          .get(cinemaName)
          .push({ showtime, id: idShowtime, roomsId: roomId, date: date });
      } else {
        cinemaShowtimes.set(cinemaName, [
          { showtime, id: idShowtime, roomsId: roomId, date: date },
        ]);
      }
    });
    setListShowTimeInCinema(cinemaShowtimes);
    console.log(cinemaShowtimes);
  };

  const handleItemClick = async (item, cinema, id) => {
    await setTicketInfo(item);
    await setCinemaInfo(cinema);
    navigate(`/selectseat/${id}`);
  };

  useEffect(() => {
    data();
    getCurrentDate();
  }, [id, setShowtimeData, selectedDate]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const currentDate = new Date();
    const options = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      options.push({
        value: nextDate.toISOString().split("T")[0],
        label: nextDate.toISOString().split("T")[0],
      });
    }

    setOptions(options);
    setSelectedDate(options[0].value);
  }, []);

  // Comments

  const getUserId = async () => {
    const email = localStorage.getItem("email");

    if (email) {
      const responseUsers = await axios.get(
        `http://localhost:3004/users?email=${email}`
      );
      if (responseUsers.status === 200) {
        setUserId(responseUsers.data[0].id);
      }
    } else {
      setLogin(false);
    }
  };

  const handleComment = async () => {
    if (comment === null) {
      toast.warning("Không được để trống bình luận");
      return;
    }
    const response = await axios.post("http://localhost:3004/comments", {
      body: comment,
      filmsId: +id,
      star: +star,
      date: getCurrentDate(),
      usersId: userId,
    });
    if (response.status === 201) {
      toast.success("Bình luận thành công !");
    } else {
      console.log("Thất bại !");
    }
    handleViewComent();
  };

  useEffect(() => {
    getUserId();
    handleViewComent();
  }, []);

  const handleViewComent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3004/comments?filmsId=${id}&_expand=users`
      );
      if (response.status === 200) {
        setDataComent(response.data);
        const a = response.data.reduce((total, item) => {
          return total + item.star;
        }, 0);
        let totalStar = 0;

        totalStar = a / response.data.length;
        setStarFlim(+totalStar.toFixed(1));
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu :", error);
    }
  };

  // Login

  const email = localStorage.getItem("email");

  return (
    <div className="flex justify-center flex-col w-full items-center">
      {listFilmFind ? (
        <div>
          <div className="flex flex-col justify-center items-center gap-8">
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
                {starFilm < 5 && (
                  <div className="flex items-center gap-3">
                    <ReactStar
                      value={starFilm}
                      isEdit={false}
                      activeColors={[
                        "red",
                        "orange",
                        "#FFCE00",
                        "#9177FF",
                        "green",
                      ]}
                    />{" "}
                    <div className="font-semibold flex items-center gap-1">
                      {starFilm} <AiOutlineStar />
                    </div>
                  </div>
                )}
                <div>
                  {starFilm == 5 && (
                    <div className="flex items-center gap-3">
                      <ReactStar
                        value={5}
                        isEdit={false}
                        activeColors={[
                          "red",
                          "orange",
                          "#FFCE00",
                          "#9177FF",
                          "green",
                        ]}
                      />{" "}
                      <div className="font-semibold flex items-center gap-1">
                        {5} <AiOutlineStar />
                      </div>
                    </div>
                  )}
                </div>
                {!starFilm && (
                  <div className="flex items-center gap-3">
                    <ReactStar
                      value={5}
                      isEdit={false}
                      activeColors={[
                        "red",
                        "orange",
                        "#FFCE00",
                        "#9177FF",
                        "green",
                      ]}
                    />{" "}
                    <div className="font-semibold flex items-center gap-1">
                      {5} <AiOutlineStar />
                    </div>
                  </div>
                )}
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
        </div>
      ) : (
        <div>loading...</div>
      )}
      <div className="flex flex-col items-center w-full pt-8">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold ">Lịch chiếu</h1>
          <p className="border-b-[2px] border-orange-600 w-28 my-2"></p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex items-center gap-5 my-3">
          <label className="block font-semibold mb-2">Chọn ngày chiếu:</label>
          <select
            value={selectedDate}
            className="border rounded-md p-2 focus:outline-none"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {options.map((option) => (
              <option className="py-1" key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          {email ? (
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
                            <div key={index}>
                              <Link
                                onClick={() =>
                                  handleItemClick(item, cinema, item.id)
                                }
                              >
                                <div key={index}>
                                  <div className="font-medium border-[1px] border-stone-400 py-1 px-4 cursor-pointer hover:border-[#f26b38] hover:text-[#f26b38]">
                                    {item.showtime}
                                    {console.log(item)}
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
                <div>Hiện chưa có xuất chiếu ở thời gian này</div>
              )}
            </div>
          ) : (
            <div className="font-semibold text-lg py-2">
              Đăng nhập để chọn vé
            </div>
          )}
        </div>
        <div className="w-full border-t border-black my-2">
          <div className="font-bold text-xl pt-4">
            Xếp hạng và đánh giá phim
          </div>
          <div className="flex w-full items-center gap-3 py-8">
            <div>
              <ReactStar
                onChange={(value) => handleOnChangeStar(value)}
                value={star}
                isEdit={true}
                activeColors={[
                  "red",
                  "orange",
                  "#FFCE00",
                  "#9177FF",
                  "#8568FC",
                ]}
              />
            </div>
            <div className="flex-1">
              <input
                onChange={(e) => setComment(e.target.value)}
                className="outline-none h-10 text-xl border w-full p-2"
                type="text"
                placeholder="Viết đánh giá của bạn tại đây"
              />
            </div>
            {login ? (
              <div>
                <div
                  onClick={() => handleComment()}
                  className="text-white bg-black px-4 py-2 cursor-pointer"
                >
                  Bình luận
                </div>
              </div>
            ) : (
              <div>
                <div className="text-white bg-black px-4 py-2">
                  Đăng nhập để bình luận
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-4"></div>
        <div>
          {dataComent && (
            <div className="flex flex-col gap-3 ">
              {dataComent?.map((item, index) => {
                return (
                  <div key={index} className="border-b py-5 border-black">
                    <div className="flex items-center gap-5 py-2">
                      <div className="font-semibold">
                        {item?.users.fullname}
                      </div>
                      <div>
                        <ReactStar
                          value={item.star}
                          isEdit={false}
                          activeColors={[
                            "red",
                            "orange",
                            "#FFCE00",
                            "#9177FF",
                            "green",
                          ]}
                        />
                      </div>
                    </div>
                    <div>{item?.body}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
