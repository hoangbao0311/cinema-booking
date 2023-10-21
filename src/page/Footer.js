import React from "react";

const Footer = () => {
  return (
    <div className="border-[1px] border-black text-[#8d8d8d]">
      <div className="flex items-center py-10 justify-center bg-[#333] gap-5">
        <div>
          <img
            className="h-16"
            src={`https://www.galaxycine.vn/_next/static/media/galaxy-logo-footer.7a918263.svg`}
            alt=""
          />
        </div>
        <div>
          <div>
            <h1 className="font-bold">CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN</h1>
          </div>
          Toà nhà Bitexco Nam Long, 63A Võ Văn Tần, Phường 6, Quận 3, Tp. Hồ Chí
          Minh, Việt Nam Xem thêm tại: https://www.galaxycine.vn/
          <br /> 028.39.333.303 - : 19002224 (9:00 - 22:00) - :
          hotro@galaxystudio.vn Xem thêm tại: https://www.galaxycine.vn/
        </div>
      </div>
    </div>
  );
};

export default Footer;
