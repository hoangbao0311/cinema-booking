import React, { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [originalBookings, setOriginalBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const fetchBookings = async () => {
    const response = await axios.get("http://localhost:3004/payment");
    if (response.status === 200) {
      const data = response.data;
      setOriginalBookings(data);
      setBookings(data);
    }
  };

  const handleShowReport = () => {
    if (fromDate && toDate) {
      const filteredBookings = originalBookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return (
          bookingDate >= new Date(fromDate) && bookingDate <= new Date(toDate)
        );
      });

      const revenue = filteredBookings.reduce((total, booking) => {
        return total + booking.amount;
      }, 0);

      setTotalRevenue(revenue);
      setBookings(filteredBookings);
      setShowReport(true);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Trang báo cáo</h1>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-inherit"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-inherit"
        />
        <button
          onClick={handleShowReport}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Xem báo cáo
        </button>
      </div>
      {showReport && (
        <>
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border">Mã vé</th>
                <th className="p-2 border">Tên rạp</th>
                <th className="p-2 border">Ngày</th>
                <th className="p-2 border">Số ghế</th>
                <th className="p-2 border">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="p-2 border">{booking.code}</td>
                  <td className="p-2 border">{booking.cinema}</td>
                  <td className="p-2 border">{booking.date}</td>
                  <td className="p-2 border">{booking.seat.join(", ")}</td>
                  <td className="p-2 border">{booking.amount} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <strong>Tổng doanh thu:</strong> {totalRevenue} VND
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
