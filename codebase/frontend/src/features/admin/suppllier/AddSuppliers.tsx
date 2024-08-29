import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useGetAllsupplierCategoryQuery } from '../../../services/supplierCategoryService';
import { SupplierCategoryType } from '../../../_types/supplierCategory_type';
import { useAddNewsupplierMutation } from '../../../services/supplier_service';

interface AddSuppliersProps {
    handleCloseDialog: () => void;
}

const AddSuppliers: React.FC<AddSuppliersProps> = ({ handleCloseDialog }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        categoryId: '',
        country: '',
        city: '',
        subCity: '',
    });

    const { isError, isLoading, isSuccess, data, error } = useGetAllsupplierCategoryQuery();
    const [addSupplier] = useAddNewsupplierMutation();

    const categories: SupplierCategoryType[] = isSuccess ? data : [];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData((prevState) => ({
            ...prevState,
            categoryId: event.target.value as string,
        }));
    };

    const handleAddSupplier = async () => {
        try {
            await addSupplier(formData);
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to add supplier:', error);
        }
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className="mx-10 mb-10 w-[450px]">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <TextField
                        label="Full Name"
                        name="fullName"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        name="categoryId"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.categoryId}
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
                    <TextField
                        label="Country"
                        name="country"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <TextField
                        label="City"
                        name="city"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <TextField
                        label="Sub-city"
                        name="subCity"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={formData.subCity}
                        onChange={handleInputChange}
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
                            onClick={handleAddSupplier}
                        >
                            Add Supplier
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddSuppliers;
