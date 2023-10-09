import React from "react";
import { Link, Outlet } from "react-router-dom";

import Header from "../Header";
import Home from "./Home";
import Footer from "../Footer";

const Index = () => {
  return (
    <div>
      <Header />
<<<<<<< HEAD:src/components/Index.js
      <Home />
      <Footer /> 
=======
      <Outlet />
      <Footer />
>>>>>>> master:src/page/Home/Index.js
    </div>
  );
};

export default Index;
