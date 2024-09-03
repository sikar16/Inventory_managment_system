import { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List';

const EmployeeSidebar = () => {
    const [currentView, setCurrentView] = useState('');

    const handleToggleView = (view: string) => {
        setCurrentView(currentView === view ? '' : view);
    };

    return (
        <>
            <List >
                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li className="hs-accordion" id="users-accordion" >
                            <Link to='/employee/requests-list' onClick={() => handleToggleView('requests')}>
                                <button type="button" className="hs-accordion-toggle hs-accordion-active:text-[#002a47] hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-[5px] px-2.5 text-sm text-gray-700 rounded-lg hover:bg-[#002A47] hover:text-white focus:outline-none  dark:bg-neutral-800 dark:text-neutral-400 dark:hs-accordion-active:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" aria-expanded="true" aria-controls="users-accordion">
                                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    Requests-list
                                </button>

                            </Link>
                        </li>

                    </ul>
                </nav>
            </List>
        </>
    )
}

export default EmployeeSidebar