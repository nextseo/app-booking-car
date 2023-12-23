import { Button, Card, CardBody, Input, Radio } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import ModalCar from "./ModalCar";
import axios from "axios";
import { useMyContext } from "../../App";

const Cars = () => {
  const { token } = useMyContext();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/cars`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
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
      <ModalCar open={open} handleOpen={handleOpen} fetchData={fetchData} />
      <div className="flex flex-row gap-4 items-center">
        <h1 className="text-xl">จัดการข้อมูลรถ</h1>
        <Button onClick={handleOpen} size="sm" className="text-sm">
          เพิ่มรถใหม่
        </Button>
      </div>

      <div className="flex flex-col  md:flex-row gap-4 mt-4">
        <div className="w-full md:w-5/6">


          <div className="flex flex-wrap gap-0">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-1"
              >
                <Card className="hover:bg-gray-300 cursor-pointer">
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
                    <Button size="sm" color="red">ลบ</Button>
                    </div>

                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

    
        </div>
        <div className=" w-2/6">
          <Card>
            <CardBody>
              <Input label="รหัสรถยนตร์" />
              <div className="mt-4">
                <Input label="ชื่อรถยนตร์" />
              </div>

              <div className="mt-4">
                <Input label="ป้ายทะเบียน" />
              </div>

              <div className="mt-4">
                <Input label="อื่นๆ" />
              </div>

              <div className="flex gap-4 mt-4">
                <Radio label="ว่าง" />
                <Radio label="ยืม" />
                <Radio label="มีปัญหา" />
              </div>

              <div className="flex flex-row md:flex-col">
                <Button className="bg-red-500">บันทึก</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cars;
