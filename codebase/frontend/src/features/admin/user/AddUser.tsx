import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { useAddNewuserMutation } from '../../../services/user_service';
function AddUser({ open, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    country: '',
    city: '',
    subcity: '',
    department: '',
  });
  const [adduser, { isError, isSuccess, isLoading, error }] = useAddNewuserMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };
  const handleAdduser = async () => {
    const formdata = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      phone: formData.phone,
      email: formData.email, // Corrected to formData.email
      gender: formData.gender,
      country: formData.country,
      city: formData.city,
      subcity: formData.subcity,
      department: formData.department,
    };

    try {
      console.log(formdata);
      await adduser(formdata).unwrap();

    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center bg-white mt-3">
              <div className="bg-white w-[90%]">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="text-xl font-medium">User Registration</h3>
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
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                      <div className="w-full md:w-[30%]">
                        <input
                          placeholder='middle name'
                          type="text"
                          id="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                      <div className="w-full md:w-[30%]">
                        <input
                          placeholder='last name'
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
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
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                      <div className='w-full md:w-[45%] md:my-5'>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="text"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                    </div>
                    <div className='w-full md:w-[45%] my-5'>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className='bg-slate-100 w-full py-2 rounded-md'
                      >
                        <option value="" className='text-gray-400'>Select Gender</option>
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
                          value={formData.country}
                          onChange={handleInputChange}
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                      <div className="w-full md:w-[30%]">
                        <input
                          placeholder='City'
                          type="text"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                      <div className="w-full md:w-[30%]">
                        <input
                          placeholder='Sub-city'
                          type="text"
                          id="subcity"
                          value={formData.subcity}
                          onChange={handleInputChange}
                          className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                        />
                      </div>
                    </div>
                    <div className='w-full md:w-[45%] my-5'>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                      <select
                        id="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className='bg-slate-100 w-full py-2 rounded-md'
                      >
                        <option value="" className='text-gray-400'>Select Department</option>
                        <option value="finance">Finance</option>
                        <option value="hr">Human Resource</option>
                        <option value="it">Information Technology</option>
                        <option value="manager">Manager</option>
                        <option value="logistics">Logistics</option>
                      </select>
                    </div>
                  </div>
                  <div className='flex justify-center mt-10'>
                    <button type="submit"
                      onClick={handleAdduser}
                      className='bg-[#002A47] text-white px-6 py-2 rounded-md w-[40%]'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>

  );
}

export default AddUser;
