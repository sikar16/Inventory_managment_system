import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
const categories = ['Electronics', 'Stationary', 'Food', 'Drink'];
const subCategories = ['Computer', 'Mobile'];
const templates = ['Template 1', 'Template 2'];
const AddProduct = ({ onAddProduct }) => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [template, setTemplate] = useState('');
    const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
    const handleAddAttribute = () => {
        setAttributes([...attributes, { key: '', value: '' }]);
    };
    const handleAttributeChange = (index, field, value) => {
        const updatedAttributes = attributes.map((attr, i) =>
            i === index ? { ...attr, [field]: value } : attr
        );
        setAttributes(updatedAttributes);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onAddProduct({
            name: productName,
            category,
            subCategory,
            template,
            attributes
        });
    };
    return (
        <div className='mx-10 mb-10'>
            <form className='space-y-2' onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Product Name"
                    className="w-full"
                    variant="outlined"
                    size="small"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    className="w-full"
                    variant="outlined"
                    size="small"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
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
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}>
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
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}>
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
                                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                                className="w-full" />
                            <TextField
                                label="Value"
                                variant="outlined"
                                size="small"
                                value={attr.value}
                                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                className="w-full" />
                        </div>
                    ))}
                    <Button onClick={handleAddAttribute} variant="outlined">
                        Add
                    </Button>
                </div>
                <div className='pt-10'>
                    <div className='flex justify-between'>
                        <Button variant="outlined" color="error">
                            Discard
                        </Button>
                        <button
                            type="submit"
                            className='bg-[#002a47] py-1 px-3 text-white rounded-md'>
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
