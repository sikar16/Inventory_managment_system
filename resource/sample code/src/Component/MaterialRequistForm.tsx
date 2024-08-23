import React from 'react';
import Button from '@mui/material/Button';

function MaterialRequistForm() {
    return (
        <>
            <div className="flex items-center justify-center bg-white w-[700px]">
                <div className="bg-white w-full  ">
                    <div className="">
                        <div className="">
                            <table className='w-full '>
                                <div className='grid grid-cols-2 w-full'>
                                    <tr className='w-full'>
                                        <td>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        </td>
                                        <td>
                                            <div className="w-full ">
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        </td>
                                        <td>
                                            <input
                                                type="email"
                                                id="email"
                                                className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            />
                                        </td>
                                    </tr>
                                </div>
                                <div className='grid grid-cols-2 w-full'>
                                    <tr className=''>
                                        <td>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        </td>
                                        <td>
                                            <div className="w-full ">
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        </td>
                                        <td>
                                            <input
                                                type="email"
                                                id="email"
                                                className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                            />
                                        </td>
                                    </tr>
                                </div>

                            </table>

                        </div>
                        <div className='pt-10 '>
                            <div className='flex justify-end gap-5'>
                                <Button variant="outlined" color="error">
                                    Discard
                                </Button>
                                <button
                                    type="button"
                                    className='bg-[#002a47] py-1 px-3 text-white rounded-md'
                                >
                                    Add template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default MaterialRequistForm;
