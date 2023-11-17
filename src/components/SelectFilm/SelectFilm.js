import React, { useEffect, useContext } from "react";
import { Context } from "../../context/ticketContext";
import { useVoucher } from "../../context/voucherContext";

const SelectFilm = () => {
  const {
    ticketInfo,
    selectedSeats,
    cinemaInfo,
    listDataShowtime,
    listDataRoomFind,
    priceShowtime,
    listFoodContext,
    setAmount,
  } = useContext(Context);

  let totalFood = 0;
  let totalFilm = 0;
  let total = 0;

  listFoodContext?.map((item) => {
    totalFood += parseFloat(item?.quantity) * parseFloat(item?.price);
    return totalFood;
  });

  const lengthSeat = selectedSeats.length;
  totalFilm = lengthSeat * priceShowtime;
  total = lengthSeat * priceShowtime + totalFood;

  const { voucherPrice } = useVoucher();
  let totalDiscount = total - voucherPrice;

  if (totalDiscount < 0) {
    totalDiscount = 0;
  }
  console.log("totalDiscount", totalDiscount);
  console.log("total", total);

  useEffect(() => {
    setAmount(totalDiscount);
  }, [totalDiscount]);

  return (
    <div>
      <div className="flex flex-col gap-3 justify-center text-start">
        {listDataShowtime != null ? (
          <div className="flex flex-col items-center gap-1">
            <img className="h-40" src={listDataShowtime?.films.banner} alt="" />
            <div className="font-semibold">{listDataShowtime.films.name}</div>
          </div>
        ) : (
          <div>loading...</div>
        )}
        <div className="flex gap-2 ">
          <div className="font-semibold">Xuất chiếu:</div>
          <div>{ticketInfo.showtime}</div>
          <div>|</div>
          <div>{ticketInfo.date}</div>
        </div>
        {listDataRoomFind != null ? (
          <div className="flex gap-2">
            <div>
              <label className="font-semibold" for="">
                Rạp:
              </label>{" "}
              {cinemaInfo}
            </div>
            <div>|</div>
            <div>
              <label className="font-semibold" for="">
                Phòng:
              </label>{" "}
              {listDataRoomFind.nameRoom}
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )}
        {selectedSeats.length != 0 ? (
          <div className="flex justify-between gap-2 border-dashed border-t-[1px] border-black">
            <p className="">
              <label className="font-semibold" for="">
                Ghế đã chọn:
              </label>{" "}
              {selectedSeats.join(", ")}
            </p>
            <label className="font-semibold" for="">
              {parseInt(totalFilm).toLocaleString("vi-VN")} Đ
            </label>
          </div>
        ) : (
          <div className="font-semibold"></div>
        )}
        <div>
          {listFoodContext.length != 0 ? (
            <div className="border-dashed  border-y-[1px] border-black">
              <p>
                <label className="font-semibold " for="">
                  Food:
                </label>{" "}
                {listFoodContext.map((item) => {
                  return (
                    <div className="flex gap-2 justify-between">
                      <div className=" flex gap-2">
                        <div className="font-semibold">{item.quantity}</div> x
                        <div className="">{item.foodname}</div>
                      </div>
                      <div className="font-semibold ">
                        {parseInt(item.price * item.quantity).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        Đ
                      </div>
                    </div>
                  );
                })}
              </p>
            </div>
          ) : (
            <div className="font-semibold"></div>
          )}
        </div>
        {voucherPrice && (
          <div>
            <label className="font-semibold flex justify-between" for="">
              <div>Giảm giá:</div>
              <div className="text-[#F58020]">
                {parseInt(voucherPrice).toLocaleString("vi-VN")} Đ
              </div>
            </label>
          </div>
        )}
        <div>
          <label className="font-semibold flex justify-between" for="">
            <div>Tổng cộng:</div>
            <div className="text-[#F58020]">
              {parseInt(totalDiscount).toLocaleString("vi-VN")} Đ
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SelectFilm;
