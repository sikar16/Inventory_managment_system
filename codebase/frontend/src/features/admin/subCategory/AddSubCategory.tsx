import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useGetAllproductCategoryQuery } from '../../../services/productCategorySerivce';
import { ProductCategoryType } from '../../../_types/productCategory_type';
import { useAddNewProductSubCategoryMutation } from '../../../services/productSubcategory_service';

interface AddSubcategoryProps {
    handleCloseDialog: () => void;
}
const AddSubCategory: React.FC<AddSubcategoryProps> = ({ handleCloseDialog }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customSubCategory, setCustomSubCategory] = useState('');
    const { isError, isLoading, isSuccess, data, error } = useGetAllproductCategoryQuery();
    const [addSubcategory, { isSuccess: isAddSuccess }] = useAddNewProductSubCategoryMutation();

    const categories: ProductCategoryType[] = isSuccess ? data : [];

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCategory(event.target.value as string);
    };
    const handleCustomSubCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCustomSubCategory(event.target.value);
    };

    const handleAddSubCategory = async () => {
        const formData = {
            name: customSubCategory,
            categoryId: selectedCategory,
        };
        console.log(formData);
        await addSubcategory(formData);
        handleCloseDialog()
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className="mx-10 mb-10 w-[450px]">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

                <div className="pt-10">
                    <div className="flex justify-between gap-5">
                        <Button variant="outlined" color="error" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="bg-[#002a47]"
                            onClick={handleAddSubCategory}
                        >
                            Add Sub Category
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSubCategory;
