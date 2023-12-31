import React, { useEffect, useState } from "react";
import { storage } from "../../../FireBase/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  updateMetadata,
} from "firebase/storage";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const metadata = {
  contentType: "image/jpeg",
};
const FilmAdmin = () => {
  const { id } = useParams();

  const [listfilm, setListFilm] = useState(null);
  const [nameFilm, setNameFilm] = useState(null);
  const [author, setAuthor] = useState(null);
  const [actor, setActor] = useState(null);
  const [description, setDescription] = useState(null);
  const [director, setDirector] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [time, setTime] = useState(null);
  const [coutry, setCoutry] = useState(null);
  const [status, setStatus] = useState(null);

  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
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

  useEffect(() => {
    setNameFilm(listfilm ? listfilm.name : "");
    setAuthor(listfilm ? listfilm.author : "");
    setActor(listfilm ? listfilm.main_actor : "");
    setDescription(listfilm ? listfilm.description : "");
    setDirector(listfilm ? listfilm.director : "");
    setStartDay(listfilm ? listfilm.startDay : "");
    setTime(listfilm ? listfilm.time : "");
    setCoutry(listfilm ? listfilm.coutry : "");
    setStatus(listfilm ? listfilm.status : "");
    setEndDay(listfilm ? listfilm.endDay : "");
  }, [listfilm]);

  const postData = async (downloadURL) => {
    const response = await axios.patch(
      `https://r636qt-3000.csb.app/films/${id}`,
      {
        name: nameFilm,
        banner: downloadURL,
        author: author,
        main_actor: actor,
        description: description,
        director: director,
        startDay: startDay,
        endDay: endDay,
        time: time,
        coutry: coutry,
      }
    );
    if (response.status === 200) {
      toast.success("Tải lên thành công !");
    } else {
      console.log("Thất bại !");
    }
  };

  const postDataNoImage = async () => {
    const response = await axios.patch(
      `https://r636qt-3000.csb.app/films/${id}`,
      {
        name: nameFilm,
        author: author,
        main_actor: actor,
        description: description,
        director: director,
        startDay: startDay,
        endDay: endDay,
        time: time,
        coutry: coutry,
        status: "Đang Chiếu",
      }
    );
    if (response.status === 200) {
      toast.success("Tải lên thành công !");
    } else {
      console.log("Thất bại !");
    }
  };

  const handleEditUpload = () => {
    console.log(image);
    if (image != null) {
      handleUpload();
    } else {
      postDataNoImage();
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://r636qt-3000.csb.app/films/${id}`
      );
      if (response.status === 200) {
        setListFilm(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
            {progress > 0 && (
              <progress value={progress} max="100" className="w-full" />
            )}
            {image && (
              <button
                onClick={handleUpload}
                className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg"
              >
                Upload
              </button>
            )}
            <div className="text-black w-full">
              <label for="" className="font-semibold">
                Tên phim:
              </label>
              <input
                onChange={(e) => setNameFilm(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg font-semibold border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.name}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Tác giả:
              </label>
              <input
                onChange={(e) => setAuthor(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.author}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Diễn viên chính:
              </label>
              <input
                onChange={(e) => setActor(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.main_actor}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Mô tả:
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.description}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Đạo diễn:
              </label>
              <input
                onChange={(e) => setDirector(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.director}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Ngày khởi chiếu:
              </label>
              <input
                onChange={(e) => setStartDay(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="date"
                defaultValue={listfilm?.startDay}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Ngày kết thúc:
              </label>
              <input
                onChange={(e) => setEndDay(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="date"
                defaultValue={listfilm?.endDay}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Thời lượng:
              </label>
              <input
                onChange={(e) => setTime(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.time}
              />
            </div>
            <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Quốc gia:
              </label>
              <input
                onChange={(e) => setCoutry(e.target.value)}
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.coutry}
              />
            </div>
            {/* <div className="text-black w-full">
              <label for="" className="font-semibold ">
                Status:
              </label>
              <input
                className="outline-none border w-full mt-1 py-1 px-2 text-lg  border-[#1C2438] rounded-lg"
                type="text"
                defaultValue={listfilm?.status}
              />
            </div> */}
            <div
              className="bg-[#1C2438] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-[#151929]"
              onClick={() => handleEditUpload()}
            >
              UPLOAD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmAdmin;
