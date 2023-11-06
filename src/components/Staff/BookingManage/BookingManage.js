import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchStaff from "../SearchStaff/SearchStaff";
import Pagination from "../../Pagination/Pagination";
import { toast } from "react-toastify";

const BookingManage = () => {
  const [ticketData, setTicketData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  const getTicketData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3004/payment?_expand=showtimes&_expand=users"
      );
      if (response.status === 200) {
        const ticketData = response.data;
        const showtimesIds = ticketData.map((ticket) => ticket.showtimesId);

        const showtimesResponse = await axios.get(
          `http://localhost:3004/showtimes?id=${showtimesIds.join(
            "&id="
          )}&_expand=films`
        );

        if (showtimesResponse.status === 200) {
          const showtimesData = showtimesResponse.data;
          const filmNameMap = {};

          showtimesData.forEach((showtime) => {
            filmNameMap[showtime.id] = showtime.films.name;
          });

          const updatedTicketData = ticketData.map((ticket) => ({
            ...ticket,
            filmName: filmNameMap[ticket.showtimesId],
          }));

          setTicketData(updatedTicketData);
          setMaxPage(Math.ceil(updatedTicketData.length / itemsPerPage));
          if (searchTerm) {
            handleSearch();
          } else {
            setSearchResults(updatedTicketData);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching ticket data: ", error);
    }
  };

  const handleSearch = () => {
    const searchTermIsNumber = !isNaN(searchTerm);
  
    const filteredResults = ticketData.filter((ticket) => {
      const searchString =
        ticket.users.fullname.toLowerCase() +
        ticket.filmName.toLowerCase() +
        (String(ticket.code) || "").toLowerCase() +
        ticket.seat.join(", ").toLowerCase() +
        ticket.date.toLowerCase();
  
      const ticketCode = parseFloat(ticket.code);
  
      return (
        searchString.includes(searchTerm.toLowerCase()) ||
        (searchTermIsNumber && ticketCode === parseFloat(searchTerm)) || // Tìm kiếm theo số
        ticket.users.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.date.includes(searchTerm)
      );
    });
  
    setMaxPage(Math.ceil(filteredResults.length / itemsPerPage));
    setSearchResults(filteredResults);
    setCurrentPage(1);
  };
  

  const firstItem = startIndex;
  const lastItem = startIndex + itemsPerPage;
  const currentItems = searchResults.slice(firstItem, lastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
      setStartIndex((newPage - 1) * itemsPerPage);
    }
  };

  useEffect(() => {
    getTicketData();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl">Quản lý đặt chỗ</div>
        <SearchStaff
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div></div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          <div className="flex-1">STT</div>
          <div className="flex-1 font-semibold text-xl">Mã vé</div>
          <div className="flex-1 font-semibold text-xl">Khách hàng</div>
          <div className="flex-1 font-semibold text-xl">Tên phim</div>
          <div className="flex-1 font-semibold text-xl">Số ghế</div>
          <div className="flex-1 font-semibold text-xl">Ngày mua</div>
          <div className="flex-1 font-semibold text-xl"></div>
        </div>
        {currentItems.map((ticket, index) => (
          <div className="flex items-center gap-5" key={ticket.id}>
            <div className="flex-1">{index + 1 + startIndex}</div>
            <div className="flex-1 font-semibold text-xl">{ticket.code}</div>
            <div className="flex-1 font-semibold text-xl">
              {ticket.users.fullname}
            </div>
            <div className="flex-1 font-semibold text-xl">
              {ticket.filmName}
            </div>
            <div className="flex-1 font-semibold text-xl">
              {ticket.seat.join(", ")}
            </div>
            <div className="flex-1 font-semibold text-xl">{ticket.date}</div>
            <Link
              to={`/staff/ticketDetail/${ticket.id}`}
              className="flex-1 font-semibold text-xl"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={searchResults.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookingManage;
