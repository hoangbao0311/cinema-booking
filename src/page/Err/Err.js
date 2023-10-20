import React from "react";
import { Button, Result } from "antd";
const App = () => (
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
export default App;
