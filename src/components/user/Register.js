import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Context } from "../../context/Context";
const postData = async (data) => {
  const response = await axios.post("http://localhost:3004/users", {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    role: "user",
  });
  if (response.status === 200) {
  }
};
const onFinish = async (values) => {
  console.log("Success:", values);
  const data = {
    email: values.email,
    fullname: values.fullname,
    password: values.password,
    confirmpassword: values["confirm password"],
  };

  if (data.password !== data.confirmpassword) {
    alert("Nhập lại mật khẩu sai");
    return;
  }
  let checkEmail = false;
  axios
    .get("http://localhost:3004/users")
    .then((response) => {
      response.data.forEach((check) => {
        const mail = check.email;
        if (data.email === mail) {
          checkEmail = false;
        } else {
          checkEmail = true;
        }
      });
      if (checkEmail) {
        postData(values);
        alert("Tạo tài khoản thành công");
        // navigate('/login')
      } else {
        alert("Email đã tồn tại");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu GET ", error);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const App = () => {
  const { listUser } = useContext(Context);
  console.log(listUser);
  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-5">
        <h1 className="text-xl font-bold">Đăng ký </h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your Fullname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm password"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              className="bg-green-600 hover:!bg-green-700 "
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
