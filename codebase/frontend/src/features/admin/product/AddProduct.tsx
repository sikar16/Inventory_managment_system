import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useAddNewProductMutation } from '../../../services/product_service';

interface AddProductProps {
    handleCloseDialog: () => void;
    productCategorys: any[];
    templates: any[];
    productSubCategorys: any[];
    close
}

const AddProduct: React.FC<AddProductProps> = ({ onAddProduct, productCategorys, productSubCategorys, templates, close }) => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [template, setTemplate] = useState('');
    const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
    const [customCategory, setCustomCategory] = useState('');
    const [customSubCategory, setCustomSubCategory] = useState('');
    const [customTemplate, setCustomTemplate] = useState('');
    const [addproduct, { isSuccess: isAddSuccess }] = useAddNewProductMutation();

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
            category: category === 'Other' ? customCategory : category,
            subCategory: subCategory === 'Other' ? customSubCategory : subCategory,
            template: template === 'Other' ? customTemplate : template,
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
                    {productCategorys.map((cat) => (
                        <MenuItem key={cat.id} value={cat.name}>
                            {cat.name}
                        </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                {category === 'Other' && (
                    <TextField
                        label="Enter Custom Category"
                        variant="outlined"
                        size="small"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full"
                    />
                )}
                <InputLabel id="subCategory-label">Sub Category</InputLabel>
                <Select
                    labelId="subCategory-label"
                    className="w-full"
                    variant="outlined"
                    size="small"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}>
                    {productSubCategorys.map((sub) => (
                        <MenuItem key={sub.id} value={sub.name}>
                            {sub.name}
                        </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                {subCategory === 'Other' && (
                    <TextField
                        label="Enter Custom Sub-Category"
                        variant="outlined"
                        size="small"
                        value={customSubCategory}
                        onChange={(e) => setCustomSubCategory(e.target.value)}
                        className="w-full"
                    />
                )}
                <InputLabel id="template-label">Template</InputLabel>
                <Select
                    labelId="template-label"
                    className="w-full"
                    variant="outlined"
                    size="small"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}>
                    {templates.map((temp) => (
                        <MenuItem key={temp.id} value={temp.name}>
                            {temp.name}
                        </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                {template === 'Other' && (
                    <TextField
                        label="Enter Custom Template"
                        variant="outlined"
                        size="small"
                        value={customTemplate}
                        onChange={(e) => setCustomTemplate(e.target.value)}
                        className="w-full"
                    />
                )}
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
                        <Button variant="outlined" color="error" onClick={close}>
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
