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
    templates: { id: number; name: string }[];
    productSubCategorys: any[];
    close: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ productCategorys, productSubCategorys, templates, close }) => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [template, setTemplate] = useState<{ id: number; name: string } | string>(''); // State for template
    const [attributes, setAttributes] = useState<{ key: string, value: string, templateAttributeId: number }[]>([]);
    const [customCategory, setCustomCategory] = useState('');
    const [customSubCategory, setCustomSubCategory] = useState('');
    const [customTemplate, setCustomTemplate] = useState('');
    const [subcategoryId, setSubCategoryId] = useState<number | null>(null);

    const [addProduct, { isSuccess: isAddSuccess }] = useAddNewProductMutation();

    const handleAddAttribute = () => {
        setAttributes([...attributes, { key: '', value: '', templateAttributeId: -1 }]); // -1 or some default value
    };

    const handleAttributeChange = (index: number, field: 'key' | 'value' | 'templateAttributeId', value: any) => {
        const updatedAttributes = attributes.map((attr, i) =>
            i === index ? { ...attr, [field]: value } : attr
        );
        setAttributes(updatedAttributes);
    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setCategory(value);
    };

    const handleSubCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setSubCategory(value);
        const selectedSubCategory = productSubCategorys.find(sub => sub.name === value);
        if (selectedSubCategory) {
            setSubCategoryId(selectedSubCategory.id);
        } else {
            setSubCategoryId(null);
        }
    };

    const handleTemplateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value;
        if (value === 'Other') {
            setTemplate('Other');
        } else {
            const selectedTemplate = templates.find(temp => temp.id === value);
            if (selectedTemplate) {
                setTemplate(selectedTemplate);
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            name: productName,
            category: category === 'Other' ? customCategory : category,
            subCategory: subCategory === 'Other' ? customSubCategory : subCategory,
            template: typeof template === 'string' ? (template === 'Other' ? customTemplate : template) : template.name,
            attributes,
            subcategoryId: subcategoryId ?? undefined, // Ensure this is a number or undefined
            items: attributes.map(attr => ({
                ...attr,
                templateAttributeId: typeof template === 'object' ? template.id : attr.templateAttributeId
            })) // Ensure this is an array
        };

        // Validate formData before submitting
        if (typeof formData.subcategoryId !== 'number') {
            console.error('subcategoryId must be a number');
            return;
        }
        if (!Array.isArray(formData.items)) {
            console.error('items must be an array');
            return;
        }
        if (formData.items.some(item => typeof item.templateAttributeId !== 'number')) {
            console.error('Each item must have a templateAttributeId as a number');
            return;
        }

        try {
            await addProduct(formData);
            console.log('Product added:', formData);
            if (isAddSuccess) {
                close(); // Close the dialog on success
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className='mx-10 mb-10 w-[400px]'>
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
                    onChange={handleCategoryChange}
                >
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
                    onChange={handleSubCategoryChange}
                >
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
                    value={typeof template === 'object' ? template.id : template}
                    onChange={handleTemplateChange}
                >
                    {templates.map((temp) => (
                        <MenuItem key={temp.id} value={temp.id}>
                            {temp.name}
                        </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                {typeof template === 'string' && template === 'Other' && (
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
                                className="w-full"
                            />
                            <TextField
                                label="Value"
                                variant="outlined"
                                size="small"
                                value={attr.value}
                                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                className="w-full"
                            />
                        </div>
                    ))}
                    <Button onClick={handleAddAttribute} variant="outlined">
                        Add Attribute
                    </Button>
                </div>
                <div className='pt-10'>
                    <div className='flex justify-between'>
                        <Button variant="outlined" color="error" onClick={close}>
                            Discard
                        </Button>
                        <button
                            className='bg-[#002A47] text-white px-6 py-2 rounded-md w-[40%]'                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default AddProduct;
