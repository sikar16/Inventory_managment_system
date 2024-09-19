import Header from "../Header"
// mui 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
const drawerWidth = 240;
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import LogoContainer from "../../component/LogoContainer";
import AdminSidebar from "./AdminSidebar";
import Bottem from "../Bottem";
import { useAuth } from "../../context/AuthContext";
import UnauthorizedPage from "../../component/UnauthorizedPage";
export const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const { isAdmin, userData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (userData == null) {
            navigate("/login");
        }
        else if (userData.token == null) {
            navigate("/login");
        }


    }, [userData]);
    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (isAdmin) {
        return (
            <>
                <Box sx={{
                    marginLeft: open ? '20%' : '0',

                }}>
                    <CssBaseline />
                    {/* <MenuIcon /> */}
                    <Header setOpen={setOpen} />
                    <Divider />
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
                        <div className='bg-[#002A47] dark:bg-zinc-950 dark:text-white py-3 flex justify-between px-2 text-center align-middle items-center'>
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
                        <AdminSidebar />
                        <Divider />
                        <Bottem />
                    </Drawer>

                    <div className={`mt-24 h-screen px-10`}>
                        <Outlet />
                    </div>
                </Box >

            </>
        );
    }
    else {
        return <UnauthorizedPage />
    }
}
