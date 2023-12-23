import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useMyContext } from "../../App";
import classname from "classname";
import { useEffect } from "react";

const Sidebar = () => {
  const { openSideBar, setOpenSideBar } = useMyContext();


  return (
 <Card className={classname(openSideBar ? " fixed md:static "  : " hidden md:block ", 'h-full p-4 shadow-xl shadow-blue-gray-900/5 ')}>

      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" onClick={()=>setOpenSideBar(!openSideBar)}  >
          จอง-เช่ารถ ขอนแก่น
        </Typography>
      </div>
      <List>
        <Link to="/admin">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to="/admin/cars">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            จัดการรถ
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className="">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="bg-red-500 hover:bg-red-400 hover:text-white focus:bg-red-500 focus:text-white text-white">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" color="white" />
          </ListItemPrefix>
          ออกจากระบบ
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
