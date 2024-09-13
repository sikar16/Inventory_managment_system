import { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List';

const GeneralManagerSidebar = () => {
    const [currentView, setCurrentView] = useState('');

    const handleToggleView = (view: string) => {
        setCurrentView(currentView === view ? '' : view);
    };

    return (
        <>
            <List >
                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li>
                            <Link to='/manager/dashbord' onClick={() => handleToggleView('dashbord')}>
                                <a className="flex items-center gap-x-3.5 py-[5px] px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white dark:bg-neutral-700 dark:text-white" href="#">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    Dashboard
                                </a>
                            </Link>
                        </li>
                        <li className="hs-accordion" id="users-accordion">
                            <Link to='/manager/purchase-requests' onClick={() => handleToggleView('purchase-requests')}>
                                <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 9.5q-.425 0-.712-.288T11 8.5t.288-.712T12 7.5t.713.288T13 8.5t-.288.713T12 9.5M11 6V1h2v5zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.4 7.95q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.713-.975T5.25 14.05L6.6 11.6L3 4z"></path></svg>
                                    Purchase requests
                                </button>

                            </Link>
                        </li>
                        <li className="hs-accordion" id="users-accordion" >
                            <Link to='/manager/purchase-order' onClick={() => handleToggleView('purchase-order')}>
                                <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8zM17.5 20q1.05 0 1.775-.725T20 17.5t-.725-1.775T17.5 15t-1.775.725T15 17.5t.725 1.775T17.5 20M5 19.5h4v-4H5zM10.05 9h3.9L12 5.85zm7.45 8.5"></path></svg>
                                    Purchase orders
                                </button>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </List>
        </>
    )
}

export default GeneralManagerSidebar