import { Button, Card, CardBody, Carousel, Input, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/cars`, {
        withCredentials: true,
      });
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-96 w-full object-cover"
      />

      <h1 className="text-center mt-10 text-3xl">เช่า-จองรถ ขอนแก่นทุกรุ่น</h1>

      <div className=" container px-10 py-10">
        <div className="flex flex-row mt-2 gap-4">
          <div className="w-72">
            <Input label="ค้นหารถที่ต้องการ" />
          </div>

          <div className="w-72">
            <Select label="ประเภทรถ">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
        </div>


        <div className="flex flex-wrap gap-0 mt-4" >
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-1"
              >
                <Card className="bg-white hover:bg-gray-300 cursor-pointer shadow-xl border border-gray-200">
                  <CardBody>
                    <img
                      className="w-full rounded-lg"
                      src={`${import.meta.env.VITE_APP_API}/images/${item.image}`}
                      alt="Car"
                    />
                    <div className="flex flex-row justify-between">
                    <p className="mt-2"> รหัส : {item.code}</p>
                    <p className="mt-2"> ชื่อ : {item.name}</p>
                    </div>

                    <div className="flex flex-row justify-between items-center">
                    <p className="mt-2"> ป้ายทะเบียน : {item.license}</p>
                    </div>

                    <div className="flex gap-2 mt-2 justify-end">
                    <Button size="sm">เลือก</Button>
                    </div>

                  </CardBody>
                </Card>
              </div>
            ))}
          </div>  


      </div>
    </div>
  );
};

export default Home;
