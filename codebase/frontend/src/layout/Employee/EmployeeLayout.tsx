import Header from "./EmployeeHeader"
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
const drawerWidth = 240;
import Divider from '@mui/material/Divider';
import LogoContainer from "../../component/LogoContainer";
import Bottem from "../Bottem";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const EmployeeLayout = () => {
    const [open, setOpen] = useState(false);
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ display: open ? 'flex' : 'block ' }}>
                <CssBaseline />
                <MenuIcon />
                <Header setOpen={setOpen} />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <div className='bg-[#002A47] py-3 flex justify-between px-2 text-center align-middle items-center'>
                        <div className='w-full '>
                            <LogoContainer />
                        </div>
                        <div>
                            <IconButton onClick={handleDrawerClose} className='text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="#d1d5db" d="M16.88 2.88a1.25 1.25 0 0 0-1.77 0L6.7 11.29a.996.996 0 0 0 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"></path></svg>
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    {/* <EmployeeSidebar /> */}
                    <Bottem />
                </Drawer>
                <div className={`mt-24 ${open ? 'ps-0' : 'ps-10'}`}>
                    <Outlet />
                </div>
            </Box>

        </>)
}

export default EmployeeLayout