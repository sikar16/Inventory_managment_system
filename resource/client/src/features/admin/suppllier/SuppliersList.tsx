import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddSuppliers from './AddSuppliers';
import SupplierTable from './SupplierTable';
import Title from '../../../component/TablesTitle';
import { useGetAllsupplierQuery } from '../../../services/supplier_service';
import Loading from '../../../component/Loading';
import { SupplierType } from '../../../_types/supplier_type';

export default function SupplierList() {
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const { isError, isLoading, error, data } = useGetAllsupplierQuery('supplier');

    if (isError) return <h1>Error: {error.toString()}</h1>;
    if (isLoading) return <Loading />;

    // Filter suppliers based on searchTerm
    const filteredSuppliers = (data as SupplierType[])?.filter((supplier) => {
        const category = (supplier.category.name as string)?.toLowerCase() || '';
        const fullName = (supplier.fullName as string)?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        return category.includes(search) || fullName.includes(search);
    });
    return (
        <div className='mt-10'>
            <div>
                <Title tableName={"Supplier"} action={"Add supplier"} onClick={handleOpenDialog} />
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
            <SupplierTable supplierslist={filteredSuppliers} />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add new supplier</DialogTitle>
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
                    <AddSuppliers handleCloseDialog={handleCloseDialog} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
