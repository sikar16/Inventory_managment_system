import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAddNewstoreMutation } from '../../../services/store_service';

interface AddSubcategoryProps {
    handleCloseDialog: () => void;
}

const AddWareHouse: React.FC<AddSubcategoryProps> = ({ handleCloseDialog }) => {
    const [warehouseData, setWarehouseData] = useState({
        name: '',
        country: '',
        city: '',
        subCity: '',
        wereda: ''
    });
    const [addWareHouse] = useAddNewstoreMutation();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setWarehouseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSubCategory = async () => {
        console.log(warehouseData);
        await addWareHouse(warehouseData);
        handleCloseDialog();
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className='mx-10 mb-10 w-[350px]'>
            <form className='space-y-2' onSubmit={(e) => e.preventDefault()}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={warehouseData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Country"
                    name="country"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={warehouseData.country}
                    onChange={handleInputChange}
                />
                <TextField
                    label="City"
                    name="city"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={warehouseData.city}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Sub-city"
                    name="subCity"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={warehouseData.subCity}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Wereda"
                    name="wereda"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={warehouseData.wereda}
                    onChange={handleInputChange}
                />

                <div className='pt-10'>
                    <div className='flex justify-between gap-5'>
                        <Button variant="outlined" color="error" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <button
                            className='bg-[#002a47] text-white px-4 py-2 rounded-md'
                            onClick={handleAddSubCategory}
                        >
                            Add Warehouse
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddWareHouse;
