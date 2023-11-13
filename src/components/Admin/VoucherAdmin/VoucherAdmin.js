import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SearchAdmin from "../search.js/SearchAdmin";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";

const VoucherAdmin = () => {
  const [showVoucher, setShowVoucher] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [defaultVoucher, setDefaultVoucher] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const getDataVoucher = async () => {
    const response = await axios.get("http://localhost:3004/voucher");
    if (response.status === 200) {
      setShowVoucher(response.data);
      setDefaultVoucher(response.data);
      setMaxPage(Math.ceil(response.data.length / itemsPerPage));
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
    setMaxPage(Math.ceil(filteredVouchers.length / itemsPerPage));
  };

  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedVouchers = showVoucher.slice(firstItem, lastItem);

  useEffect(() => {
    getDataVoucher();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập Voucher</div>
        <SearchAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
          <Link to="/admin/vouchernew">Thêm phòng voucher mới</Link>
        </div>
      </div>
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">Mã Voucher</th>
            <th className="p-2 border">Số tiền</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {displayedVouchers.map((item) => (
            <tr key={item.id}>
              <th className="p-2 border font-semibold text-xl">{item.code}</th>
              <th className="p-2 border font-semibold text-xl">{item.price}</th>
              <th className="p-2 border">
                <button
                  className="hover:bg-red-900 bg-red-700 px-3 rounded-lg hover:cursor-pointer font-semibold"
                  onClick={() => handleDeleteVoucher(item.id)}
                >
                  Xóa
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={showVoucher.length}
        currentPage={currentPage}
        onPageChange={(newpage) => setCurrentPage(newpage)}
      />
    </div>
  );
};

export default VoucherAdmin;
