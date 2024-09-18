import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddSupplierCategory from './AddSupplierCategory';
import SupplierCategoryTable from './SupplierCategoryTable';
import Title from '../../../component/TablesTitle';
import { useGetAllsupplierCategoryQuery } from '../../../services/supplierCategoryService';
import Loader from '../../../component/Loading';

export default function SupplierCategoryList() {
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const {
        isError: isCategoryError,
        isLoading: isCategoryLoading,
        isSuccess: isCategorySuccess,
        data: categories,
        error: categoryError,
    } = useGetAllsupplierCategoryQuery("supplier category");

    // Assuming the `useGetAllsupplierCategoryQuery` call should not have 'supplier category'
    // Remove the duplicate query call for `useGetAllsupplierCategoryQuery('supplier category')`
    // and use the `categories` data instead.

    if (isCategoryError) return <h1>Error: {categoryError.toString()}</h1>;
    if (isCategoryLoading) return <Loader />;
    if (isCategorySuccess) {
        // Filter categories based on searchTerm
        const filteredCategories = categories?.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className='mt-10'>
                <Title tableName={"Supplier category"} action={"Add category"} onClick={handleOpenDialog} />

                <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                        <p className='me-3 text-gray-500'>Category :</p>
                        <select className='bg-[#F5F5F5] text-gray-700'>
                            {filteredCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr className='w-full text-black bg-black' />
                <div className='my-4 justify-center flex'>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-[90%] bg-white dark:bg-[#313131] rounded-md py-[5px] px-3 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <SupplierCategoryTable suppliersCategorylist={filteredCategories} />
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <div className='flex justify-between me-5'>
                        <DialogTitle>Add new category</DialogTitle>
                        <DialogActions>
                            <svg
                                onClick={handleCloseDialog}
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                                ></path>
                            </svg>
                        </DialogActions>
                    </div>
                    <DialogContent>
                        <AddSupplierCategory handleCloseDialog={handleCloseDialog} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
