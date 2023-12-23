import { Card, CardBody } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Login = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/login`,
        value,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success("เข้าสู่ระบบสำเร็จ");
        const decoded = jwtDecode(res.data.token);
        console.log(decoded);
      
        localStorage.setItem('users',decoded.username )
        localStorage.setItem('role',decoded.role )
        localStorage.setItem('next_token',res.data.token )

        setTimeout(()=>{
          window.location.href = window.location.href;
        },1000)
        // navigate('/admin')
      }

    } catch (error) {
      console.log(error);
      // toast.error('เข้าสู่ระบบ ไม่สำเร็จ')
      toast.error("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  const getUsers = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/users`, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer
        autoClose={2000} // Adjust as needed
        theme="colored"
      />

      <div className="flex justify-center items-center h-screen  bg-gray-200    ">
        <Card className="w-96">
          <CardBody>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center gap-2">
              <img
                className=" h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                เข้าสู่ระบบ
              </h2>
            </div>

            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    autoComplete="Username"
                    required
                    onChange={(e) =>
                      setValue({ ...value, username: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) =>
                      setValue({ ...value, password: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <p className="mt-10 text-center text-sm text-gray-500">
                ลูกค้าที่ต้องการจองรถ
                <Link
                  to="/register"
                  className="font-semibold leading-6 mx-2 text-indigo-600 hover:text-indigo-500"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
