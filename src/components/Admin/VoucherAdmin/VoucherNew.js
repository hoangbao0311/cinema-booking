import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";
import { Link } from "react-router-dom";

const VoucherAdmin = () => {
  const [voucher, setVoucher] = useState("");
  const [price, setPrice] = useState("");

  const handleAddVoucher = async () => {
    if (!voucher || !price) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const response = await axios.post("http://localhost:3004/voucher", {
      code: voucher,
      price: parseFloat(price),
    });
    if (response.status === 201) {
      toast.success("Thêm mã thành công !");
    }
  };


  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
        <div className="text-black w-full">
          <label for="" className="font-semibold">
            Mã giảm giá:
          </label>
          <input
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
          />
        </div>
        <div className="text-black w-full">
          <label for="" className="font-semibold ">
            Số tiền:
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
          />
        </div>
        <button
          className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
          onClick={handleAddVoucher}
        >
          Thêm mã giảm giá
        </button>
      </div>
    </div>
  );
};

export default VoucherAdmin;
