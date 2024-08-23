import React from 'react';

function AddUser() {
  return (
    <div className="flex items-center justify-center bg-white mt-10">
      <div className="bg-white w-[90%]  ">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-medium">User Registration</h3>
          <button
            className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

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
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
              <div className="w-full md:w-[30%]">
                <input
                  placeholder='middle name'
                  type="text"
                  id="middleName"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
              <div className="w-full md:w-[30%]">
                <input
                  placeholder='last name'
                  type="text"
                  id="lastName"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row w-full space-x-0 md:space-x-4'>
              <div className='w-full md:w-[45%] my-5 me-10'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
              <div className='w-full md:w-[45%] md:my-5'>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
            </div>
            <div className='w-full md:w-[45%] my-5'>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select id="gender" className='bg-slate-100 w-full py-2 rounded-md'>
                <option value="" className='text-gray-400 '></option>
                <option value="male" className='py-2'>Man</option>
                <option value="female" className='py-2'>Woman</option>
              </select>
            </div>

            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3">
              <div className="w-full md:w-[30%]">
                <input
                  placeholder='Country'
                  type="text"
                  id="country"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
              <div className="w-full md:w-[30%]">
                <input
                  placeholder='City'
                  type="text"
                  id="city"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
              <div className="w-full md:w-[30%]">
                <input
                  placeholder='Sub-city'
                  type="text"
                  id="subcity"
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
            </div>
            <div className='w-full md:w-[45%] my-5'>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <select id="department" className='bg-slate-100 w-full py-2 rounded-md'>
                <option value="finance">Finance</option>
                <option value="hr">Human Resource</option>
                <option value="it">Information Technology</option>
                <option value="manager">Manager</option>
                <option value="logistics">Logistics</option>
              </select>
            </div>
          </div>
          <div className='flex justify-center mt-10'>
            <button className='bg-[#002A47] text-white px-6 py-2 rounded-md w-[40%]'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
