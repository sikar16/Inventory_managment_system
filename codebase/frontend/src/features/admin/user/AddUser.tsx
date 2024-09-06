import { useState } from 'react';
import { useAddNewuserMutation } from '../../../services/user_service';
import { Link } from 'react-router-dom';
import { useGetAlldepartmentQuery } from '../../../services/department_service';

interface FormDataType {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  country: string;
  city: string;
  subCity: string;
  departmentId: number;
  password: string;
}

function AddUser() {
  const {
    data: departments,
  } = useGetAlldepartmentQuery("");

  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    country: '',
    city: '',
    subCity: '',
    departmentId: 0,
    password: "",
    role: 'EMPLOYEE'
  });

  const [adduser] = useAddNewuserMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData);
  };
  const handleAdduser = async () => {
    const data: FormDataType = {
      ...formData,
      departmentId: Number(formData.departmentId)
    };
    console.log(data);
    await adduser(data);

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center bg-white pt-5 pb-12">
          <div className="bg-white w-[90%]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-3xl font-medium text-[#002A47] ">User Registration</h3>
              <Link to='/admin/user'>
                <p className='hover:underline text-black text-sm'>back</p>
              </Link>
            </div>
            <div className="mt-4">
              <div className="mt-10">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Name</label>
                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3">
                  <div className="w-full md:w-[30%]">
                    <input
                      placeholder='first name'
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                  <div className="w-full md:w-[30%]">
                    <input
                      placeholder='middle name'
                      type="text"
                      id="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                  <div className="w-full md:w-[30%]">
                    <input
                      placeholder='last name'
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                </div>
                <div className='flex flex-col md:flex-row w-full space-x-0 md:space-x-4'>
                  <div className='w-full md:w-[45%] my-5 me-10'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                  <div className='w-full md:w-[45%] md:my-5'>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                </div>
                <div className='w-full md:w-[45%] my-5'>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className='focus:outline-none bg-slate-100 w-full py-2 rounded-md'
                  >
                    <option value="" className='text-gray-400'>Select Gender</option>
                    <option value="MALE" className='py-2'>Man</option>
                    <option value="FEMALE" className='py-2'>Woman</option>
                  </select>
                </div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3">
                  <div className="w-full md:w-[30%]">
                    <input
                      placeholder='Country'
                      type="text"
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                  <div className="w-full md:w-[30%]">
                    <input
                      placeholder='City'
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                  <div className="w-full md:w-[30%]">
                    <input
                      placeholder='Sub-city'
                      type="text"
                      id="subCity"
                      value={formData.subCity}
                      onChange={handleInputChange}
                      className="focus:outline-none mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                    />
                  </div>
                </div>
                <div className='w-full md:w-[45%] my-5'>
                  <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">Department</label>
                  <select
                    id="departmentId"
                    value={Number(formData.departmentId)}
                    onChange={handleInputChange}
                    className='focus:outline-none bg-slate-100 w-full py-2 rounded-md'
                  >
                    <option value="" className='text-gray-400'>Select Department</option>
                    {departments?.map(department => (
                      <option key={department.id} value={department.id}>{department.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='flex justify-center mt-16'>
                <button type="submit"
                  onClick={handleAdduser}
                  className='bg-[#002A47] text-white px-6 py-2 rounded-md w-[40%]'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>

    </>

  );
}

export default AddUser;
