import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";
import Button from "@mui/material/Button";
import Title from "../../../component/TablesTitle";
// api
import { useGetAllUsersQuery } from "../../../services/user_service";
import Loading from "../../../component/Loading";

export default function UserList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //   api logic
  const { data, isLoading, isError, error, isSuccess } =
    useGetAllUsersQuery("user");
  // console.log(data);
  if (isError) return <h1>Error : {error.toString()}</h1>;
  if (isLoading) return <> <Loading /></>;
  if (isSuccess)
    return (
      <div className="mt-10  ">
        <Title tableName={"User"} action={"Add user"} onClick={handleOpenDialog} />
        <div className="  dark:bg-[#313131] w-[20%] px-3 py-1 rounded-md mb-4 flex">
          <p className="me-3 text-gray-500 ">Role:</p>
          <select name="" id="" className="w-[70%]  dark:bg-[#313131] ">
            <option value="">Finance</option>
            <option value="">Logistics</option>
            <option value="">Information Technology</option>
            <option value="">Human Resource</option>
          </select>
        </div>
        <div className="flex gap-8 text-gray-400 mt-8 mb-1">
          <button className="hover:underline hover:text-black dark:hover:text-gray-300">
            All Users
          </button>
          <button className="hover:underline hover:text-black dark:hover:text-gray-300">
            Finance
          </button>
          <button className="hover:underline hover:text-black dark:hover:text-gray-300">
            Information Technology
          </button>
          <button className="hover:underline hover:text-black dark:hover:text-gray-300">
            Human Resource
          </button>
        </div>
        <hr className="w-full text-black bg-black" />
        <div className="my-4">
          <input
            type="text"
            placeholder="Search"
            className="w-[80%] bg-white dark:bg-[#313131] rounded-md py-[5px] px-3"
          />
        </div>
        <UsersTable
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          userList={data}
        />
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Button variant="outlined" color="error">
              Deactive
            </Button>
          </MenuItem>
        </Menu>
        <AddUser open={openDialog} onClose={handleCloseDialog} />
      </div>
    );
}
