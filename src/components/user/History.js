import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [dataPatment, setDataPayment] = useState([]);

  const email = localStorage.getItem("email");

  const getPayment = async () => {
    const responseUser = await axios.get(
      `http://localhost:3004/users?email=${email}`
    );

    if (responseUser.status === 200) {
      const responsePayment = await axios.get(
        `http://localhost:3004/payment?usersId=${responseUser.data[0].id}&_expand=showtimes&_expand=films`
      );
      if (responsePayment.status === 200) {
        setDataPayment(responsePayment.data);
      }
      console.log(responseUser.data);
      console.log(responsePayment.data);
    }
  };

  useEffect(() => {
    getPayment();
  }, []);
  console.log(dataPatment);
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col gap-5 p-8">
        {dataPatment.length > 0 ? (
          <div>
            {dataPatment?.reverse().map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex items-center bg-white shadow-xl gap-5 p-5 rounded-xl">
                    <img
                      className="rounded-xl h-16"
                      src={item.films.banner}
                      alt=""
                    />
                    <div className="flex gap-5 flex-1 items-center">
                      <div className="text-lg font-semibold">
                        {item.films.name}
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="font-semibold">{item.cinema}</div>
                      </div>{" "}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div className="font-semibold">{item.showtimes.date}</div>
                    </div>
                    <div className="text-[#F58020] font-semibold text-lg">
                      {parseFloat(item.amount).toLocaleString("vi-VN")} Đ
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-screen">Bạn chưa đặt vé</div>
        )}
      </div>
    </div>
  );
};

export default History;
