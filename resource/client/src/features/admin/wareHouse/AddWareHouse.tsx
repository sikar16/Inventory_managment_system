import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { useAddNewstoreMutation } from '../../../services/store_service';

interface AddWareHouseProps {
    handleCloseDialog: () => void;
}

interface FormData {
    name: string;
    country: string;
    city: string;
    subCity: string;
    wereda: string;
}

const AddWareHouse: React.FC<AddWareHouseProps> = ({ handleCloseDialog }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [addWareHouse, { isError, isSuccess, isLoading, error }] = useAddNewstoreMutation();

    const onSubmit = async (data: FormData) => {
        try {
            await addWareHouse(data).unwrap();
            if (isSuccess) {
                handleCloseDialog();
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
            <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
                <InputLabel id="warehouse-name">Name</InputLabel>
                {isError && <p className='text-red-500'>{error && 'An error occurred'}</p>}
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Name"
                            variant="outlined"
                            size="small"
                            className="w-full mt-2"
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    )}
                />
                <InputLabel id="warehouse-country">Country</InputLabel>
                <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Country"
                            variant="outlined"
                            size="small"
                            className="w-full mt-2"
                            error={!!errors.country}
                            helperText={errors.country ? errors.country.message : ''}
                        />
                    )}
                />
                <InputLabel id="warehouse-city">City</InputLabel>
                <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'City is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="City"
                            variant="outlined"
                            size="small"
                            className="w-full mt-2"
                            error={!!errors.city}
                            helperText={errors.city ? errors.city.message : ''}
                        />
                    )}
                />
                <InputLabel id="warehouse-subCity">Sub-city</InputLabel>
                <Controller
                    name="subCity"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Sub-city"
                            variant="outlined"
                            size="small"
                            className="w-full mt-2"
                        />
                    )}
                />
                <InputLabel id="warehouse-wereda">Wereda</InputLabel>
                <Controller
                    name="wereda"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Wereda"
                            variant="outlined"
                            size="small"
                            className="w-full mt-2"
                        />
                    )}
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