import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRoom = () => {
  const { id } = useParams();

  const [listRoom, setListRoom] = useState([]);
  const [nameRoom, setNameRoom] = useState(null);
  const [horizon, setHorizon] = useState(null);
  const [vertical, setVertical] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/rooms/${id}`);
      if (response.status === 200) {
        setListRoom(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  const handleUpdate = async () => {
    const response = await axios.patch(`http://localhost:3004/rooms/${id}`, {
      nameRoom: nameRoom,
      horizon: horizon,
      vertical: vertical,
    });
    if (response.status === 200) {
      toast.success("Tải lên thành công !");
      getData();
    } else {
      console.log("Thất bại !");
    }
  };

  useEffect(() => {
    setNameRoom(listRoom ? listRoom.nameRoom : "");
    setHorizon(listRoom ? listRoom.horizon : "");
    setVertical(listRoom ? listRoom.vertical : "");
  }, [listRoom]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="py-10">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <div className="mb-4 flex flex-col gap-3">
            <div className="text-black w-full">
              <label for="" className="font-semibold">
                Tên rạp:
              </label>
              <input
                onChange={(e) => setNameRoom(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listRoom?.nameRoom}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold">
                Số hàng:
              </label>
              <input
                onChange={(e) => setVertical(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
                type="number"
                defaultValue={listRoom?.vertical}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold">
                Số cột:
              </label>
              <input
                onChange={(e) => setHorizon(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
                type="number"
                defaultValue={listRoom?.horizon}
              />
            </div>
            <div
              onClick={() => handleUpdate()}
              className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
            >
              SAVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
