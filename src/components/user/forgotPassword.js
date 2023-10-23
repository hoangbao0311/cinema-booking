import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const form = useRef();
  const [toEmail, setToEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [getcode, setGetcode] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3004/users");
      const user = await response.data.find((user) => user.email === toEmail);

      if (user) {
        const resetCode = Math.random().toString(36).substring(7);

        user.resetpassword = resetCode;

        const emailParams = {
          toemail: toEmail,
          code: resetCode,
        };

        await emailjs.send(
          "service_hrqea6d",
          "template_s88f8ku",
          emailParams,
          "LKfTopoKtQRSRQg5i"
        );

        await axios.patch(`http://localhost:3004/users/${user.id}`, user);
        const responseCode = await axios.get(
          `http://localhost:3004/users/${user.id}`
        );
        setGetcode(responseCode.data.resetpassword);
        console.log(responseCode);
        toast.success("Mã xác nhận đã được gửi qua email!");
        startCountdown();
      } else {
        toast.warning("Email không tồn tại!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi thực hiện yêu cầu.");
    }
  };

  const startCountdown = () => {
    setDisable(true);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setDisable(false);
      setCountdown(15);
    }, 15000);
  };

  const handleConfirm = () => {
    if (getcode === confirmationCode) {
      console.log("đúng");
      setShowConfirmation(true);
    } else {
      toast.warning("Mã xác nhận không đúng!");
    }
  };

  const handleConfirmPassword = async () => {
    if (passwordNew === confirmpassword) {
      const response = await axios.get(
        `http://localhost:3004/users?email=${toEmail}`
      );
      console.log(response);
      const user = response.data[0];

      if (user) {
        user.password = passwordNew;
        await axios.patch(`http://localhost:3004/users/${user.id}`, user);
        toast.success("Mật khẩu đã được cập nhật thành công!");
        // window.localStorage.setItem("fullname", values.fullname);
        navigate("/");
      }
    } else {
      toast.warning("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
    }
  };

  return (
    <div>
      <h2>Quên mật khẩu</h2>

      <div>
        {showConfirmation == true ? (
          <div>
            <label>Nhập mật khẩu mới</label>
            <input
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
            />
            <label>Xác nhận mật khẩu mới</label>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleConfirmPassword} type="submit">
              Thay đổi mật khẩu
            </button>
          </div>
        ) : (
          <div>
            <form ref={form} onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={disable}>
                Gửi mã xác nhận {disable && `(${countdown}s)`}
              </button>
            </form>
            {getcode && (
              <div>
                <label>Nhập mã xác nhận:</label>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                />
                <button type="button" onClick={handleConfirm}>
                  Xác nhận
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;