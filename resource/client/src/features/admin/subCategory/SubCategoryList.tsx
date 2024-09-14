import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddSubCategory from './AddSubCategory';
import SubCategoryTable from './SubCategoryTable';
import Title from '../../../component/TablesTitle';
import Loader from '../../../component/Loading';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce';
import { useGetAllproductSubCategoryQuery } from '../../../services/productSubcategory_service';

export default function SubCategoryList() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    // Fetch categories and subcategories data
    const {
        isError: isCategoryError,
        isLoading: isCategoryLoading,
        isSuccess: isCategorySuccess,
        data: categories,
        error: categoryError,
    } = useGetAllproductCategoryQuery("product category");

    const {
        data: subCategories,
        isError: isSubCategoryError,
        isLoading: isSubCategoryLoading,
        error: subCategoryError,
        isSuccess: isSubCategorySuccess,
    } = useGetAllproductSubCategoryQuery("product subcategory");

    if (isCategoryError || isSubCategoryError) {
        return (
            <h1>
                Error: {isCategoryError ? categoryError?.toString() : subCategoryError?.toString() || "Unknown error"}
            </h1>
        );
    }
    if (isCategoryLoading || isSubCategoryLoading) {
        return <Loader />;
    }

    // Filter subCategories based on searchTerm
    const filteredSubCategories = subCategories?.filter(subCategory =>
        subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isCategorySuccess && isSubCategorySuccess) {
        return (
            <div className='mt-10'>
                <Title tableName={"Sub category"} action={"Add sub-category"} onClick={handleOpenDialog} />

                <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                        <p className='me-3 text-gray-500'>Category:</p>
                        <select className='bg-[#F5F5F5] text-gray-700'>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                        <p className='me-3 text-gray-500'>Sub Category:</p>
                        <select className='bg-[#F5F5F5] text-gray-700'>
                            {filteredSubCategories?.map((subCategory) => (
                                <option key={subCategory.id} value={subCategory.id}>
                                    {subCategory.name}
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
                <SubCategoryTable subcategoryList={filteredSubCategories || []} />
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <div className='flex justify-between me-5'>
                        <DialogTitle>Add new sub category</DialogTitle>
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
                        <AddSubCategory handleCloseDialog={handleCloseDialog} />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    return null;
}
