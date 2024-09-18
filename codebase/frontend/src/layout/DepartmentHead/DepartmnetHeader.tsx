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
import { Link } from "react-router-dom";
import { useState } from "react";
// interface ChildComponentProps {
//     setOpen: (value: boolean) => void;
// }

const DepartmentHeader = () => {
    const { themeData, setThemeData } = useThemeData();
    const [currentView, setCurrentView] = useState('');
    const handleToggleView = (view: string) => {
        setCurrentView(currentView === view ? '' : view);
    };
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };


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
                    <RiAccountCircleLine className='w-[25px] h-[25px] cursor-pointer' onClick={() => { }} />
                </div>
            </div>
            <hr className='dark:bg-gray-600 dark:text-gray-600' />

        </AppBar>
    </>

}
export default DepartmentHeader;

