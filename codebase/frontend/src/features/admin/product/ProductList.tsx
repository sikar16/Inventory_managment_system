import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddProduct from './AddProduct';
import Title from '../../../component/TablesTitle';
import { useState } from 'react';
import ProductTable from './ProductTable';
import { useGetAllproductQuery } from '../../../services/product_service';
import Loader from '../../../component/Loading';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce';
import { useGetAllproductSubCategoryQuery } from '../../../services/productSubcategory_service';
import { useGetAlltemplateQuery } from '../../../services/template_service';
import { ProductType } from '../../../_types/product_type';

export default function ProductList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType>();
    const [openDetails, setOpenDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(undefined);
    const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined);

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const { isError: isProductError, isLoading: isProductLoading, data: products, error: productError } = useGetAllproductQuery('product');
    const { isError: isCategoryError, isLoading: isCategoryLoading, data: productCategories, error: categoryError } = useGetAllproductCategoryQuery();
    const { isError: isSubCategoryError, isLoading: isSubCategoryLoading, data: productSubCategories, error: subCategoryError } = useGetAllproductSubCategoryQuery("product subcategory");
    const { isError: isTemplateError, isLoading: isTemplateLoading, data: templates, error: templateError } = useGetAlltemplateQuery("template");

    if (
        isProductError ||
        isCategoryError ||
        isSubCategoryError ||
        isTemplateError
    ) {
        return (
            <h1>
                Error:{" "}
                {(
                    productError ||
                    categoryError ||
                    subCategoryError ||
                    templateError
                )?.toString() || "No errors"}
            </h1>
        );
    }
    if (
        isProductLoading ||
        isCategoryLoading ||
        isSubCategoryLoading ||
        isTemplateLoading
    ) {
        return <Loader />;
    }

    const filteredProducts = products?.filter(
        (product: ProductType) =>
            (searchTerm === "" ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategory === undefined ||
                product.category.name === selectedCategory) &&
            (selectedSubCategory === undefined ||
                product.subcategory.name === selectedSubCategory)
    );

    // console.log(filteredProducts);

    return (
        <div className='mt-10'>
            <Title tableName='Product' action={"Add product"} onClick={handleOpenDialog} />
            <div className='flex flex-wrap gap-2 mt-10 mb-5'>
                <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                    <p className='me-3 text-gray-500'>Category :</p>
                    <select
                        className='bg-[#faf9f9] text-gray-700'
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {productCategories && productCategories.map((productCategory) => (
                            <option key={productCategory.id} value={productCategory.id}>
                                {productCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                    <p className='me-3 text-gray-500'>Sub Category :</p>
                    <select
                        className='bg-[#faf9f9] text-gray-700'
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                    >
                        <option value="">All Subcategories</option>
                        {productSubCategories && productSubCategories.map((productSubCategory) => (
                            <option key={productSubCategory.id} value={productSubCategory.id}>
                                {productSubCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='bg-white px-3 py-3 rounded-md mb-2 flex items-center'>
                    <p className='me-3 text-gray-500'>Template :</p>
                    <select
                        className='bg-[#faf9f9] text-gray-700'
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                        <option value="">All Templates</option>
                        {templates && templates.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <hr className='w-full text-black bg-black' />
            <div className='my-4'>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-white dark:bg-[#313131] rounded-md py-[5px] px-3 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ProductTable
                productList={filteredProducts || []}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                setOpenDetails={setOpenDetails}
            />
            <Dialog open={openDetails} onClose={handleCloseDetails}>
                <DialogTitle><strong>Product Details</strong></DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <div className='grid grid-cols-2 gap-4'>
                            <p className='text-md'> Product ID: <span className='text-sm'>{selectedProduct.id}</span> </p>
                            <p className='text-md'>Product: <span className='text-sm'>{selectedProduct.name} </span></p>
                            <p className='text-md'>Category: <span className='text-sm'>{selectedProduct.category.name} </span></p>
                            <p className='text-md'>Template: <span className='text-sm'> </span></p>
                            <p className='text-md'>Attributes:
                                <div className='grid grid-cols-2 w-full text-sm gap-2 mt-2'>
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                            <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
                        </svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <AddProduct handleCloseDialog={() => {
                        console.log("data");
                    }} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
