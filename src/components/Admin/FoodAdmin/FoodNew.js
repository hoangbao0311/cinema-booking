import React, { useState } from "react";
import { storage } from "../../../FireBase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { toast } from "react-toastify";

const metadata = {
  contentType: "image/jpeg",
};
const FoodNew = () => {
  const [nameFood, setNameFood] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    if (nameFood == null || description == null || price == null) {
      toast.warning("Vui lòng điền đầy đủ thông tin !");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`); // tạo 1 địa chỉ để chứa ảnh chuẩn bị tải lên store
    const uploadTask = uploadBytesResumable(storageRef, image, metadata); // hàm tải ảnh lên store
    // Đoạn code này để tạo tính năng lắng nghe quá trình tải ảnh, trả về tiến trình để làm tính năng phần trăm tải ảnh
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Xử lý trường hợp tải ảnh thành công
        //  Lấy về đường link của ảnh vừa tải thành công
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          postData(downloadURL);
        });

        setImage(null);
        setProgress(0);
      }
    );
  };

  const postData = async (downloadURL) => {
    const response = await axios.post("http://localhost:3004/foods", {
      nameFood: nameFood,
      image: downloadURL,
      description: description,
      price: +price,
    });
    if (response.status === 201) {
      toast.success("Tải lên thành công !");
      console.log("ok");
    } else {
      console.log("Thất bại !");
    }
  };

  return (
    <div>
      <div>
        <div className="py-10">
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
              {image && <p className="mt-2">Selected: {image.name}</p>}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
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
                onClick={handleUpload}
                className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg"
              >
                Upload
              </button>
            )} */}
            <div className="text-black w-full">
              <label for="" className="font-semibold">
                Tên Food:
              </label>
              <input
                onChange={(e) => setNameFood(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
                type="text"
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Miêu tả:
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Giá:
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
              />
            </div>     
            <div
              className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
              onClick={() => handleUpload()}
            >
              UPLOAD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodNew;
