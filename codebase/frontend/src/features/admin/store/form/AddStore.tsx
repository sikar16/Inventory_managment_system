import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useToast } from "../../../../context/ToastContext";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";
import { useAddNewStoreMutation } from "../../../../services/store_service";

interface AddStoreProps {
  handleCloseDialog: () => void;
}

const AddStore: React.FC<AddStoreProps> = ({ handleCloseDialog }) => {
  const { setToastData } = useToast(); // Using toast to display success/error messages

  // State for storing store details
  const [storeDetails, setStoreDetails] = useState({
    name: "",
    country: "",
    city: "",
    subCity: "",
    wereda: "",
  });

  const [addStore, { isError, isLoading, error }] = useAddNewStoreMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStoreDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddStore = async () => {
    try {
      // Unwrap the promise to correctly handle success/failure
      await addStore(storeDetails).unwrap();
      setToastData({
        message: "Store added successfully",
        success: true,
      });
      handleCloseDialog(); // Close the dialog after successful addition
    } catch (err: any) {
      // Error handling for the failed request
      const res: ErrorResponseType = err;
      setToastData({
        message: res?.data?.message || "Failed to add store",
        success: false,
      });
    }
  };

  const handleDiscard = () => {
    handleCloseDialog(); // Close the dialog when "Discard" is clicked
  };

  return (
    <div className="mx-10 mb-10 w-[400px]">
      <form className="space-y-2">
        <InputLabel id="category-label">
          <p className="mt-3 text-xl font-bold">Add Store</p>
        </InputLabel>{" "}
        {isError && <p className="text-red-500">{error.toString()}</p>}
        <TextField
          label="Store Name"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          name="name"
          value={storeDetails.name}
          onChange={handleInputChange}
          disabled={isLoading} // Disable field while loading
        />
        <TextField
          label="Country"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          name="country"
          value={storeDetails.country}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <TextField
          label="City"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          name="city"
          value={storeDetails.city}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <TextField
          label="Sub City"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          name="subCity"
          value={storeDetails.subCity}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <TextField
          label="Wereda"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          name="wereda"
          value={storeDetails.wereda}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <div className="pt-10">
          <div className="flex justify-between gap-5">
            <Button variant="outlined" color="error" onClick={handleDiscard}>
              Discard
            </Button>

            <button
              type="button" // Use button type instead of submit to manually handle submission
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md mt-4"
              onClick={handleAddStore}
            >
              {isLoading ? "Adding..." : "Add Store"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStore;
