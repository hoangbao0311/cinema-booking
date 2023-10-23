import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import axios from "axios";

const App = () => {
  const [dataPayment, setDataPay] = useState([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const orderCodeParam = url.searchParams.get("orderCode");

    const sendPaymentRequest = async () => {
      try {
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
          console.log(response.data);
        } else {
          console.log("Lỗi khi gửi yêu cầu.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    };

    sendPaymentRequest(); // Gọi hàm sendPaymentRequest để thực hiện cuộc gọi API.
  }, []);
  return (
    <Result
      status="warning"
      title="Thanh toán không thành công !"
      extra={
        <Button type="primary" key="console">
          Go Console
        </Button>
      }
    />
  );
};

export default App;
