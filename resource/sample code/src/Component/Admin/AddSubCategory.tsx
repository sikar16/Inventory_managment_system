import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const categories = ['Electronics', 'Stationary', 'Food', 'Drink'];
const subCategories = ['Computer', 'Mobile'];

export default function AddSubCategory() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [customSubCategory, setCustomSubCategory] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedSubCategory(value);
        if (value !== 'Other') {
            setCustomSubCategory(''); // Clear custom input if a predefined subcategory is selected
        }
    };

    const handleCustomSubCategoryChange = (event) => {
        setCustomSubCategory(event.target.value);
    };

    const handleAddCategory = () => {
        const subCategoryToAdd = selectedSubCategory === 'Other' && customSubCategory
            ? customSubCategory
            : selectedSubCategory;
        console.log('Category:', selectedCategory);
        console.log('Sub Category Added:', subCategoryToAdd);
    };

    return (
        <div className='mx-10 mb-10'>
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
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div>
                    <InputLabel id="subCategory-label">Sub Category</InputLabel>
                    <Select
                        labelId="subCategory-label"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2 mb-3"
                        value={selectedSubCategory}
                        onChange={handleSubCategoryChange}
                    >
                        {subCategories.map((sub) => (
                            <MenuItem key={sub} value={sub}>
                                {sub}
                            </MenuItem>
                        ))}
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>

                    {selectedSubCategory === 'Other' && (
                        <TextField
                            label="New Sub Category"
                            variant="outlined"
                            size="small"
                            className="w-full mt-2"
                            value={customSubCategory}
                            onChange={handleCustomSubCategoryChange}
                        />
                    )}
                </div>

                <div className='pt-10'>
                    <div className='flex justify-between gap-5'>
                        <Button variant="outlined" color="error">
                            Discard
                        </Button>
                        <button className='bg-[#002a47] py-1 px-3 text-white rounded-md' onClick={handleAddCategory} >
                            Add Sub Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
