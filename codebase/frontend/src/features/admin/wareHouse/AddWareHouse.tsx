import Button from '@mui/material/Button';

function AddWareHouse() {
    return (
        <div className="flex items-center justify-center bg-white w-[450px]">
            <div className="bg-white w-full  ">
                <div className="">
                    <div className="">
                        <table className='w-full '>
                            <tr className=''>
                                <td>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700"> Name</label>
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
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                </td>
                                <td><input
                                    type="text"
                                    id="country"
                                    className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="city"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="subCity" className="block text-sm font-medium text-gray-700">Sub-city</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="subcity"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="wereda" className="block text-sm font-medium text-gray-700">Wereda</label>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id="wereda"
                                        className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                                    />
                                </td>
                            </tr>
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
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddWareHouse;
