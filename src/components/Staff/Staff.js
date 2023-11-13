import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { BiSolidComment, BiLogOut } from "react-icons/bi";
import { MdReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaFileInvoiceDollar, FaUserEdit } from "react-icons/fa";
import LoginStaff from "./LoginStaff/LoginStaff";

const Staff = () => {
  const role = localStorage.getItem("roleStaff");

  const handleLogout = () => {
    localStorage.removeItem("roleStaff");
    window.location.href = "/staff";
  };

  return (
    <div className="">
      <div className="bg-[#151929] h-full flex">
        <div className="bg-[#1C2438]  text-xl flex flex-col gap-2 font-semibold p-5 h-fit rounded-xl m-5 w-96">
          <div className="text-white flex justify-center font-bold">STAFF</div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3 ">
            <TbBrandBooking size={24} />
            <Link to="/staff/bookingManage">Quản lý đặt chỗ</Link>
          </div>
          <div className="flex gap-3 hover:cursor -pointer text-white items-center  hover:text-[#595FAA] p-3">
            <BiSolidComment size={24} />
            <Link to="/staff/commentManage">Quản lý bình luận</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <FaFileInvoiceDollar size={24} />
            <Link to="/staff/Report">Báo cáo </Link>
          </div>
          {role === "3" && (
            <div
              onClick={handleLogout}
              className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3"
            >
              <BiLogOut size={24} />
              <div>Đăng Xuất</div>
            </div>
          )}
        </div>
        <div className="m-5 bg-[#1C2438] w-full rounded-xl  text-white h-[900px]">
          {role === "3" ? <Outlet /> : <LoginStaff />}
        </div>
      </div>
    </div>
  );
};

export default Staff;
