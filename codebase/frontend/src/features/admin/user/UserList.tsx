import * as React from "react";
import UsersTable from "./UsersTable";
import Button from "@mui/material/Button";
import Title from "../../../component/TablesTitle";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../services/user_service";
import Loading from "../../../component/Loading";
import { useGetAlldepartmentQuery } from "../../../services/department_service";
import AddUser from "./AddUser";  // Import the AddUser component

export default function UserList() {
  const [isAddingUser, setIsAddingUser] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const navigate = useNavigate();

  const {
    isError: isuserError,
    isLoading: isuserLoading,
    isSuccess: isuserSuccess,
    data: departments,
    error: userError,
  } = useGetAlldepartmentQuery();

  const { data, isLoading, isError, error, isSuccess } =
    useGetAllUsersQuery("user");

  if (isError) return <h1>Error : {error.toString()}</h1>;
  if (isLoading) return <Loading />;

  const handleAddUserClick = () => {
    setIsAddingUser(true);
  };

  const handleCloseAddUser = () => {
    setIsAddingUser(false);
  };

  if (isSuccess)
    return (

      <div className="mt-5">
        {!isAddingUser ? (
          <>
            <div className='flex justify-between mb-3 mx-4  '>
              <p className='text-[#002a47] dark:text-gray-200 text-4xl font-medium'>Users</p>
              <Link to='/admin/add-user'>
                <button
                  className='bg-[#002A47] dark:bg-[#313131] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md'
                >
                  Add
                </button>
              </Link>
            </div>
            <div className="flex">
              <div className="bg-[#ffffff] px-3 rounded-md mb-4 flex py-1">
                <p className="me-3 text-gray-500">Role:</p>
                <select className='font-thin bg-[#faf9f9] dark:bg-[#313131] text-gray-700 dark:text-gray-300 px-3 rounded-md focus:outline-none'>
                  <option value="">Departments</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id} className="px-2">
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-8 text-gray-400 mt-8 mb-1">
              <button className="hover:underline hover:text-black dark:hover:text-gray-300">
                All user
              </button>
              {departments?.map((department) => (
                <button key={department.id} value={department.id} className="hover:underline hover:text-black dark:hover:text-gray-300">
                  {department.name}
                </button>
              ))}
            </div>
            <hr className="w-full text-black bg-black" />
            <div className="my-4 px-5">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white dark:bg-[#313131] rounded-md py-[5px] px-3 focus:outline-none"
              />
            </div>
            <UsersTable
              // anchorEl={anchorEl}
              // setAnchorEl={setAnchorEl}
              userList={data}
            />
          </>
        ) : (
          <AddUser open={true} handleCloseDialog={handleCloseDialog} departments={departments} />
        )}
      </div>
    );
}
