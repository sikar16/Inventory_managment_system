import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useUpdateProductSubCategoryMutation } from "../../../../services/productSubcategory_service";
import { useGetAllProductCategoryQuery } from "../../../../services/productCategorySerivce";
import { useToast } from "../../../../context/ToastContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";
import { ProductSubCategoryType } from "../../../../_types/productSubcategory_type";
import { ProductCategoryType } from "../../../../_types/productCategory_type";

interface UpdateProductSubCategoryProps {
  handleCloseDialog: () => void;
  selectedRowData: ProductSubCategoryType | null;
}

interface UpdateProductSubCategoryFormType {
  name: string;
  categoryId: number; // Include categoryId in the form
}

const UpdateProductSubCategory: React.FC<UpdateProductSubCategoryProps> = ({
  handleCloseDialog,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  const { data: categoriesData, isSuccess } = useGetAllProductCategoryQuery();
  const [updateProductSubCategory, { isLoading }] =
    useUpdateProductSubCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateProductSubCategoryFormType>({
    defaultValues: {
      name: selectedRowData?.name || "",
      categoryId: selectedRowData?.categoryId,
    },
  });

  // Set default values when selectedRowData changes
  useEffect(() => {
    if (selectedRowData) {
      setValue("name", selectedRowData.name);
      setValue("categoryId", selectedRowData.categoryId); // Correctly set the categoryId
    }
  }, [selectedRowData, setValue]);

  const onSubmit: SubmitHandler<UpdateProductSubCategoryFormType> = async (
    data
  ) => {
    if (selectedRowData) {
      try {
        await updateProductSubCategory({
          body: { name: data.name, categoryId: data.categoryId },
          params: selectedRowData.id,
        }).unwrap();

        setToastData({
          message: "Subcategory updated successfully",
          success: true,
        });
        handleCloseDialog();
      } catch (error: any) {
        const res: ErrorResponseType = error;
        setToastData({
          message: res?.data?.message || "Failed to update subcategory",
          success: false,
        });
      }
    }
  };

  const handleDiscard = () => {
    handleCloseDialog();
  };

  return (
    <div className="mx-10 mb-10 w-[400px]">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputLabel id="subcategory-label">Subcategory</InputLabel>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <TextField
          label="New Subcategory"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("name", { required: "Subcategory name is required" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
          disabled={isLoading}
        />

        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("categoryId", { required: "Category is required" })}
          error={!!errors.categoryId}
          value={selectedRowData ? selectedRowData.categoryId : ""} // Bind the value from selectedRowData
        >
          {isSuccess &&
            categoriesData.map((cat: ProductCategoryType) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
        {errors.categoryId && (
          <p className="text-red-500">{errors.categoryId.message}</p>
        )}

        <div className="pt-10">
          <div className="flex justify-between gap-5">
            <Button variant="outlined" color="error" onClick={handleDiscard}>
              Discard
            </Button>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md mt-4"
            >
              {isLoading ? "Updating..." : "Update Subcategory"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductSubCategory;
