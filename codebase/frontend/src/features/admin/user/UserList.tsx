import * as React from "react";
import UsersTable from "./UsersTable";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../services/user_service";
import Loading from "../../../component/Loading";
import { useGetAlldepartmentQuery } from "../../../services/department_service";
import AddUser from "./AddUser";
import Slider from "../../../component/Slider";

export default function UserList() {
  const [isAddingUser, setIsAddingUser] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState(null); // New state for selected department
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setIsAddingUser(false);
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);
  };

  const {
    isError: isdepartmentError,
    isLoading: isdepartmentLoading,
    isSuccess: isdepartmentSuccess,
    data: departments,
    error: departmentError,
  } = useGetAlldepartmentQuery();

  const { data, isLoading, isError, error, isSuccess } = useGetAllUsersQuery("user");

  if (isError) return <h1>Error: {error.toString()}</h1>;
  if (isLoading) return <Loading />;

  const filteredUsers = data?.filter((user) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      user.profile.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
      user.profile.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
      user.profile.middleName?.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm) ||
      user.profile.phone.toLowerCase().includes(lowercasedSearchTerm) ||
      user.department.name.toLowerCase().includes(lowercasedSearchTerm);

    const matchesDepartment =
      !selectedDepartment ||
      user.department.id === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleDepartmentClick = (departmentId) => {
    setSelectedDepartment(departmentId);
  };

  return (
    <div className="mt-5">
      {!isAddingUser ? (
        <>
          <div className='flex justify-between mb-3 mx-4'>
            <p className='text-[#002a47] dark:text-gray-200 text-4xl font-medium'>Users</p>
            <Link to='/admin/add-user'>
              <button className='bg-[#002A47] dark:bg-[#313131] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md'>
                Add user
              </button>
            </Link>
          </div>
          <Slider />
          <div className="my-4 px-5">
            <div className="text-gray-500">
              <ul className="flex gap-5">
                <li
                  className={`cursor-pointer ${!selectedDepartment ? 'font-bold' : ''}`}
                  onClick={() => handleDepartmentClick(null)}
                >
                  All users
                </li>
                {departments?.map((department) => (
                  <li
                    key={department.id}
                    className={`cursor-pointer ${selectedDepartment === department.id ? 'font-bold' : ''}`}
                    onClick={() => handleDepartmentClick(department.id)}
                  >
                    {department.name}
                  </li>
                ))}
              </ul>

              <hr className="mb-3 mt-1" />
            </div>

            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white dark:bg-[#313131] rounded-md py-[5px] px-3 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <UsersTable userList={filteredUsers} />
        </>
      ) : (
        <AddUser open={true} handleCloseDialog={handleCloseDialog} departments={departments} />
      )}
    </div>
  );
}
