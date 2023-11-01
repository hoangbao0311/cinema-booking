import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCinema = () => {
  const { id } = useParams();

  const [listCinema, setListCinema] = useState([]);
  const [nameCinema, setNameCinema] = useState(null);
  const [address, setAddress] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/cinemas/${id}`);
      if (response.status === 200) {
        setListCinema(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  const handleUpdate = async () => {
    const response = await axios.patch(`http://localhost:3004/cinemas/${id}`, {
      name: nameCinema,
      address: address,
    });
    if (response.status === 200) {
      toast.success("Tải lên thành công !");
    } else {
      console.log("Thất bại !");
    }
  };

  useEffect(() => {
    setNameCinema(listCinema ? listCinema.name : "");
    setAddress(listCinema ? listCinema.address : "");
  }, [listCinema]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <div className="text-black font-bold">SỬA THÔNG TIN RẠP CHIẾU</div>
          <div className="mb-4"></div>
          <div className="text-black w-full">
            <label for="" className="font-semibold">
              Tên rạp:
            </label>
            <input
              onChange={(e) => setNameCinema(e.target.value)}
              className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
              type="text"
              defaultValue={listCinema?.name}
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
              defaultValue={listCinema?.address}
            />
          </div>
          <div
            className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
            onClick={() => handleUpdate()}
          >
            UPLOAD
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCinema;
