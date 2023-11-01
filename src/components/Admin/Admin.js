import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { BiSolidUserCircle, BiFilm, BiTime } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";
import { GiTheater } from "react-icons/gi";
import { MdBedroomParent, MdPointOfSale } from "react-icons/md";

const Admin = () => {
  return (
    <div className="">
      <div className="bg-[#151929] h-full flex">
        <div className="bg-[#1C2438]  text-xl flex flex-col gap-2 font-semibold p-5 h-fit rounded-xl m-5 w-96">
          <div className="text-white flex justify-center font-bold">ADMIN</div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3 ">
            <BiSolidUserCircle size={24} />
            <Link to="/admin/manageuser">Quản lý user</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <BiFilm size={24} />
            <Link to="/admin/filmhome">Thiết lập phim</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <IoFastFoodSharp size={24} />
            <Link to="/admin/foodadmin">Thiết lập thực phẩm</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <GiTheater size={24} />
            <Link to="/admin/cinemaadmin">Thiết lập rạp</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <MdBedroomParent size={24} />
            <Link to="/admin/roomadmin">Thiết lập phòng chiếu</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <BiTime size={24} />
            <Link to="/admin/showtimeadmin">Thiết lập suất chiếu</Link>
          </div>
          <div className="flex gap-3 hover:cursor-pointer text-white items-center  hover:text-[#595FAA] p-3">
            <MdPointOfSale size={24} />
            <Link to="/admin/voucheradmin">Voucher</Link>
          </div>
        </div>
        <div className="m-5 bg-[#1C2438] w-full rounded-xl text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
