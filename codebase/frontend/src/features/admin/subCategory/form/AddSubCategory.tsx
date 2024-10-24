import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useGetAllProductCategoryQuery } from "../../../../services/productCategorySerivce";
import { ProductCategoryType } from "../../../../_types/productCategory_type";
import { useAddNewProductSubCategoryMutation } from "../../../../services/productSubcategory_service";
import { useToast } from "../../../../context/ToastContext"; // Import toast context

interface AddSubcategoryProps {
  handleCloseDialog: () => void;
}

const AddProductCategory: React.FC<AddSubcategoryProps> = ({
  handleCloseDialog,
}) => {
  const { setToastData } = useToast(); // Using toast for success/error messages
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customSubCategory, setCustomSubCategory] = useState("");
  const { isSuccess, data } = useGetAllProductCategoryQuery();
  const [addSubcategory, { isLoading, isError, error }] =
    useAddNewProductSubCategoryMutation();

  const categories: ProductCategoryType[] = isSuccess ? data : [];

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleCustomSubCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomSubCategory(event.target.value);
  };

  const handleAddSubCategory = async () => {
    const formData = {
      name: customSubCategory,
      categoryId: parseInt(selectedCategory),
    };

    try {
      await addSubcategory({ data: formData }).unwrap(); // Unwrap to handle promise correctly
      setToastData({
        message: "Subcategory added successfully",
        success: true,
      });
      handleCloseDialog();
    } catch (error: any) {
      setToastData({
        message: error?.data?.message || "Failed to add subcategory",
        success: false,
      });
    }
  };

  const handleDiscard = () => {
    handleCloseDialog();
  };

  return (
    <div className="mx-10 mb-10 w-[450px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <InputLabel id="category-label">
          <p className="mt-3 text-xl font-bold">Sub-category</p>
        </InputLabel>
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
            {/* Submit button */}
            <button
              type="button" // Use button type instead of submit to manually handle submission
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md mt-4"
              onClick={handleAddSubCategory}
            >
              {isLoading ? "Adding..." : "Add Sub Category"}{" "}
            </button>
          </div>
          {isError && <p className="text-red-500">{error.toString()}</p>}{" "}
          {/* Error message */}
        </div>
      </form>
    </div>
  );
};

export default AddProductCategory;
