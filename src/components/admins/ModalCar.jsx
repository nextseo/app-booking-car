import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "../../App";

const ModalCar = ({ handleOpen, open, fetchData }) => {
  const { token } = useMyContext();

  const [sendData, setSendData] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    setSendData({ ...sendData, file: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", sendData.file);
    formData.append("code", sendData.code);
    formData.append("name", sendData.name);
    formData.append("license", sendData.license);
    formData.append("other", sendData.other);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/cars`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization' : `Bearer ${token}`
          }
          
        }
      );
      setSendData({})
      setFile(null)
      setPreview("")
      toast.success(res.data.message);
      handleOpen();
      console.log(res.data);
      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>เพิ่มรถใหม่</DialogHeader>
      <DialogBody>
        {JSON.stringify(sendData)}

        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="รหัสรถยนตร์"
              onChange={(e) =>
                setSendData({ ...sendData, code: e.target.value })
              }
            />
            <Input
              label="ชื่อรถยนตร์"
              onChange={(e) =>
                setSendData({ ...sendData, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Input
              label="ป้ายทะเบียน"
              onChange={(e) =>
                setSendData({ ...sendData, license: e.target.value })
              }
            />
            <Input
              label="อื่น ๆ"
              onChange={(e) =>
                setSendData({ ...sendData, other: e.target.value })
              }
            />
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center ">
            <div className=" w-full md:w-1/3">
              <Input
                type="file"
                onChange={(e) => handleFileChange(e)}
                required
                //  onChange={(e)=>setSendData({...sendData,  img: 11111})}
              />
            </div>
            <div className="w-full md:w-2/3 ">
              {preview && (
                <img
                  src={preview}
                  width="300"
                  height="300"
                  className=" rounded-lg  "
                />
              )}
            </div>
          </div>

          <Button variant="gradient" color="black" type="submit">
            <span>บันทึก</span>
          </Button>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>ออก</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalCar;
