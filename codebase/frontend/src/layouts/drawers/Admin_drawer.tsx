import React from 'react'
// assets
import logo from "../../assets/images/logo.png";
import supplier from "../../assets/images/supplier.png";
import supplierCaategory from "../../assets/images/supplierCategory.png";

//icon
import { TbReportAnalytics } from "react-icons/tb";

// mui
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
const drawerWidth = 240;
function Admin_drawer() {
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div className="dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white py-3 flex justify-between px-2 text-center align-middle items-center">
        <div className="w-full ">
          <img src={logo} alt="" className="w-24 md:w-40 " />
        </div>
        <div>
          <IconButton onClick={handleDrawerClose} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
            >
              <path
                fill="#d1d5db"
                d="M16.88 2.88a1.25 1.25 0 0 0-1.77 0L6.7 11.29a.996.996 0 0 0 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"
              ></path>
            </svg>
          </IconButton>
        </div>
      </div>
      <Divider />
      <List className="dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white">
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <a
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                href="#"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Dashboard
              </a>
            </li>

            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Users
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 9.5q-.425 0-.712-.288T11 8.5t.288-.712T12 7.5t.713.288T13 8.5t-.288.713T12 9.5M11 6V1h2v5zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.4 7.95q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.713-.975T5.25 14.05L6.6 11.6L3 4z"
                  ></path>
                </svg>
                Products
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"
                  ></path>
                </svg>
                Category
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2"
                  ></path>
                </svg>
                Sub Category
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M26 6v4H6V6zm0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M10 16v10H6V16zm0-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2m16 2v10H16V16zm0-2H16a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2"
                  ></path>
                </svg>
                Template
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <img className="size-4" src={supplier} alt="" />
                Suppliers
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <img className="size-4" src={supplierCaategory} alt="" />
                Suppliers Category
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16z"
                  ></path>
                </svg>
                Store
              </button>
            </li>
            <li className="hs-accordion" id="users-accordion">
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
                aria-expanded="true"
                aria-controls="users-accordion"
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 18H6v-4h6m9 0v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6m0-10H4v2h16z"
                  ></path>
                </svg>
                Report
              </button>
            </li>
          </ul>
        </nav>
      </List>
      <Divider />
      <ul className=" dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white m-auto text-center align-middle rounded-sm">
        <li
          className="hs-accordion flex  text-center align-middle items-center"
          id="users-accordion"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="black"
              fillRule="evenodd"
              d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75"
              clipRule="evenodd"
            ></path>
            <path
              fill="black"
              d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"
            ></path>
          </svg>
          <button
            type="button"
            className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm rounded-lg hover:text-blue-800 dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white"
            aria-expanded="true"
            aria-controls="users-accordion"
          >
            Logout
          </button>
        </li>
      </ul>
    </Drawer>
  );
}

export default Admin_drawer
