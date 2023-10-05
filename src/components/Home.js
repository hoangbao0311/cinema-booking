import React, { useState } from "react";
import Header from "./Header";
import SlideShow from "./SlideShow";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("PHIM ĐANG CHIẾU");

  return (
    <div>
      <div className="hidden lg:block">
        <SlideShow />
      </div>
      <div>
        <div className="w-full flex mt-3 gap-3">
          <div className="border-y-[1px] w-full border-black ml-24"></div>
          <img src="/image/h3_movie_selection.gif" alt="" />
          <div className="border-y-[1px] w-full border-black mr-24"></div>
        </div>

        <div className="flex gap-10 justify-center">
          <div className="mb-4">
            <input
              type="radio"
              id="drink"
              name="category"
              value="PHIM ĐANG CHIẾU"
              className="mr-2 opacity-0"
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <label className="cursor-pointer" htmlFor="drink">
              <h1
                className={`text-2xl py-1 px-4 ${
                  selectedCategory === "PHIM ĐANG CHIẾU"
                    ? "text-[#0C713D] border-y-[1px] border-[#0C713D]"
                    : ""
                }`}
              >
                PHIM ĐANG CHIẾU
              </h1>
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="snacks"
              name="category"
              value="PHIM SẮP CHIẾU"
              className="mr-2 opacity-0"
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <label className="cursor-pointer" htmlFor="snacks">
              <h1
                className={`text-2xl py-1 px-4 ${
                  selectedCategory === "PHIM SẮP CHIẾU"
                    ? "text-[#0C713D] border-y-[1px] border-[#0C713D]"
                    : ""
                }`}
              >
                PHIM SẮP CHIẾU
              </h1>
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          {selectedCategory === "PHIM ĐANG CHIẾU" && (
            <div>
              <div className="grid gap-x-8 gap-y-12 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11222_103_100003.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11222_103_100003.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11222_103_100003.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11222_103_100003.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11222_103_100003.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedCategory === "PHIM SẮP CHIẾU" && (
            <div>
              <div className="grid gap-x-8 gap-y-12 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11236_103_100001.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11236_103_100001.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11236_103_100001.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11236_103_100001.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden w-[225px]">
                  <img
                    className="h-[335px] w-[225px]"
                    src="/image/Film/11236_103_100001.jpg"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg">
                      PAW PATROL: PHIM SIÊU ĐẲNG
                    </p>
                    <div className="flex justify-between">
                      <label for="">93Phút</label>
                      <label for="">29/09/2023</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex mt-3 gap-3">
          <div className="border-y-[1px] w-full border-black ml-24"></div>
          <img src="/image/h3_event.gif" alt="" />
          <div className="border-y-[1px] w-full border-black mr-24"></div>
        </div>
        <div className="flex justify-center gap-2 my-5">
          <img src="/image/Event/2023_happy_wed_75k_000_240x201.png" alt="" />
          <img src="/image/Event/240x201-uu.jpg" alt="" />
          <img src="/image/Event/birthday_popcorn_box_240x201.png" alt="" />
          <img
            src="/image/Event/u22_2023_special_cinemas_240x201_1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
