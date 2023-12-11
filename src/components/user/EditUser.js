import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function EditUser() {
  const [listUser, setListUser] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = localStorage.getItem("email");

  const getData = async () => {
    try {
      const response = await axios.get(`https://r636qt-3000.csb.app/users`);
      if (response.status === 200) {
        setListUser(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  const object = listUser.find((item) => item.email === isLogin);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    if (!fullname) {
      toast.warning("Bạn chưa điền tên hiển thị");
      return;
    }
    if (!email) {
      toast.warning("Bạn chưa điền Email");
      return;
    }
    if (!password) {
      toast.warning("Bạn chưa điền mật khẩu");
      return;
    }

    try {
      const response = await axios.patch(
        `https://r636qt-3000.csb.app/users/${object.id}`,
        {
          fullname: fullname,
          phone: fullname,
          password: password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("fullname", fullname);
        toast.success("Cập nhật thành công");
        getData();
      }
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
      <div className="flex justify-center items-center pt-[50px]">
        <form className="border w-[600px] p-[30px_30px_100px] flex flex-col gap-3 shadow-xl rounded-md">
          <h1 className="text-[32px] font-bold text-center my-3">
            Cập nhật thông tin cá nhân
          </h1>
          <div className="flex flex-col gap-5">
            <div className="w-full flex gap-5">
              <div className="mt-[10px] w-20">Fullname</div>
              <input
                required
                className="bg-slate-200 rounded-[4px] border h-[45px] p-3 w-full flex-1 outline-none"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-5">
              <div className="mt-[10px] w-20">Email</div>
              <input
                required
                className="bg-slate-200 rounded-[4px] border h-[45px] p-3 w-full flex-1 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-5">
              <div className="mt-[10px] w-20">Mật khẩu</div>
              <input
                required
                className="bg-slate-200 rounded-[4px] border h-[45px] p-3 w-full flex-1 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern=".{8,20}"
              />
            </div>
          </div>
          <button
            className="bg-[#3961fb] rounded-[5px] border h-[45px] w-full text-white font-bold my-3 hover:bg-blue-700"
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
