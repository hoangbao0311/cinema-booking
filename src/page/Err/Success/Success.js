import React, { useEffect, useState, useRef } from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [dataPayment, setDataPay] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useRef();
  const [toEmail, setToEmail] = useState("");

  const url = new URL(window.location.href);
  const orderCodeParam = url.searchParams.get("orderCode");
  const data = async () => {
    const emailLogin = await localStorage.getItem("email");

    const response = await axios.get(
      `https://api-merchant.payos.vn/v2/payment-requests/${orderCodeParam}`,
      {
        headers: {
          "x-api-key": "cd5b20e8-b9b9-4c85-9a61-a62729706232",
          "x-client-id": "d3d246ca-373e-4a1c-b076-11c7860223f1",
        },
      }
    );
    if (response.status === 200) {
      setDataPay(response.data);
      console.log(response.data.data);
    } else {
      console.log("Lỗi khi gửi yêu cầu.");
    }

    const responsePayment = await axios.get(
      `https://r636qt-3000.csb.app/payment?code=${orderCodeParam}`
    );
    if (responsePayment.status === 200) {
      setListPayment(responsePayment.data);
    }

    const filterCode = await responsePayment.data[0];

    const idShowtime = await filterCode.showtimesId;

    const findFilm = await axios.get(
      `https://r636qt-3000.csb.app/showtimes/${idShowtime}?_expand=films`
    );

    await axios.patch(`https://r636qt-3000.csb.app/payment/${filterCode.id}`, {
      status: "paid",
    });

    await axios.post("https://r636qt-3000.csb.app/tickets", {
      showtimesId: idShowtime,
      usersId: 1,
      code: +orderCodeParam,
      seat: filterCode?.seat,
    });
    const food = filterCode.food?.map((item) => {
      return `${item.foodname} - (${item.quantity})`;
    });

    const listFoodEmail = food.join("\n ");

    const emailParams = {
      toemail: emailLogin,
      codeTicket: filterCode?.code,
      movie: findFilm?.data.films.name,
      startTime: filterCode?.starttime,
      day: filterCode?.date,
      seat: filterCode?.seat,
      cinema: filterCode?.cinema,
      food: listFoodEmail,
    };

    emailjs
      .send(
        "service_lh3hv83",
        "template_rrt2tnf",
        emailParams,
        "LKfTopoKtQRSRQg5i"
      )
      .then((result) => {
        toast.success("Gửi mail thành công !");
        setLoading(true);
      })
      .catch((error) => {
        toast.warning("Gửi mail không thành công !");
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Result
          status="success"
          title="Đặt vé thành công"
          subTitle="Thanh toán thành công vui lòng kiểm tra email."
          extra={[<Link to="/">Về Trang Chủ</Link>]}
        />
      ) : (
        <div className="flex justify-center items-center text-5xl font-bold">
          <div className="flex items-center justify-center h-screen">
            <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-16 w-16"></div>
            <p className="ml-2 text-gray-700">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
