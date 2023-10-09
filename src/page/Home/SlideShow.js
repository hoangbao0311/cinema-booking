import React, { useState, useEffect } from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "450px",
  color: "#fff",
  lineHeight: "450px",
  textAlign: "center",
  background: "#364d79",
};

function Slideshow() {
  return (
    <div className="w-full mx-auto">
      <Carousel autoplay>
        <div>
          <img
            style={contentStyle}
            src="/image/banner/bts_2023_rolling_banner_2.jpg"
            alt=""
            className="h-72"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="/image/banner/6fa21908f9f341778f5e71c5c7088bac.jpg"
            alt=""
            className="h-72"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="/image/banner/0c803a0031af48d3abcb90f45a6768e3.jpg"
            alt=""
            className="h-72"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="/image/banner/0c803a0031af48d3abcb90f45a6768e3.jpg"
            alt=""
            className="h-72"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Slideshow;
