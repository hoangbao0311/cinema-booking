import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginStaff = () => {
  const email = "";
  const password = "";
  const [useEmail, setEmail] = useState("");
  const [usePassword, setPassword] = useState("");

  const submitHanlde = () => {
    let isLoggedIn = false;

    axios
      .get("http://localhost:3004/users")
      .then((response) => {
        const data = response.data;
        data.forEach((user) => {
          const email = user.email;
          const password = user.password;
          const role = user.rolesId;

          if (email === useEmail && password === usePassword && role === 3) {
            isLoggedIn = true;
            localStorage.setItem("roleStaff", role);
          }
        });

        if (isLoggedIn) {
          toast.success("Đăng nhập thành công");
          window.location.href = "/staff/bookingManage";
        } else {
          toast.error("Đăng nhập không thành công - Sai email hoặc mật khẩu");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET:", error);
      });
  };

  return (
    <div className="flex justify-center text-black h-screen">
      <div className=" bg-white  rounded-3xl w-[484px] flex flex-col items-center justify-center h-fit py-7 pb-9 mt-7 gap-4">
        <div>
          <img
            src={`https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fgalaxy-logo-mobile.074abeac.png&w=128&q=75`}
            alt="CGV Logo"
          />
        </div>
        <div>
          <h1 className="text-[32px] px-4 text-center font-semibold">
            Đăng Nhập Staff
          </h1>
        </div>
        <div>
          <div>Email</div>
          <input
            value={useEmail}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 w-72 py-2 min-h-[48px] rounded-2xl outline-none border-[1px] border-solid border-[#cdcdcd] shadow-sm"
            type="text"
            placeholder="Email"
          />
        </div>
        <div>
          <div>Mật khẩu</div>
          <input
            value={usePassword}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 w-72 py-2 min-h-[48px] rounded-2xl outline-none border-[1px] border-solid border-[#cdcdcd] shadow-sm"
            type="password"
            placeholder="Mật khẩu"
          />
        </div>
        <div>
          <button
            className="w-60 h-10 bg-[#0C713D] text-white border-[#0C713D] border-[1px] rounded-3xl font-bold mt-4 hover:opacity-95"
            type="submit"
            onClick={submitHanlde}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginStaff;
