import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useAddNewProductCategoryMutation } from "../../../../services/productCategorySerivce";
import { useToast } from "../../../../context/ToastContext";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";

interface AddProductCategoryProps {
  handleCloseDialog: () => void;
}

const AddProductCategory: React.FC<AddProductCategoryProps> = ({
  handleCloseDialog,
}) => {
  const { setToastData } = useToast(); // Using toast to display success/error messages
  const [customCategory, setCustomCategory] = useState("");
  const [addProductCategory, { isError, isSuccess, isLoading, error }] =
    useAddNewProductCategoryMutation();

  const handleCustomCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomCategory(event.target.value);
  };

  const handleAddProductCategory = async () => {
    const formdata = {
      name: customCategory,
    };

    try {
      // Unwrap the promise to correctly handle success/failure
      await addProductCategory(formdata).unwrap();
      setToastData({
        message: "Category added successfully",
        success: true,
      });
      handleCloseDialog(); // Close the dialog after successful addition
    } catch (err: any) {
      // Error handling for the failed request
      const res: ErrorResponseType = err;
      setToastData({
        message: res?.data?.message || "Failed to add category",
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
        <InputLabel id="category-label">Category</InputLabel>

        {/* Display error message if request fails */}
        {isError && <p className="text-red-500">{error.toString()}</p>}

        {/* Category input field */}
        <TextField
          label="New Category"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          value={customCategory}
          onChange={handleCustomCategoryChange}
          disabled={isLoading} // Disable field while loading
        />

        <div className="pt-10">
          <div className="flex justify-between gap-5">
            {/* Discard button */}
            <Button variant="outlined" color="error" onClick={handleDiscard}>
              Discard
            </Button>

            {/* Submit button */}
            <button
              type="button" // Use button type instead of submit to manually handle submission
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md mt-4"
              onClick={handleAddProductCategory}
            >
              {isLoading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductCategory;
