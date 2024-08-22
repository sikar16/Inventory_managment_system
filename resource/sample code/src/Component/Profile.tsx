import logo from '../assets/logo.png';
import profile from '../assets/profile.jpg';
import email from '../assets/mail.png';

function Profile() {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <>
            <div className=' text-white  items-center justify-center ' >
                <div className=' ps-4 pt-5 flex justify-between bg-[#002A47] w-full'>
                    <img src={logo} alt="" className='w-24 md:w-40' />
                    <svg className='me-10' xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="#ffffff" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"></path></svg>
                </div>
                <div className='w-full bg-[#edf0fc] min-h-screen text-black px-5 pt-5'>
                    <div className='bg-white rounded-sm pb-10 pt-8 ps-4'>
                        <div className='flex flex-col-2  justify-between'>
                            <div className='ps-5 pt-2'>
                                <p className='text-lg'>Welcome, Zerubabel</p>
                                <p className='text-[#ADA7A7] text-sm'>{formattedDate}</p>
                            </div>
                            <div className='flex pt-5 pe-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <path fill="black" fillRule="evenodd" d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75" clipRule="evenodd"></path>
                                    <path fill="black" d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"></path>
                                </svg>
                                <p className='ms-2 text-sm'>Logout</p>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center sm:flex-row  sm:justify-between items-center ms-8 mt-6 gap-4'>
                            <div className='sm:flex justify-center items-center'>
                                <div className='text-center'>
                                    <img src={profile} alt="" width={100} height={100} className='rounded-full mx-auto' />
                                </div>
                                <div className='ms-4 text-center sm:text-left'>
                                    <p className='text-xl pt-2'>Zerubabel Damtew</p>
                                    <p className='text-[#ADA7A7] text-sm'>zerubabel@gmail.com</p>
                                    <p className='text-[#ADA7A7] text-sm'>Finance</p>
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
                                        placeholder='Your first name'
                                        type="text"
                                        id="firstName"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </div>
                                <div className="w-[80%] md:w-[30%]">
                                    <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                                    <input
                                        placeholder='Your middle name'
                                        type="text"
                                        id="middleName"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </div>
                                <div className="w-[80%] md:w-[30%]">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        placeholder='Your last name'
                                        type="text"
                                        id="lastName"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </div>
                            </div>
                            <div className='w-[80%] md:w-[30%] mx-5 my-5'>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5">
                                <div className="w-[80%] md:w-[30%]">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </div>
                                <div className="w-[80%] md:w-[30%]">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </div>
                                <div className="w-[80%] md:w-[30%]">
                                    <label htmlFor="subcity" className="block text-sm font-medium text-gray-700">Sub-city</label>
                                    <input
                                        type="text"
                                        id="subcity"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </div>
                            </div>
                            <div className='flex mt-20 gap-2 px-10'>
                                <img src={email} alt="" width={28} />
                                <p className='text-gray-400 text-sm'>zerubabel@gmail.com</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 48 48">
                                    <g fill="none" stroke="gray" strokeLinejoin="round" strokeWidth={2}>
                                        <path strokeLinecap="round" d="M7 42H43"></path>
                                        <path fill="white" d="M11 26.7199V34H18.3172L39 13.3081L31.6951 6L11 26.7199Z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile