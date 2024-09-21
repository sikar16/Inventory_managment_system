import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddCategory from './AddCategory';
import { useState } from 'react';
import CategoryTable from './CategoryTable';
import Title from '../../../component/TablesTitle';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce'; // Ensure you're importing correctly
import Loading from '../../../component/Loading';
import { useAuth } from '../../../context/AuthContext';
import { ProductCategoryType } from '../../../_types/productCategory_type';

export default function CategoryList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategoryType>();

    const { userData, isAdmin } = useAuth();
    console.log(userData)

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    // Ensure that the query key is consistent
    const { isError, isLoading, isSuccess, data: categories, error } = useGetAllproductCategoryQuery();

    console.log(categories)


    if (isError) {
        return (
            <div>
                <h1>Error: {error?.toString() || 'An error occurred'}</h1>
            </div>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isSuccess) {
        const filteredCategories = categories?.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (isAdmin)
            return (
                <div className='mt-10'>
                    <Title tableName="Category" action="Add Category" onClick={handleOpenDialog} />

                    <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                        <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                            <p className='me-3 text-gray-500'>Category :</p>
                            <select className='bg-[#F5F5F5] text-gray-700'>
                                {filteredCategories?.map((category) => (
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
                            className=" w-[90%] bg-white dark:bg-[#313131] rounded-md py-[5px] px-3 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <CategoryTable
                        productCategorylist={filteredCategories}
                        setAnchorEl={setAnchorEl}
                        anchorEl={anchorEl}
                        selectedCategory={selectedCategory || null}
                        setSelectedCategory={setSelectedCategory}
                    />

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <div className='flex justify-between me-5'>
                            <DialogTitle>
                                Add new category
                            </DialogTitle>
                            <DialogActions>
                                <button onClick={handleCloseDialog} className='p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                                        <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path>
                                    </svg>
                                </button>
                            </DialogActions>
                        </div>
                        <DialogContent>
                            <AddCategory handleCloseDialog={handleCloseDialog} />
                        </DialogContent>
                    </Dialog>
                </div>
            );
    }

    return null;
}
