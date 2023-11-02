import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";
import { Link } from "react-router-dom";

const VoucherAdmin = () => {
  const [showVoucher, setShowVoucher] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultVoucher, setDefaultVoucher] = useState([]);

  const getDataVoucher = async () => {
    const response = await axios.get("http://localhost:3004/voucher");
    if (response.status === 200) {
      setShowVoucher(response.data);
      setDefaultVoucher(response.data);
    }
  };

  const handleDeleteVoucher = async (id) => {
    const response = await axios.delete(`http://localhost:3004/voucher/${id}`);
    if (response.status === 200) {
      toast.success("Xóa mã thành công !");
      getDataVoucher();
    }
  };

  const handleSearch = () => {
    const filteredVouchers = defaultVoucher.filter((voucher) => {
      const searchString = voucher.code.toLowerCase() + voucher.price;
      return searchString.includes(searchTerm.toLowerCase());
    });
    setShowVoucher(filteredVouchers);
  };

  useEffect(() => {
    getDataVoucher();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập phòng chiếu</div>
        <SearchAdmin
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
        <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
          <Link to="/admin/vouchernew">Thêm phòng voucher mới</Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {showVoucher.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <div>
            {showVoucher.map((item) => (
              <div key={item.id} className="flex items-center gap-5">
                <div className="flex-1 font-semibold text-xl">
                  Mã Voucher: {item.code}
                </div>
                <div className="flex-1 font-semibold text-xl">
                  Số tiền: {item.price}
                </div>
                <button
                  className="hover:bg-red-900 bg-red-700 px-3 rounded-lg hover:cursor-pointer font-semibold"
                  onClick={() => handleDeleteVoucher(item.id)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherAdmin;
