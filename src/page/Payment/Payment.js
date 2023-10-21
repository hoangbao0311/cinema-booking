import React, { useContext, useState } from "react";
import { Context, TicketContext } from "../../context/ticketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectFilm from "../../components/SelectFilm/SelectFilm";
import { Button, Form, Input, InputNumber } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const CryptoJS = require("crypto-js");

const Payment = () => {
  const navigate = useNavigate();
  const codeRand = Math.floor(Math.random() * 100000000);

  const { ticketInfo, selectedSeats, cinemaInfo } = useContext(Context);
  const [dataPay, setDataPay] = useState();

  const payOs = {
    orderCode: codeRand,
    amount: 1000,
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

  // In ra đối tượng payOs đã được ký
  console.log(payOs);

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

  const handleBuy = () => {
    if (payOs.signature) {
      sendPaymentRequest();
    } else {
      console.error("Chữ ký chưa được tạo.");
    }
  };

  console.log(dataPay);
  if (dataPay) {
    window.location.href = dataPay.data.checkoutUrl;
  }
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="flex justify-center">
      <div className="">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button className="bg-orange-500" type="primary" htmlType="submit">
              <button onClick={() => handleBuy()}>Thanh toán</button>
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="">
        <SelectFilm />
      </div>
    </div>
  );
};

export default Payment;
