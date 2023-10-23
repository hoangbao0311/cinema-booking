import React, { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Checkbox } from "antd";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const App = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);
  const { listUser, setListUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, setState } = useContext(Context);
  console.log(email);
  const onFinish = (values) => {
    console.log("Finish:", values);
    const foundUser = listUser.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      window.localStorage.setItem("fullname", foundUser.fullname);
      window.localStorage.setItem("email", email);
      toast.success("Đăng nhập thành công !");
      window.location.href = "/";
      setState(foundUser);
    } else {
      toast.warning("Đăng nhập không thành công !");
    }
  };

  return (
    <div className="flex flex-col">
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
        className="flex flex-col gap-5 items-center"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          className="w-full"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
              className="w-full px-5 bg-blue-600 hover:!bg-blue-700"
            >
              Log in
            </Button>
          )}
        </Form.Item>
        <Link to={"/forgotpassword"}>Quên mật khẩu?</Link>
      </Form>
    </div>
  );
};
export default App;
