import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddSuppliers from './AddSuppliers';
import SupplierTable from './SupplierTable';
export default function SupplierList() {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <div className='mt-10'>
            <div>
                <div className='flex justify-between mb-3 mx-2'>
                    <p className='text-[#002a47] text-4xl font-medium'>Suppliers</p>
                    <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={handleOpenDialog}>Add Supplier</button>
                </div>
            </div>
            <hr className='w-full text-black bg-black' />
            <div className='my-4'>
                <input type="text" placeholder='Search' className='w-[80%] bg-[#f5f5f5] rounded-md py-[5px] px-3' />
            </div>
            <SupplierTable />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add new supplier</DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <AddSuppliers />
                </DialogContent>
            </Dialog>
        </div>
    );
}
