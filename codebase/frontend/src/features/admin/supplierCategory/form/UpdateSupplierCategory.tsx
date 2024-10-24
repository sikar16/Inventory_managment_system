import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateSupplierCategoryMutation } from "../../../../services/supplierCategoryService";
import { supplierCategoryType } from "../../../../_types/supplierCategory_type";

interface UpdateSupplierCategoryProps {
  handleCloseDialog: () => void;
  selectedCategory: supplierCategoryType | null; // Include selected category prop
}

const UpdateSupplierCategory: React.FC<UpdateSupplierCategoryProps> = ({
  handleCloseDialog,
  selectedCategory,
}) => {
  const [customCategory, setCustomCategory] = useState("");
  const [updateCategory, { isSuccess }] = useUpdateSupplierCategoryMutation();

  useEffect(() => {
    // Set the initial value for customCategory when selectedCategory changes
    if (selectedCategory) {
      setCustomCategory(selectedCategory.name);
    }
  }, [selectedCategory]);

  const handleCustomCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomCategory(event.target.value);
  };

  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      const formData = {
        name: customCategory,
      };

      try {
        await updateCategory({
          id: selectedCategory.id,
          data: formData,
        }).unwrap();
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    }
  };

  if (isSuccess) handleCloseDialog(); // Close dialog on success

  const handleDiscard = () => {
    handleCloseDialog();
  };

  return (
    <div className="mx-10 mb-10 w-[350px]">
      <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
        <InputLabel id="category-label">
          <p className="mt-3 text-xl font-bold">Supplier Category</p>
        </InputLabel>{" "}
        <TextField
          label="Update Category"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          value={customCategory}
          onChange={handleCustomCategoryChange}
        />
        <div className="pt-10">
          <div className="flex justify-between gap-5">
            <Button variant="outlined" color="error" onClick={handleDiscard}>
              Discard
            </Button>
            <button
              className="bg-[#002a47] text-white px-2 rounded-md"
              onClick={handleUpdateCategory}
              disabled={!customCategory} // Disable if input is empty
            >
              Update Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplierCategory;
