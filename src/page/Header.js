import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Modal } from "antd";
import Login from "../components/user/Login";
import { useNavigate } from "react-router-dom";
import Search from "../components/search/Search";
import {
  InfoCircleOutlined,
  InfoOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userLogin = localStorage.getItem("fullname");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const modalFooter = [];

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("fullname");
    window.localStorage.removeItem("email");

    navigate("/");
  };

  return (
    <div>
      <>
        <Modal
          title="LOGIN "
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={modalFooter}
        >
          <Login />
        </Modal>
      </>
      <div className="h-full py-7 bg-[#FFFFFF]">
        <div className="bg-white text-black w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex justify-center items-center"></div>

            <button
              onClick={toggleMenu}
              className="lg:hidden text-white focus:outline-none focus:text-white flex w-full justify-between items-center"
            >
              <img
                src={`https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fgalaxy-logo-mobile.074abeac.png&w=128&q=75`}
                alt="CGV Logo"
              />

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

          <div className="w-full mx-auto lg:bottom-28">
            <div
              className={`lg:flex ${
                isOpen ? "block" : "hidden"
              } mt-4 lg:mt-0 w-full lg:justify-center gap-4 items-center `}
            >
              <ul className="lg:flex space-x-4 lg:justify-center gap-4 items-center font-semibold text-lg w-full">
                <li className="hidden lg:block ">
                  <Link to="/">
                    <img
                      src={`https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fgalaxy-logo-mobile.074abeac.png&w=128&q=75`}
                      alt="CGV Logo"
                    />
                  </Link>
                </li>
                <li>
                  <p>PHIM</p>
                </li>
                <li>
                  <p>GÓC ĐIỆN ẢNH</p>
                </li>
                <li>
                  <p>SỰ KIỆN</p>
                </li>
                <li>
                  <p>RẠP</p>
                </li>
                <li>
                  <p>TUYỂN DỤNG</p>
                </li>
                <li>
                  <Search />
                </li>
                <li>
                  <div class="group relative">
                    <button
                      class="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 px-6"
                      type=""
                    >
                      <UserOutlined />
                    </button>
                    <div class="hidden absolute z-10 -ml-2 w-60 space-y-2 bg-white text-gray-700 border rounded-md group-hover:block">
                      {userLogin ? (
                        <div className="flex gap-5 flex-col justify-center items-center w-full ">
                          <div className="flex justify-start px-5 gap-5 p-2 items-center w-full">
                            <InfoOutlined />
                            <div>{userLogin}</div>
                          </div>
                          <div className="flex justify-start px-5 gap-5 p-2 items-center w-full">
                            <InfoCircleOutlined />
                            <Link to={"/editUser"}>Tài khoản </Link>
                          </div>
                          <button
                            className="text-black w-full flex justify-start px-5 gap-5 p-2 items-center"
                            onClick={handleLogout}
                          >
                            <LogoutOutlined />
                            Đăng xuất
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 flex-col justify-center items-center">
                          <h1 onClick={showModal} className="cursor-pointer">
                            ĐĂNG NHẬP
                          </h1>
                          <Link to="/register">ĐĂNG KÝ</Link>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col lg:flex-row justify-center items-center lg:items-center gap-2 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
