import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
import UserList from './UserList';
import TemplateList from './TemplateList';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import SubCategoryList from './SubCategoryList';
import SupplierList from './SuppliersList';
import SupplierCategoryList from './SupplierCategoryList';
import WareHouseList from './WareHouseList';
import Analaysis from './Analaysis';
import { RiAccountCircleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function AdminDashbord() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentView, setCurrentView] = React.useState('');

    const handleToggleView = (view) => {
        setCurrentView(currentView === view ? '' : view);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MenuIcon />
            <AppBar>
                <div className=' ps-4 p-3 flex justify-between bg-[#002A47] w-full pe-14'>
                    <div className='flex gap-2 align-middle items-center text-center'>
                        <MenuIcon onClick={handleDrawerOpen} />
                        <img src={logo} alt="" className='w-24 md:w-40' />
                    </div>
                    <div className='flex gap-3 me-5 align-middle items-center '>
                        <IoNotificationsOutline className='w-[22px] h-[22px]' />
                        <RiAccountCircleLine className='w-[25px] h-[25px] cursor-pointer' onClick={() => navigate('/profile')} />
                    </div>
                </div>
            </AppBar>

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
                        <img src={logo} alt="" className='w-24 md:w-40 ' />
                    </div>
                    <div>
                        <IconButton onClick={handleDrawerClose} className='text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="#d1d5db" d="M16.88 2.88a1.25 1.25 0 0 0-1.77 0L6.7 11.29a.996.996 0 0 0 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"></path></svg>
                        </IconButton>
                    </div>
                </div>
                <Divider />
                <List>
                    <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                        <ul className="space-y-1.5">
                            <li>
                                <Link to='/admin/analysis' onClick={() => handleToggleView('analysis')}>
                                    <a className="flex items-center gap-x-3.5 py-[5px] px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white dark:bg-neutral-700 dark:text-white" href="#">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                        Dashboard
                                    </a>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion" >
                                <Link to='/admin/user-list' onClick={() => handleToggleView('users')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                        Users
                                    </button>

                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion">
                                <Link to='/admin/product-list' onClick={() => handleToggleView('products')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 9.5q-.425 0-.712-.288T11 8.5t.288-.712T12 7.5t.713.288T13 8.5t-.288.713T12 9.5M11 6V1h2v5zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.4 7.95q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.713-.975T5.25 14.05L6.6 11.6L3 4z"></path></svg>
                                        Products
                                    </button>

                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion" >
                                <Link to='/admin/category-list' onClick={() => handleToggleView('categorys')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"></path></svg>
                                        Category
                                    </button>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion" >
                                <Link to='/admin/subCategory-list' onClick={() => handleToggleView('subCategorys')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2"></path></svg>
                                        Sub Category
                                    </button>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion">
                                <Link to='/admin/template-list' onClick={() => handleToggleView('templates')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="currentColor" d="M26 6v4H6V6zm0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M10 16v10H6V16zm0-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2m16 2v10H16V16zm0-2H16a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2"></path></svg>
                                        Template
                                    </button>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion">
                                <Link to='/admin/suppliers-list' onClick={() => handleToggleView('suppliers')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="currentColor" d="M4 26h4v4H4zm10 0h4v4h-4zm10 0h4v4h-4zm1-8h-8v-2h-2v2H7c-1.103 0-2 .898-2 2v4h2v-4h8v4h2v-4h8v4h2v-4c0-1.102-.897-2-2-2M20 2h-8c-1.103 0-2 .898-2 2v8c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V4c0-1.102-.897-2-2-2m-1.414 2L12 10.586V4zm-5.172 8L20 5.414L20.001 12z"></path></svg>
                                        Suppliers
                                    </button>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion">
                                <Link to='/admin/supplierCategory-list' onClick={() => handleToggleView('suppliersCategorys')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="currentColor" d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2 2 0 0 0-2-2m-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2M19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2M9 2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M8 26a2 2 0 1 1-2-2a2 2 0 0 1 2 2M3 10V4h6l.002 6z"></path></svg>
                                        Suppliers Category
                                    </button>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion">
                                <Link to='/admin/wareHouse-list' onClick={() => handleToggleView('warehouses')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16z"></path></svg>
                                        Store
                                    </button>
                                </Link>
                            </li>
                            <li className="hs-accordion" id="users-accordion">
                                <Link to='/admin/category-list' onClick={() => handleToggleView('products')}>
                                    <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><g fill="currentColor"><path d="M25 5h-.17v2H25a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.17V5H7a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3"></path><path d="M23 3h-3V0h-8v3H9v6h14zm-2 4H11V5h3V2h4v3h3z"></path><path d="M10 13h12v2H10zm0 5h12v2H10zm0 5h12v2H10z" className="ouiIcon__fillSecondary"></path></g></svg>
                                        Report
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </List>
                <Divider />
                <ul className='m-auto text-center align-middle  p-1 rounded-sm '>
                    <li className="hs-accordion flex  text-center align-middle items-center rounded-lg hover:bg-[#002A47] hover:text-white px-3" id="users-accordion" >
                        <svg className='size-7' xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75" clipRule="evenodd"></path><path fill="currentColor" d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"></path></svg>                           <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg  focus:outline-none" aria-expanded="true" aria-controls="users-accordion">
                            Logout
                        </button>
                    </li>
                </ul>
            </Drawer>
            <Main open={open} >
                <DrawerHeader />

                {currentView === 'analysis' && <Analaysis />}
                {currentView === 'users' && <UserList />}
                {currentView === 'products' && <ProductList />}
                {currentView === 'categorys' && <CategoryList />}
                {currentView === 'subCategorys' && <SubCategoryList />}
                {currentView === 'templates' && <TemplateList />}
                {currentView === 'suppliers' && <SupplierList />}
                {currentView === 'suppliersCategorys' && <SupplierCategoryList />}
                {currentView === 'warehouses' && <WareHouseList />}
            </Main>
        </Box>
    );
}


