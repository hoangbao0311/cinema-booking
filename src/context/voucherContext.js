import React, { createContext, useContext, useState } from "react";

const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {

  const [voucherPrice, setVoucherPrice] = useState(null);

  const addVoucherPrice = (price) => {
    setVoucherPrice(price);
  };

  return (
    <VoucherContext.Provider value={{ voucherPrice, addVoucherPrice }}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucher = () => {
  return useContext(VoucherContext);
};
