import React, { useEffect, useState } from "react";
import axios from "axios";
function EditUser() {
  const [listUser, setListUser] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = localStorage.getItem("email");

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/users`);
      if (response.status === 200) {
        setListUser(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  const object = listUser.find((item) => item.email === isLogin);

  console.log(object?.password);

  const handleUpdateAccount = async () => {
    if (!fullname) {
      alert("Bạn chưa điền tên hiển thị");
      return;
    }
    if (!email) {
      alert("Bạn chưa điền số điện thoại");
      return;
    }
    if (!password) {
      alert("Bạn chưa điền mật khẩu");
      return;
    }
    localStorage.setItem("fullname", fullname);
    alert("Cập nhật thành công");

    try {
      const response = await axios.patch(
        `http://localhost:3004/users/${object.id}`,
        {
          fullname: fullname,
          phone: fullname,
          password: password,
        }
      );
      // Xử lý response từ server nếu cần.
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (object) {
      setFullname(object.fullname);
      setEmail(object.email);
      setPassword(object.password);
    }
  }, [object]);
  console.log(object);

  return (
    <div className="EditUser">
      <div className="flex justify-center items-center pt-[50px] pb-[50px]">
        <form className="border border-[#dedede] w-[600px] p-[30px_30px_100px] flex flex-col gap-3 bg-register">
          <h1 className="text-[32px] font-bold text-center">
            Cập nhật thông tin cá nhân
          </h1>
          <div className="flex flex-col gap-5 pb-[20px]">
            <div className="w-full flex gap-5 items-center">
              <label className="w-20">Fullname</label>
              <input
                required
                className="bg-[#e8f0fe] rounded-[4px] border h-[45px] p-[10px] w-[400px] ml-[12px]"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-5">
              <label className="mt-[10px] w-20">Email</label>
              <div className="flex flex-col gap-3">
                <input
                  required
                  className="bg-[#e8f0fe] rounded-[4px] border h-[45px] p-[10px] w-[400px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex gap-5">
              <label className="mt-[10px] w-20">Mật khẩu</label>
              <div className="flex flex-col gap-3 ml-[25px]">
                <input
                  required
                  className="bg-[#e8f0fe] rounded-[4px] border h-[45px] p-[10px] w-[400px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="bg-[#3961fb] rounded-[5px] border h-[45px] w-full text-white font-bold"
            onClick={handleUpdateAccount}
          >
            Cập nhật tài khoản
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
