import React, { useEffect, useState, useRef } from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [dataPayment, setDataPay] = useState([]);
  const [listPayment, setListPayment] = useState([]);

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

    const responsePayment = await axios.get(`http://localhost:3004/payment`);
    if (responsePayment.status === 200) {
      setListPayment(responsePayment.data);
    }

    const filterCode = await responsePayment.data.find(
      (item) => item.code == orderCodeParam
    );

    const findFilm = await axios.get(
      `http://localhost:3004/showtimes/${filterCode.showtimesId}?_expand=films`
    );

    console.log("findFilm", findFilm.data.films.name);
    console.log("filterCode", filterCode);

    await axios.patch(`http://localhost:3004/payment/${filterCode.id}`, {
      status: "paid",
    });

    await axios.post("http://localhost:3004/ticket", {
      showtimesId: filterCode?.showtime,
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
      })
      .catch((error) => {
        toast.warning("Gửi mail không thành công !");
      });
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <Result
      status="success"
      title="Đặt vé thành công"
      subTitle="Thanh toán thành công vui lòng kiểm tra email."
      extra={[<Link to="/">Về Trang Chủ</Link>]}
    />
  );
};

export default App;
