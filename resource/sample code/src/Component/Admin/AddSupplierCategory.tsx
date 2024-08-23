import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const categories = ['Electronics', 'Stationary', 'Food', 'Drink'];

export default function AddSupplierCategory() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleCustomCategoryChange = (event) => {
        setCustomCategory(event.target.value);
    };

    const handleAddCategory = () => {
        const categoryToAdd = selectedCategory === 'Other' && customCategory ? customCategory : selectedCategory;
        console.log('Category Added:', categoryToAdd);
    };

    return (
        <div className='mx-10 mb-10 w-[350px]'>
            <form className='space-y-2'>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={selectedCategory}
                    onChange={handleSelectChange}
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                </Select>

                {selectedCategory === 'Other' && (
                    <TextField
                        label="New Category"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={customCategory}
                        onChange={handleCustomCategoryChange}
                    />
                )}

                <div className='pt-10 '>
                    <div className='flex justify-between gap-5'>
                        <Button variant="outlined" color="error">
                            Discard
                        </Button>
                        <button
                            type="button"
                            className='bg-[#002a47] py-1 px-3 text-white rounded-md'
                            onClick={handleAddCategory}
                        >
                            Add Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
