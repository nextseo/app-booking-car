import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const LayoutUser = () => {
  return (
    <div className="  ">
      <Header />

      <ToastContainer
        autoClose={2000} // Adjust as needed
        theme="colored"
      />
      {<Outlet />}

      <Footer/>
    </div>
  );
};

export default LayoutUser;
