import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex h-screen ">
      <div className=" lg:w-1/5 ">
        <Sidebar />
      </div>
      <div className="  w-full   lg:w-4/5 bg-gray-200  ">
        <Header />

        <ToastContainer
        autoClose={2000} // Adjust as needed
        theme="colored"
      />
        <div className="  container px-10 py-5">
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
