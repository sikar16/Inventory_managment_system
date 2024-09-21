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
import { ProductCategoryType } from '../../../_types/productCategory_type';
import { ProductSubCategoryType } from '../../../_types/productSubcategory_type';

export default function ProductList() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType>();
    const [openDetails, setOpenDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategoryType>();
    const [selectedSubCategory, setSelectedSubCategory] = useState<ProductSubCategoryType>();
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
                product.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategory === undefined ||
                product.subcategory?.category?.id === selectedCategory?.id) && // Fix the comparison here
            (selectedSubCategory === undefined ||
                product.subcategory?.id === selectedSubCategory?.id) // Fix for subcategory comparison
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
                        value={selectedCategory?.id || ''}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            if (productCategories) {
                                const selectedCategoryObj = productCategories.find((category) => category.id === Number(selectedId));
                                setSelectedCategory(selectedCategoryObj || undefined); // Set the found category or undefined
                            }
                        }}
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
                        value={selectedSubCategory?.id || ''}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            if (productSubCategories) {
                                const selectedSubCategoryObj = productSubCategories.find(
                                    (subCategory) => subCategory.id === Number(selectedId) // Convert to number
                                );
                                setSelectedSubCategory(selectedSubCategoryObj || undefined); // Set the found subcategory or undefined
                            }
                        }}
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
                selectedProduct={selectedProduct || null}
                setSelectedProduct={setSelectedProduct}
                setOpenDetails={setOpenDetails}
            />
            <Dialog open={openDetails} onClose={handleCloseDetails}>
                <div className='flex justify-between'>
                    <DialogTitle><strong>Product Details</strong></DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} color="primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                                <path fill="#002a47" d="m8.401 16.333l-.734-.727L11.266 12L7.667 8.42l.734-.728L12 11.29l3.574-3.597l.734.727L12.709 12l3.599 3.606l-.734.727L12 12.737z"></path>
                            </svg>
                        </Button>
                    </DialogActions>
                </div>
                <DialogContent>
                    {selectedProduct && (
                        <div className='grid grid-cols-2 gap-4'>
                            {/* Product ID */}
                            <p className='text-md'>
                                Product ID: <span className='text-sm'>{selectedProduct.id}</span>
                            </p>

                            {/* Product Name */}
                            <p className='text-md'>
                                Product: <span className='text-sm'>{selectedProduct?.name || 'N/A'}</span>
                            </p>

                            {/* Category */}
                            <p className='text-md'>
                                Category: <span className='text-sm'>{selectedProduct?.subcategory?.category?.name || 'N/A'}</span>
                            </p>

                            {/* Sub Category */}
                            <p className='text-md'>
                                Sub Category: <span className='text-sm'>{selectedProduct?.subcategory?.name || 'N/A'}</span>
                            </p>

                            {/* Template */}
                            <p className='text-md col-span-2'>
                                Template:
                                <span className='text-sm'>
                                    {
                                        Array.isArray(selectedProduct?.templateAttributeType) && selectedProduct.templateAttributeType.length > 0
                                            ? selectedProduct.templateAttributeType.map((k) => k.name).join(', ')
                                            : 'N/A'
                                    }
                                </span>
                            </p>

                            {/* Attributes Section */}
                            <p className='text-md col-span-2 font-semibold'>
                                Attributes:
                            </p>
                            <div className='grid grid-cols-2 gap-4 mt-2 col-span-2'>
                                {selectedProduct.productAttributes && selectedProduct.productAttributes.length > 0 ? (
                                    selectedProduct.productAttributes.map((attribute, index) => (
                                        <p key={index} className='text-sm'>
                                            <span className='font-medium'>{attribute.templateAttribute.name}</span> - {attribute.value}
                                        </p>
                                    ))
                                ) : (
                                    <p className='text-sm col-span-2'>No Attributes Available</p>
                                )}
                            </div>
                        </div>

                    )}
                </DialogContent>
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
