import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddProduct from './AddProduct';
import Title from '../../../component/TablesTitle';
import { useState } from 'react'
import ProductTable from './ProductTable';
import { useGetAllproductQuery } from '../../../services/product_service';
import Loader from '../../../component/Loading';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce';
import { useGetAllproductSubCategoryQuery } from '../../../services/productSubcategory_service';
import { useGetAlltemplateQuery } from '../../../services/template_service';
export default function ProductList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [openDetails, setOpenDetails] = useState(false);
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleViewDetails = () => {
        setOpenDetails(true);
        handleCloseMenu();
    };
    const handleCloseDetails = () => {
        setOpenDetails(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const {
        isError: isproductCategoryError,
        isLoading: isproductCategoryLoading,
        isSuccess: isproductCategorySuccess,
        data: productCategorys,
        error: productCategoryError,
    } = useGetAllproductCategoryQuery();
    const {
        isError: isproductSubCategoryError,
        isLoading: isproductSubCategoryLoading,
        isSuccess: isproductSubCategorySuccess,
        data: productSubCategorys,
        error: productSubCategoryError,
    } = useGetAllproductSubCategoryQuery();
    const {
        isError: istemplateError,
        isLoading: istemplateLoading,
        isSuccess: istemplateSuccess,
        data: templates,
        error: templateError,
    } = useGetAlltemplateQuery();

    const { isError, isLoading, isSuccess, error, data } = useGetAllproductQuery('product')
    console.log(data)
    if (isError) return <h1>Error :{error.toString()}</h1>
    if (isLoading) return <Loader />
    if (isSuccess)
        return (
            <div className='mt-10'>
                <Title tableName='Product' action={"Add product"} onClick={handleOpenDialog} />
                <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center '>
                        <p className='me-3 text-gray-500'>Category :</p>
                        <select className='bg-[#F5F5F5] text-gray-700'>
                            {productCategorys.map((productCategory) => (
                                <option key={productCategory.id} value={productCategory.id}>
                                    {productCategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center '>
                        <p className='me-3 text-gray-500'>Sub Category :</p>
                        <select className='bg-[#F5F5F5] text-gray-700'>
                            {productSubCategorys.map((productSubCategory) => (
                                <option key={productSubCategory.id} value={productSubCategory.id}>
                                    {productSubCategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center '>
                        <p className='me-3 text-gray-500'>Template :</p>
                        <select className='bg-[#F5F5F5] text-gray-700'>
                            {templates.map((template) => (
                                <option key={template.id} value={template.id}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <hr className='w-full text-black bg-black' />
                <div className='my-4'>
                    <input type="text" placeholder='Search' className='w-[80%] bg-white rounded-xl py-[5px] px-3' />
                </div>
                <ProductTable
                    productList={data}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    setOpenDetails={setOpenDetails}
                />
                <Dialog open={openDetails} onClose={handleCloseDetails} className=''>
                    <DialogTitle> <strong>Product Details</strong></DialogTitle>
                    <DialogContent>
                        {selectedProduct && (
                            <div className=' grid grid-cols-2 gap-4'>
                                <p className='text-md'> Product ID: <span className='text-sm'>{selectedProduct.productId}</span> </p>
                                <p className='text-md'>Product: <span className='text-sm'>{selectedProduct.product} </span></p>
                                <p className='text-md'>Category: <span className='text-sm'>{selectedProduct.category} </span></p>
                                <p className='text-md'>Template: <span className='text-sm'>Mobile </span></p>
                                <p className='text-md '>Attributes:
                                    <div className='grid grid-cols-2 w-full text-sm  gap-2 mt-2 '>
                                        <p className='ms-3'>RAM  - 8GB</p>
                                        <p className='ms-3'>ROM  - 8GB</p>
                                        <p className='ms-3'>Graphics  - 8GB</p>
                                        <p className='ms-3'>Screen size  - 8GB</p>
                                    </div>
                                </p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialog} onClose={handleCloseDialog} >
                    <div className='flex justify-between me-5'>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogActions>
                            <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                        </DialogActions>
                    </div>
                    <DialogContent>
                        <AddProduct onAddProduct={AddProduct}
                            productCategorys={productCategorys}
                            productSubCategorys={productSubCategorys}
                            templates={templates}
                            close={handleCloseDialog}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
}
