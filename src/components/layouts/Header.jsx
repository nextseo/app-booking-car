import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import classname from "classname";
import axios from "axios";

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { statusLogin } = useMyContext();
  const { openSideBar, setOpenSideBar } = useMyContext();
  const navigate = useNavigate();




  const handleLogout = ()=>{
   localStorage.clear('next_token')
   localStorage.clear('users')
   localStorage.clear('role')

   setTimeout(()=>{
    window.location.reload(true);
  },1000)

}

  

  

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className={classname(
        statusLogin == 1 && "sticky top-0 z-50",
        "bg-black shadow-lg w-full items-center"
      )}
    >
      <div className="  flex justify-between px-20 py-3 ">
        <Typography
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-white"
          onClick={() => setOpenSideBar(!openSideBar)}
        >
          Nextsoftware TH
        </Typography>

        <div>
          {statusLogin > 0 && (
            <div className="hidden lg:block">
              <NavList />
            </div>
          )}

          {statusLogin > 0 && (
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden "
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          )}
        </div>
        <Button
          color="red"
          className="text-sm"
          size="sm"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </Button>
      </div>
      {statusLogin > 0 && (
        <Collapse
          className="bg-gray-200 px-10 py-2 block lg:hidden "
          open={openNav}
        >
          <NavList />
        </Collapse>
      )}
    </div>
  );
};

export default Header;

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6  ">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-medium hover:bg-gray-600 px-4 py-2 rounded-md text-white"
      >
        จองรถ
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium hover:bg-gray-600 px-4 py-2 rounded-md text-white"
      >
        ติดตามสถานะ
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium hover:bg-gray-600 px-4 py-2 rounded-md text-white"
      >
        ขั้นตอนชำระเงิน
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium hover:bg-gray-600 px-4 py-2 rounded-md text-white"
      >
        ติดต่อเรา
      </Typography>
    </ul>
  );
}
