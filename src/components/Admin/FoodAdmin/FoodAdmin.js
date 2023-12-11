import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchAdmin from "../search.js/SearchAdmin";
import Pagination from "../../Pagination/Pagination";
const FoodAdmin = () => {
  const [showFood, setShowFood] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const getFood = async () => {
    const response = await axios.get("https://r636qt-3000.csb.app/foods");
    if (response.status === 200) {
      setShowFood(response.data);
      setFoods(response.data);
      setMaxPage(Math.ceil(response.data.length / itemsPerPage));
    }
  };

  const handleDeleteFood = async (foodId) => {
    const response = await axios.delete(
      `https://r636qt-3000.csb.app/foods/${foodId}`
    );
    if (response.status === 200) {
      getFood(response.data);
      toast.success("Xóa thành công !");
    }
  };
  const handleSearch = () => {
    const filteredFoods = foods.filter((food) => {
      const searchString =
        food.nameFood.toLowerCase() +
        food.description.toLowerCase() +
        food.price;
      return searchString.includes(searchTerm.toLowerCase());
    });
    setShowFood(filteredFoods);
    setCurrentPage(1);
    setMaxPage(Math.ceil(filteredFoods.length / itemsPerPage));
  };
  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = firstItem + itemsPerPage;
  const displayedFoods = showFood.slice(firstItem, lastItem);

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl ">Thiết lập food</div>
        <SearchAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <div className="bg-[#151929] rounded-lg font-semibold text-lg cursor-pointer p-3">
          <Link to={`/admin/foodNew`}>Thêm food</Link>
        </div>
      </div>
      <div className="px-4">
        <table className="mt-4 w-full border-collapse border-b border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border-b text-left font-semibold ">STT</th>
              <th className="p-2 border-b text-left font-semibold text-xl"></th>
              <th className="p-2 border-b text-left font-semibold text-xl">
                Tên
              </th>
              <th className="p-2 border-b text-left font-semibold text-xl">
                Chi tiết
              </th>
              <th className="p-2 border-b text-left font-semibold text-xl">
                Giá
              </th>
              <th className="p-2 border-b text-left font-semibold text-xl"></th>
            </tr>
          </thead>
          <tbody>
            {displayedFoods.map((food, index) => {
              return (
                <tr>
                  <td className="border-b">{index + 1 + firstItem}</td>
                  <td className="border-b p-3">
                    <img
                      className="h-36"
                      src={food.image}
                      alt={food.nameFood}
                    />
                  </td>
                  <td className="border-b font-semibold text-xl">
                    {food.nameFood}
                  </td>
                  <td className="border-b font-semibold text-xl">
                    {food.description}
                  </td>
                  <td className="border-b font-semibold text-xl">
                    Giá: {food.price}
                  </td>
                  <td className="border-b">
                    <Link to={`/admin/foodadmin/${food.id}`}>
                      <button className="hover:bg-green-900 m-3 bg-green-700 px-3 py-1 rounded-lg hover:cursor-pointer font-semibold">
                        Sửa
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDeleteFood(food.id)}
                      className="hover:bg-red-900 bg-red-700  px-3 py-1 rounded-lg hover:cursor-pointer font-semibold"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={showFood.length}
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default FoodAdmin;
