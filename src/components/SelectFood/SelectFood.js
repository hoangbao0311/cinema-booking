import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/ticketContext";
import axios from "axios";

const SelectFood = () => {
  const { setListFoodContext, listFoodContext } = useContext(Context);
  const [listFood, setListFood] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const data = async () => {
    const responseFood = await axios.get(`http://localhost:3004/foods`);
    if (responseFood.status === 200) {
      setListFood(responseFood.data);
    } else {
      console.log("loi");
    }
  };

  const handleInputChange = async (e, itemId, nameFoods, prices) => {
    const { name, value } = e.target;
    const updatedQuantity = name === "quantity" ? value : quantity;

    setQuantity(updatedQuantity);

    const productToUpdate = listFoodContext.find((item) => item.id === itemId);
    console.log(productToUpdate);
    if (!productToUpdate) {
      const newProduct = {
        id: itemId,
        foodname: nameFoods,
        quantity: value,
        price: prices,
      };
      setListFoodContext([...listFoodContext, newProduct]);
    } else {
      productToUpdate.quantity = value;
      setListFoodContext([...listFoodContext]);
    }
  };

  console.log(listFoodContext);

  useEffect(() => {
    data();
  }, []);

  return (
    <div>
      <div>
        <h1>Chọn combo:</h1>
        <div className="flex flex-col gap-5">
          {listFood ? (
            listFood.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex gap-5 h-[100px] items-center justify-center">
                    <img
                      className="rounded-lg h-[100px]"
                      src={item.image}
                      alt=""
                    />
                    <div className="flex flex-col justify-center gap-2 w-[400px]">
                      <div className="font-medium">{item.nameFood}</div>
                      <div>{item.description}</div>
                      <div className="font-semibold">
                        <label for="">Giá: </label>
                        {parseInt(item?.price).toLocaleString("vi-VN")} Đ
                      </div>
                    </div>
                    <input
                      className="text-lg text-[#0C713D] border-[#0C713D] border-[1px] p-1 px-2 w-16 h-8 outline-none"
                      type="number"
                      name="quantity"
                      min="0"
                      defaultValue={listFoodContext[index]?.quantity}
                      onChange={(e) =>
                        handleInputChange(e, item.id, item.nameFood, item.price)
                      }
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectFood;
