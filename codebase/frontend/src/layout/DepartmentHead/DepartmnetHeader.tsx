import { RiAccountCircleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import {
    MdNightlight,
    MdLightMode,
    MdBrightnessAuto,
} from "react-icons/md";
import IconContainer from "../../component/icon/Icon_container";
import { useThemeData } from "../../context/them_context";
import LogoContainer from "../../component/LogoContainer";
import { AppBar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Bottem from "../Bottem";
// interface ChildComponentProps {
//     setOpen: (value: boolean) => void;
// }

const DepartmentHeader = () => {
    const { themeData, setThemeData } = useThemeData();
    const [currentView, setCurrentView] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleView = (view: string) => {
        setCurrentView(currentView === view ? '' : view);
    };
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };
    const navigator = useNavigate();


    const getThemeIcon = () => {
        if (themeData === "light") {
            return MdNightlight;
        } else if (themeData === "dark") {
            return MdLightMode;
        } else if (themeData === "system") {
            return MdBrightnessAuto;
        }
    };
    const toggleThemeData = () => {
        // console.log(`....${themeData}`);
        if (themeData === "light") {
            setThemeData("dark");
        } else if (themeData === "dark") {
            setThemeData("light");
        } else if (themeData === "system") {
            setThemeData("dark");
        }
    };
    return <>
        <AppBar className='bg-[#002A47] text-white dark:bg-slate-900 dark:text-white'>
            <div className=' ps-4 p-3 flex justify-between w-full pe-14 bg-[#002A47] dark:bg-zinc-950 dark:text-white'>
                <div className='flex gap-5 align-middle items-center text-center '>
                    {/* <MenuIcon onClick={handleDrawerOpen} />   */}
                    <LogoContainer />
                </div>
                <div className='flex gap-3 me-5 align-middle items-center '>
                    <div className="flex justify-center gap-10 me-6">
                        <Link to='/'>Home</Link>
                        <Link to='/department-head/incoming-requests' onClick={() => handleToggleView('requests')}>Requests</Link>
                        <Link to='/department-head/approvals' onClick={() => handleToggleView('approvals')}>Approvals</Link>
                    </div>
                    <IconContainer
                        handler={toggleThemeData}
                        Icon={getThemeIcon()}
                        iconsClassName="my-custom-icon-class"
                        children={null}
                    />
                    <IoNotificationsOutline className='w-[22px] h-[22px]' />
                    <RiAccountCircleLine className='w-[25px] h-[25px] cursor-pointer' onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
                {isOpen && (

                    <div className="absolute right-0  py-5 w-32 border rounded shadow-xl bg-[#002A47] mt-12">
                        <div className="flex  items-center text-center ms-4 mb-1" >
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"></path></svg>
                            <p className=" text-white text-center ms-1" onClick={() => navigator(`/profile/${id}`)}
                            >Profile</p>
                        </div>
                        <hr className="bg-white text-white" />
                        <div className="mt-4">
                            <Bottem />
                        </div>

                    </div>
                )}
            </div>
            <hr className='dark:bg-gray-600 dark:text-gray-600' />

        </AppBar>
    </>

}
export default DepartmentHeader;

