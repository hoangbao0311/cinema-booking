import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { storage } from "../../../FireBase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const metadata = {
  contentType: "image/jpeg",
};

const FoodEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({});
  const [nameFood, setNameFood] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [previewImage, setPreviewImage] = useState(""); // URL của ảnh xem trước
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .get(`https://r636qt-3000.csb.app/foods/${id}`)
      .then((response) => {
        setFood(response.data);
        setNameFood(response.data.nameFood);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setPreviewImage(response.data.image);
      })
      .catch((error) => {
        console.error("Error fetching food item:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdateFood = async () => {
    if (nameFood == null || description == null || price == null) {
      toast.warning("Vui lòng điền đầy đủ thông tin !");
      return;
    }

    // Nếu có chọn ảnh mới, tải ảnh mới lên Firebase Storage và cập nhật URL ảnh mới
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            updateFoodData(downloadURL);
          });
        }
      );
    } else {
      updateFoodData(food.image);
    }
  };

  const updateFoodData = (newImageURL) => {
    const updatedFood = {
      nameFood,
      description,
      price: parseFloat(price),
      image: newImageURL,
    };

    axios
      .patch(`https://r636qt-3000.csb.app/foods/${id}`, updatedFood)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Cập nhật thành công !");
          navigate("/admin/foodAdmin");
        }
      })
      .catch((error) => {
        console.error("Error updating food item:", error);
      });
  };

  return (
    <div>
      <div className="flex justify-between p-3 border-b-4 border-[#151929]">
        <div className="p-3 font-semibold text-xl">Chỉnh sửa món ăn</div>
      </div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col gap-3">
        <div className="mb-4">
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="block bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            Select Image
          </label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 rounded-lg shadow-md"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        {/* {progress > 0 && (
          <progress value={progress} max="100" className="w-full" />
        )}
        {image && (
          <button
            onClick={handleUpdateFood}
            className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg"
          >
            Upload
          </button>
        )} */}
        <div className="text-black font-bold">Chỉnh sửa Food</div>
        <div className="text-black w-full">
          <label className="font-semibold">Tên Food</label>
          <input
            value={nameFood}
            onChange={(e) => setNameFood(e.target.value)}
            className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
            type="text"
          />
        </div>
        <div className="text-black w-full">
          <label className="font-semibold">Miêu tả</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
            type="text"
          />
        </div>
        <div className="text-black w-full">
          <label className="font-semibold">Giá</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
          />
        </div>
        <button
          className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
          onClick={handleUpdateFood}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default FoodEdit;
