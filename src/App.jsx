import React, { createContext, useContext, useEffect, useState } from "react";
import Login from "./components/logins/Login";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/logins/Register";
import Admin from "./components/admins/Admin";
import Cars from "./components/admins/Cars";
import Layout from "./components/layouts/Layout";
import Cookies from "js-cookie";
import PrivateRoutes from "./components/PrivateRoutes";

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

const App = () => {
  const [myState, setMyState] = useState("Initial Value");
  const [statusLogin, setStatusLogin] = useState(localStorage.getItem("role") || "");
  const [openSideBar, setOpenSideBar] = useState(false);
  // const [token , setToken] = useState(Cookies.get("token") )
  const [token , setToken] = useState(localStorage.getItem('next_token') || "" )


  const contextValue = {
    myState,
    // updateState,
    statusLogin,
    openSideBar,
    setOpenSideBar,
    token
  };
//  const getToken = ()=>{
//    setToken( Cookies.get("token"))
//  }


  useEffect(() => {
    // getToken()

  // console.log("Stored Token:", token);
  
  }, [statusLogin]);

  return (
    <MyContext.Provider value={contextValue}>
      <BrowserRouter>
        {!token ? (
          <Routes basename="/app-booking-car" >
            <Route  path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <PrivateRoutes />
        )}
      </BrowserRouter>
    </MyContext.Provider>
  );
};

export default App;
