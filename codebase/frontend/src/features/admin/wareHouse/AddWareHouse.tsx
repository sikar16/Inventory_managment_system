import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAddNewstoreMutation } from '../../../services/store_service';

interface AddWareHouseProps {
    handleCloseDialog: () => void;
}

const AddWareHouse: React.FC<AddWareHouseProps> = ({ handleCloseDialog }) => {
    const [warehouseData, setWarehouseData] = useState({
        name: '',
        country: '',
        city: '',
        subCity: '',
        wereda: ''
    });

    const [addWareHouse, { isSuccess: isAddSuccess, isLoading, error }] = useAddNewstoreMutation();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setWarehouseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddWareHouse = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission
        try {
            await addWareHouse(warehouseData).unwrap(); // Await the result and unwrap any errors
            if (isAddSuccess) {
                handleCloseDialog(); // Close the dialog on success
            }
        } catch (err) {
            console.error('Failed to add warehouse:', err);
        }
    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    return (
        <div className='mx-10 mb-10 w-[350px]'>
            <form className='space-y-2' onSubmit={handleAddWareHouse}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add Warehouse'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddWareHouse;
