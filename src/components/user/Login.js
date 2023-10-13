import React, { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
const App = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const { listUser, setListUser } = useContext(Context);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get("http://localhost:3004/users");

    if (response.status === 200) {
      setListUser(response.data);
    }
  };
  const onFinish = (values) => {
    console.log("Finish:", values);
    const foundUser = listUser.find(user => user.email === email && user.password === password );
        console.log(foundUser);

        if (foundUser) {
            alert('Đăng nhập thành công')
            window.localStorage.setItem('fullname', foundUser.fullname);
            setState(foundUser);
            window.location.reload('/')
            
        } else {
            alert('Đăng nhập không thành công')
        }
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
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
          >
            Log in
          </Button>
          
        )}
      </Form.Item>
          <Link to={'/fogotpassword'}
            >
            Quên mật khẩu?
          </Link >
          
    </Form>
  );
};
export default App;
