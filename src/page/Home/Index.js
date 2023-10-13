import React from "react";
import { Link, Outlet } from "react-router-dom";

import Header from "../Header";
import Home from "./Home";
import Footer from "../Footer";

const Index = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Index;