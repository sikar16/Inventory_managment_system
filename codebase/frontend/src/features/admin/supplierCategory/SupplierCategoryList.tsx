import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddSupplierCategory from './AddSupplierCategory';
import SupplierCategoryTable from './SupplierCategoryTable';
import Title from '../../../component/TablesTitle';
export default function SupplierCategoryList() {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <div className='mt-10 '>
            <Title tableName={"Supplier category"} onClick={handleOpenDialog} />

            <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center '>
                    <p className='me-3 text-gray-500'>Category :</p>
                    <select className='bg-white text-gray-700'>
                        <option value="">Electronics</option>
                        <option value="">Stationary</option>
                        <option value="">Food</option>
                        <option value="">Drink</option>
                    </select>
                </div>
            </div>
            <hr className='w-full text-black bg-black' />
            <div className='my-4 ms-[10%]' >
                <input type="text" placeholder='Search' className='w-[50%] bg-white rounded-2xl py-[5px] px-3' />
            </div>
            <SupplierCategoryTable />
            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add new category</DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" ><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <AddSupplierCategory />
                </DialogContent>
            </Dialog>
        </div>
    );
}
