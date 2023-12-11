import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CinemaNew = () => {
  const [nameCinema, setNameCinema] = useState(null);
  const [address, setAddress] = useState(null);

  const newCinema = async () => {
    if (nameCinema == null || address == null) {
      toast.warning("Không được để trống");
      return;
    } else {
      const response = await axios.post("https://r636qt-3000.csb.app/cinemas", {
        name: nameCinema,
        address: address,
      });
      if (response.status === 201) {
        toast.success("Tải lên thành công !");
      } else {
        console.log("Thất bại !");
      }
    }
  };

  return (
    <div>
      <div className="py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <div className="text-black font-bold">THÊM RẠP CHIẾU</div>
          <div className="mb-4"></div>
          <div className="text-black w-full">
            <label for="" className="font-semibold">
              Tên rạp:
            </label>
            <input
              onChange={(e) => setNameCinema(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
              type="text"
            />
          </div>
          <div className="text-black w-full">
            <label for="" className="font-semibold ">
              Địa chỉ:
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
              type="text"
            />
          </div>
          <div
            className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
            onClick={() => newCinema()}
          >
            UPLOAD
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaNew;
