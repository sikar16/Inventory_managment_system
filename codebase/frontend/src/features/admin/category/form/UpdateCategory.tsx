import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateProductCategoryMutation } from "../../../../services/productCategorySerivce";
import { useToast } from "../../../../context/ToastContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";

interface CategoryType {
  name: string;
  id: number;
}

interface UpdateProductCategoryProps {
  handleCloseDialog: () => void;
  selectedRowData: CategoryType | null;
}

interface UpdateProductCategoryFormType {
  name: string;
  id: number;
}

const UpdateProductCategory: React.FC<UpdateProductCategoryProps> = ({
  handleCloseDialog,
  selectedRowData,
}) => {
  const { setToastData } = useToast(); // Using toast to display success/error messages
  const [updateProductCategory, { isLoading }] =
    useUpdateProductCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductCategoryFormType>({
    defaultValues: {
      name: selectedRowData?.name || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProductCategoryFormType> = async (
    data
  ) => {
    if (selectedRowData) {
      try {
        // Unwrap the promise to handle success/error properly
        await updateProductCategory({
          body: { name: data.name },
          params: selectedRowData.id,
        }).unwrap();

        setToastData({
          message: "Category updated successfully",
          success: true,
        });
        handleCloseDialog(); // Close dialog after success
      } catch (error: any) {
        const res: ErrorResponseType = error;
        setToastData({
          message: res?.data?.message || "Failed to update category",
          success: false,
        });
      }
    }
  };

  const handleDiscard = () => {
    handleCloseDialog(); // Close the dialog when "Discard" is clicked
  };

  return (
    <div className="mx-10 mb-10 w-[400px]">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputLabel id="category-label">
          <p className="mt-3 text-xl font-bold">Category</p>
        </InputLabel>
        {/* Display error message if request fails */}
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <TextField
          label="New Category"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("name", { required: "Category name is required" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
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
              type="submit"
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md mt-4"
            >
              {isLoading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductCategory;
