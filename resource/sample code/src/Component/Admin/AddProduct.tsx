import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const categories = ['Electronics', 'Stationary', 'Food', 'Drink'];
const subCategories = ['Computer', 'Mobile'];
const templates = ['Template 1', 'Template 2'];

export default function AddProduct() {

    const [attributes, setAttributes] = useState([{ key: '', value: '' }]);

    const handleAddAttribute = () => {
        setAttributes([...attributes, { key: '', value: '' }]);
    };




    return (

        <div className='mx-10 mb-10'>
            <form className='space-y-2'>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Product Name"
                    className="w-full"
                    variant="outlined"
                    size="small"

                />
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    className="w-full"
                    variant="outlined"
                    size="small"
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel id="subCategory-label">Sub Category</InputLabel>
                <Select
                    labelId="subCategory-label"
                    className="w-full"
                    variant="outlined"
                    size="small"
                >
                    {subCategories.map((sub) => (
                        <MenuItem key={sub} value={sub}>
                            {sub}
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel id="template-label">Template</InputLabel>
                <Select
                    labelId="template-label"
                    className="w-full"
                    variant="outlined"
                    size="small"
                >
                    {templates.map((temp) => (
                        <MenuItem key={temp} value={temp}>
                            {temp}
                        </MenuItem>
                    ))}
                </Select>
                <div className='w-full'>
                    <p className='mt-4 mb-2'>Attributes</p>
                    {attributes.map((attr, index) => (
                        <div key={index} className='flex gap-4 mb-2'>
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="small"
                                value={attr.key}
                                className="w-full"
                            />
                            <TextField
                                label="Value"
                                variant="outlined"
                                size="small"
                                value={attr.value}
                                className="w-full"
                            />
                        </div>
                    ))}
                    <Button onClick={handleAddAttribute} variant="outlined" >
                        Add
                    </Button>
                </div>
                <div className='pt-10'>
                    <div className='flex justify-between '>
                        <Button variant="outlined" color="error">
                            Discard
                        </Button>
                        <button className='bg-[#002a47] py-1 px-3 text-white rounded-md'  >
                            Add Product
                        </button>
                    </div>
                </div>


            </form>
        </div>
    );
}
