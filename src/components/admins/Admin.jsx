import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../../App";

const Admin = () => {
  const { token } = useMyContext();

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/users`, {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        }
      
        
      );
      console.log(res.data);
      setData(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(token);
  }, []);
  return (
    <div>
      <h1>ADMIN PAGEs</h1>

      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
