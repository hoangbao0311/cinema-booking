import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-full lg:h-[180px]">
      <div className="flex gap-5 justify-center font-bold">
        <div className=" hidden lg:flex gap-5">
          <p>TIN MỚI & KHUYÊN MÃI</p>
          <p>VÉ CỦA TÔI</p>
        </div>
        <div className="flex">
          <p>ĐĂNG NHẬP/</p>
          <p>ĐĂNG KÝ</p>
        </div>
      </div>

      <div className="bg-white text-black w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-center items-center"></div>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none focus:text-white flex w-full justify-between items-center"
          >
            <img src="/image/cgvlogo.png" alt="CGV Logo" />

            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="bg-cgv hidden lg:block"></div>

        <div className="w-[980px] mx-auto lg:relative lg:bottom-28 ">
          <div
            className={`lg:flex ${
              isOpen ? "block" : "hidden"
            } mt-4 lg:mt-0 w-full lg:justify-around `}
          >
            <ul className="lg:flex space-x-4 items-end lg:justify-between font-bold text-lg ">
              <li className="hidden lg:block ">
                <img src="/image/cgvlogo.png" alt="CGV Logo" />
              </li>
              <li>
                <p>PHIM</p>
              </li>
              <li>
                <p>RẠP CGV</p>
              </li>
              <li>
                <p>THÀNH VIÊN</p>
              </li>
              <li>
                <p>CULTUREPLEX</p>
              </li>
              <li>
                <p>TUYỂN DỤNG</p>
              </li>
              <li>
                <img src="/image/kenhcine.gif" alt="" />
              </li>
              <li>
                <img src="/image/mua-ve_ngay.png" alt="" />
              </li>
            </ul>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-center gap-2 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
