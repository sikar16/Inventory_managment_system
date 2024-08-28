import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddCategory from './AddCategory';
import { useState } from 'react';
import CategoryTable from './CategoryTable';
import Title from '../../../component/TablesTitle';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce';
import Loading from '../../../component/Loading';

export default function CategoryList() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const { isError, isLoading, isSuccess, data, error } = useGetAllproductCategoryQuery('productCategory');

    // console.log(data)
    if (isError) {
        return (
            <div>
                <h1>Error: {error?.message || 'An error occurred'}</h1>
            </div>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isSuccess) {
        return (
            <div className='mt-10'>
                <Title tableName="Category" action="Add Category" onClick={handleOpenDialog} />

                <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                        <p className='me-3 text-gray-500'>Category :</p>
                        <select className='text-gray-700'>
                            {/* {data.map((category: ProductCategoryType) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))} */}
                        </select>
                    </div>
                </div>

                <hr className='w-full text-black bg-black' />

                <div className='my-4'>
                    <input type="text" placeholder='Search' className='w-[50%] bg-white rounded-2xl py-[5px] px-3' />
                </div>

                <CategoryTable productCategorylist={data} />

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>
                        Add new category
                    </DialogTitle>
                    <DialogContent>
                        <AddCategory handleCloseDialog={handleCloseDialog} />
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleCloseDialog} className='p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                                <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path>
                            </svg>
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return null; // Fallback in case none of the conditions are met
}
