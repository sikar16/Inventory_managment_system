import React from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { RiAccountCircleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
function Appbar() {
    const navigate = useNavigate()
    return (
        <>
            <div className=' ps-4 pt-5 flex justify-between bg-[#002A47] w-full'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="#ffffff" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"></path>
                </svg> */}
                <img src={logo} alt="" className='w-24 md:w-40' />
                <div className='flex justify-around items-baseline align-bottom text-base gap-9 text-white cursor-pointer'>
                    <Link to='/home'><p>Home</p></Link>
                    <Link to='/request-list'><p>Requests</p></Link>
                    <Link to='/approval-list'> <p>Approvals</p></Link>

                </div>
                <div className='flex gap-4 me-5'>
                    <IoNotificationsOutline className='w-[22px] h-[22px] text-white cursor-pointer' />
                    <RiAccountCircleLine className='w-[25px] h-[25px] cursor-pointer text-white' onClick={() => navigate('/profile')} />
                </div>


            </div >
        </>
    )
}

export default Appbar