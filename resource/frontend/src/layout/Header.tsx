import { RiAccountCircleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import {
    MdNightlight,
    MdLightMode,
    MdBrightnessAuto,
} from "react-icons/md";
import IconContainer from "../component/icon/Icon_container";
import { useThemeData } from "../context/them_context";
import LogoContainer from "../component/LogoContainer";
import { AppBar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
interface ChildComponentProps {
    setOpen: (value: boolean) => void;
}

const Header: React.FC<ChildComponentProps> = ({ setOpen }) => {
    const { themeData, setThemeData } = useThemeData();

    const handleDrawerOpen = () => {
        setOpen(true);
    };


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
                    <MenuIcon onClick={handleDrawerOpen} />  <LogoContainer />
                </div>
                <div className='flex gap-3 me-5 align-middle items-center '>
                    <IconContainer
                        handler={toggleThemeData}
                        Icon={getThemeIcon()}
                        iconsClassName="my-custom-icon-class"
                    />
                    <IoNotificationsOutline className='w-[22px] h-[22px]' />
                    <RiAccountCircleLine className='w-[25px] h-[25px] cursor-pointer' onClick={() => { }} />
                </div>
            </div>
        </AppBar>
    </>

}
export default Header;

