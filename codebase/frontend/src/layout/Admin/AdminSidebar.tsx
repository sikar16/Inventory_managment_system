import { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
const AdminSidebar = () => {
  const [currentView, setCurrentView] = useState("");
  const handleToggleView = (view: string) => {
    setCurrentView(currentView === view ? "" : view);
  };
  return (
    <>
      <List className="dark:bg-zinc-950 dark:text-white  h-full">
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {/* Dashboard */}
            <li>
              <Link
                to="/admin/dashbord"
                onClick={() => handleToggleView("dashbord")}
              >
                <a
                  className="flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white dark:bg-neutral-700 dark:text-white"
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
              </Link>
            </li>
            {/* department */}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/department-list"
                onClick={() => handleToggleView("user")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                  Department
                </button>
              </Link>
            </li>
            {/* users */}
            <li className="hs-accordion" id="users-accordion">
              <Link to="/admin/user" onClick={() => handleToggleView("user")}>
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
              </Link>
            </li>
            {/* product category */}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/category"
                onClick={() => handleToggleView("category")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
              </Link>
            </li>
            {/* product sub category */}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/sub-category"
                onClick={() => handleToggleView("subcategory")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
              </Link>
            </li>
            {/* product template */}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/template"
                onClick={() => handleToggleView("template")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
              </Link>
            </li>
            {/* products */}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/product"
                onClick={() => handleToggleView("product")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
              </Link>
            </li>
            {/*   Suppliers Category*/}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/suppliers-category"
                onClick={() => handleToggleView("suppliers-category")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                      d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2 2 0 0 0-2-2m-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2M19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2M9 2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M8 26a2 2 0 1 1-2-2a2 2 0 0 1 2 2M3 10V4h6l.002 6z"
                    ></path>
                  </svg>
                  Suppliers Category
                </button>
              </Link>
            </li>
            {/* suppliers */}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/suppliers"
                onClick={() => handleToggleView("suppliers")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                      d="M4 26h4v4H4zm10 0h4v4h-4zm10 0h4v4h-4zm1-8h-8v-2h-2v2H7c-1.103 0-2 .898-2 2v4h2v-4h8v4h2v-4h8v4h2v-4c0-1.102-.897-2-2-2M20 2h-8c-1.103 0-2 .898-2 2v8c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V4c0-1.102-.897-2-2-2m-1.414 2L12 10.586V4zm-5.172 8L20 5.414L20.001 12z"
                    ></path>
                  </svg>
                  Suppliers
                </button>
              </Link>
            </li>

            {/*   Store */}
            <li className="hs-accordion" id="users-accordion">
              <Link to="/admin/store" onClick={() => handleToggleView("store")}>
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                  store
                </button>
              </Link>
            </li>
            {/*   Warehouse*/}
            {/* <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/warehouse"
                onClick={() => handleToggleView("warehouse")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                  Warehouse
                </button>
              </Link>
            </li> */}

            {/*   Report*/}
            <li className="hs-accordion" id="users-accordion">
              <Link
                to="/admin/report"
                onClick={() => handleToggleView("report")}
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                    <g fill="currentColor">
                      <path d="M25 5h-.17v2H25a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.17V5H7a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3"></path>
                      <path d="M23 3h-3V0h-8v3H9v6h14zm-2 4H11V5h3V2h4v3h3z"></path>
                      <path
                        d="M10 13h12v2H10zm0 5h12v2H10zm0 5h12v2H10z"
                        className="ouiIcon__fillSecondary"
                      ></path>
                    </g>
                  </svg>
                  Report
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </List>
    </>
  );
};

export default AdminSidebar;
