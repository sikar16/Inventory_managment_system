import { useNavigate, useParams } from 'react-router-dom';
import LogoContainer from '../component/LogoContainer';
import { useGetSingleUserQuery } from '../services/user_service';

function Profile() {
    const currentDate = new Date();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the route parameters

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const { data: user, isSuccess } = useGetSingleUserQuery(Number(id));

    if (isSuccess && user) {
        return (
            <>
                <div className='text-white items-center justify-center'>
                    <div className='ps-4 py-2 flex justify-between bg-[#002A47] w-full'>
                        <LogoContainer />
                    </div>

                    <div className='w-full bg-[#edf0fc] min-h-screen text-black px-5 pt-5'>
                        <div className='bg-white rounded-sm pb-10 pt-8 ps-4'>
                            <div className='flex flex-col-2 justify-between'>
                                <div className='ps-5 pt-2'>
                                    <p className='text-lg'>
                                        Welcome, {user.profile.firstName} {user.profile.lastName} {user.profile.middleName}
                                    </p>
                                    <p className='text-[#ADA7A7] text-sm'>{formattedDate}</p>
                                </div>
                                <div className='flex pt-5 pe-4'>
                                    <p className='hover:underline' onClick={() => navigate(-1)}>Back</p>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center sm:flex-row sm:justify-between items-center ms-8 mt-6 gap-4'>
                                <div className='sm:flex justify-center items-center'>
                                    <div className='ms-4 text-center sm:text-left'>
                                        <p className='text-xl pt-2'>{user.profile.firstName} {user.profile.lastName} {user.profile.middleName}</p>
                                        <p className='text-[#ADA7A7] text-sm'>{user.email}</p>
                                        <p className='text-[#ADA7A7] text-sm'>{user.department.name}</p>
                                    </div>
                                </div>

                                <div className='sm:me-5 m-auto'>
                                    <button className='bg-[#184464] px-3 py-1 text-white rounded-sm'>Edit</button>
                                </div>
                            </div>

                            <div className="ms-3 mt-10">
                                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5">
                                    <div className="w-[80%] md:w-[30%]">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            value={user.profile.firstName}
                                            type="text"
                                            id="firstName"
                                            className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-[80%] md:w-[30%]">
                                        <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                                        <input
                                            value={user.profile.middleName}
                                            type="text"
                                            id="middleName"
                                            className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-[80%] md:w-[30%]">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            value={user.profile.lastName}
                                            type="text"
                                            id="lastName"
                                            className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='w-[80%] md:w-[30%] mx-5 my-5'>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        value={user.phone}
                                        type="text"
                                        id="phone"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5">
                                    <div className="w-[80%] md:w-[30%]">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            value={user.profile.address.country}
                                            type="text"
                                            id="country"
                                            className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-[80%] md:w-[30%]">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            value={user.profile.address.city}
                                            type="text"
                                            id="city"
                                            className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-[80%] md:w-[30%]">
                                        <label htmlFor="subcity" className="block text-sm font-medium text-gray-700">Sub-city</label>
                                        <input
                                            value={user.profile.address.subcity}
                                            type="text"
                                            id="subcity"
                                            className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return null; // or a loading spinner, or an error message
}

export default Profile;
