import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const FoodAdmin = () => {
  const [showFood, setShowFood] = useState([]);
  const navigate = useNavigate();

  const getFood = async () => {
    const response = await axios.get("http://localhost:3004/foods");
    if (response.status === 200) {
      setShowFood(response.data);
    }
  };

  const handleDeleteFood = async (foodId) => {
    const response = await axios.delete(
      `http://localhost:3004/foods/${foodId}`
    );
    if (response.status === 200) {
      getFood(response.data);
      toast.success("Xóa thành công !");
    }
  };

  useEffect(() => {
    getFood();
  }, [showFood]);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập food</div>
        <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
          <Link to={`/admin/foodNew`}>Thêm food</Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        {showFood.map((food) => {
          return (
            <div className="flex items-center gap-5">
              <div>{food.id}</div>
              <img className="h-36" src={food.image} alt={food.nameFood} />
              <div className="flex-1 font-semibold text-xl">
                {food.nameFood}
              </div>
              <div className="flex-1 font-semibold text-xl">
                {food.description}
              </div>
              <div className="flex-1 font-semibold text-xl">
                Giá: {food.price}
              </div>
              <Link to={`/admin/foodadmin/${food.id}`}>
                <button className="hover:bg-green-900 bg-green-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold">
                  Sửa
                </button>
              </Link>

              <button
                onClick={() => handleDeleteFood(food.id)}
                className="hover:bg-red-900 bg-red-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
              >
                Xóa
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodAdmin;
