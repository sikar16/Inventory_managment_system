import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce';
import { ProductCategoryType } from '../../../_types/productCategory_type';

export default function AddSubCategory() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [customSubCategory, setCustomSubCategory] = useState('');
    const { isError, isLoading, isSuccess, data, error } = useGetAllproductCategoryQuery('productCategory');
    const categories: ProductCategoryType[] = isSuccess ? data : [];
    console.log(categories)

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleCustomSubCategoryChange = (event) => {
        setCustomSubCategory(event.target.value);
    };

    const handleAddSubCategory = (e) => {
        e.preventDefault()
        const subCategoryToAdd = selectedSubCategory === 'Other' && customSubCategory
            ? customSubCategory
            : selectedSubCategory;
        console.log('Category:', selectedCategory);
        console.log('Sub Category Added:', subCategoryToAdd);
    };

    return (
        <div className='mx-10 mb-10  w-[450px]'>
            <form className='space-y-4'>
                <div>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div>
                    <InputLabel id="subCategory-label">Sub Category</InputLabel>
                    <TextField
                        label="New Sub Category"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={customSubCategory}
                        onChange={handleCustomSubCategoryChange}
                    />
                </div>

                <div className='pt-10'>
                    <div className='flex justify-between gap-5'>
                        <Button variant="outlined" color="error">
                            Discard
                        </Button>
                        <button className='bg-[#002a47] py-1 px-3 text-white rounded-md' onClick={handleAddSubCategory} >
                            Add Sub Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
