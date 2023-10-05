import React from "react";

const Footer = () => {
  return (
    <div className="border-[1px] border-black">
      <div className="flex items-center py-10 justify-center bg-[#FDFCF0]">
        <div>
          <img className="h-16" src="/image/tải xuống.png" alt="" />
        </div>
        <div>
          <div>
            <h1 className="font-bold">CÔNG TY TNHH CJ CGV VIỆT NAM</h1>
          </div>
          Giấy Chứng nhận đăng ký doanh nghiệp: 0303675393 đăng ký lần đầu ngày
          31/7/2008,
          <br /> được cấp bởi Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh <br />
          Địa chỉ: Lầu 2, số 7/28, Đường Thành Thái, Phường 14, Quận 10, Thành
          phố Hồ Chí Minh, Việt NamĐường dây nóng (Hotline): 1900 6017 <br />
          COPYRIGHT 2017 CJ CGV VIETNAM CO., LTD. ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
};

export default Footer;
