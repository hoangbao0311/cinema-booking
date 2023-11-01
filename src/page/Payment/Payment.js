import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/ticketContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SelectFilm from "../../components/SelectFilm/SelectFilm";
import { toast } from "react-toastify";

const CryptoJS = require("crypto-js");

const Payment = () => {
  const navigate = useNavigate();
  const codeRand = Math.floor(Math.random() * 100000000);

  const email = localStorage.getItem("email");
  console.log("email", email);

  const {
    ticketInfo,
    selectedSeats,
    cinemaInfo,
    listDataShowtime,
    listDataRoomFind,
    priceShowtime,
    listFoodContext,
    amount,
  } = useContext(Context);

  const [dataPay, setDataPay] = useState();

  const payOs = {
    orderCode: codeRand,
    amount: amount,
    description: "VQRIO123",
    cancelUrl: "http://localhost:3000/err",
    returnUrl: "http://localhost:3000/success",
    signature: null,
  };

  // Chọn checksum key từ Kênh thanh toán
  const checksumKey =
    "25efdca1ce1374d65040f64615b88f63bb46617473d30dbb9366a507a206112e";

  function createSignature(data, key) {
    // Tạo một đối tượng mới với các trường dữ liệu đã sắp xếp theo thứ tự alphabet
    const sortedData = {
      amount: data.amount,
      cancelUrl: data.cancelUrl,
      description: data.description,
      orderCode: data.orderCode,
      returnUrl: data.returnUrl,
    };

    // Tạo chuỗi dữ liệu theo định dạng: amount=$amount&cancelUrl=$cancelUrl&...
    const dataString = Object.entries(sortedData)
      .map(([field, value]) => `${field}=${value}`)
      .join("&");

    // Tạo chữ ký HMAC_SHA256
    const signature = CryptoJS.HmacSHA256(dataString, key).toString();
    return signature;
  }

  // Tạo chữ ký cho đối tượng payOs
  payOs.signature = createSignature(payOs, checksumKey);

  const sendPaymentRequest = async () => {
    try {
      const response = await axios.post(
        "https://api-merchant.payos.vn/v2/payment-requests",
        payOs,
        {
          headers: {
            "x-api-key": "cd5b20e8-b9b9-4c85-9a61-a62729706232",
            "x-client-id": "d3d246ca-373e-4a1c-b076-11c7860223f1",
          },
        }
      );
      if (response.status === 200) {
        setDataPay(response.data);
        console.log(response.data);
      } else {
        console.log("Lỗi khi gửi yêu cầu thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu thanh toán:", error);
    }
  };

  const handleBuy = async () => {
    const response = await axios.post("http://localhost:3004/payment", {
      amount: amount,
      code: codeRand,
      cinema: cinemaInfo,
      room: listDataRoomFind?.nameRoom,
      starttime: ticketInfo?.showtime,
      date: ticketInfo?.date,
      seat: selectedSeats,
      food: listFoodContext,
      showtime: ticketInfo?.id,
      status: "unpaid",
    });
    if (response.status === 201) {
      console.log("Thành công !");
    } else {
      console.log("Thất bại !");
    }

    if (payOs.signature) {
      sendPaymentRequest();
    } else {
      console.error("Chữ ký chưa được tạo.");
    }
  };

  console.log("dataPay", dataPay);

  if (dataPay) {
    window.location.href = dataPay.data.checkoutUrl;
  }

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-xl">Nhập mã khuyến mãi</h1>
          <div className="flex gap-2">
            <input
              className="outline-none border border-orange-500 p-2 rounded-xl"
              type="text"
              name=""
            />
            <div className="bg-[#F58020] rounded-xl text-white font-bold text-center hover:bg-[#e8933f] px-10 py-2 hover:cursor-pointer">
              Áp dụng
            </div>
          </div>
        </div>
        <h1 className="font-semibold text-xl">Chọn phương thức thanh toán</h1>
        <div className="flex gap-5">
          <input type="radio" checked />
          <img
            className="h-10"
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
      </div>
      <div className="">
        <SelectFilm />
        <div className="flex gap-2">
          <Link
            onClick={handleGoBack}
            className=" rounded-xl text-[#F58020] font-bold text-center px-10 py-2"
          >
            Quay lại
          </Link>
          {email ? (
            <button
              onClick={() => handleBuy()}
              className="bg-[#F58020] rounded-xl text-white font-bold text-center hover:bg-[#e8933f] px-10 py-2"
            >
              Thanh toán
            </button>
          ) : (
            <button className="bg-[#F58020] rounded-xl text-white font-bold text-center hover:bg-[#e8933f] px-10 py-2">
              Đăng nhập để thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
