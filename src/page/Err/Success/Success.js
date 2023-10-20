import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const App = () => (
  <Result
    status="success"
    title="Successfully"
    subTitle="Thanh toán thành công."
    extra={[<Link to="/">về Trang Chủ</Link>]}
  />
);
export default App;
