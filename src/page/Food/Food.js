import React from "react";
import SelectFood from "../../components/SelectFood/SelectFood";
import SelectFilm from "../../components/SelectFilm/SelectFilm";
import { Link, useParams } from "react-router-dom";

const Food = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="flex lg:flex-row flex-col justify-center gap-5">
        <SelectFood />
        <div>
          <SelectFilm />
          <div className="flex gap-2">
            <Link
              className=" rounded-xl text-[#F58020] font-bold text-center px-10 py-2"
              to={`/selectseat/${id}`}
            >
              Quay lại
            </Link>
            <Link
              className="bg-[#F58020] rounded-xl text-white font-bold text-center hover:bg-[#e8933f] px-10 py-2"
              to={`/payment`}
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
