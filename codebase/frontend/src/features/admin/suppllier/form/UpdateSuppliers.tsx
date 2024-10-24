import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useUpdateSupplierMutation } from "../../../../services/supplier_service";
import { useGetAllSupplierCategoryQuery } from "../../../../services/supplierCategoryService";
import { useToast } from "../../../../context/ToastContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";
import { SupplierType } from "../../../../_types/supplier_type"; // Update this import based on your structure
import { supplierCategoryType } from "../../../../_types/supplierCategory_type";

interface UpdateSuppliersProps {
  handleCloseDialog: () => void;
  selectedRowData: SupplierType | null; // Assuming this type has the properties of a supplier
}

interface UpdateSupplierFormType {
  fullName: string;
  email: string;
  phone: string;
  categoryId: number;
  country: string;
  city: string;
  subCity: string;
  wereda: string;
}

const UpdateSuppliers: React.FC<UpdateSuppliersProps> = ({
  handleCloseDialog,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  const { data: categoriesData, isSuccess } = useGetAllSupplierCategoryQuery();
  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateSupplierFormType>({
    defaultValues: {
      fullName: selectedRowData?.fullName || "",
      email: selectedRowData?.email || "",
      phone: selectedRowData?.phone || "",
      categoryId: selectedRowData?.categoryId,
      country: selectedRowData?.address.country || "",
      city: selectedRowData?.address.city || "",
      subCity: selectedRowData?.address.subCity || "",
      wereda: selectedRowData?.address.wereda || "",
    },
  });

  // Set default values when selectedRowData changes
  useEffect(() => {
    if (selectedRowData) {
      setValue("fullName", selectedRowData.fullName);
      setValue("email", selectedRowData.email);
      setValue("phone", selectedRowData.phone);
      setValue("categoryId", selectedRowData.categoryId);
      setValue("country", selectedRowData.address.country);
      setValue("city", selectedRowData.address.city);
      setValue("subCity", selectedRowData.address.subCity);
      setValue("wereda", selectedRowData.address.wereda);
    }
  }, [selectedRowData, setValue]);

  const onSubmit: SubmitHandler<UpdateSupplierFormType> = async (data) => {
    if (selectedRowData) {
      console.log(selectedRowData.id);
      try {
        await updateSupplier({
          body: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            categoryId: data.categoryId,
            address: {
              country: data.country,
              city: data.city,
              subCity: data.subCity,
              wereda: data.wereda,
            },
          },
          params: selectedRowData.id,
        }).unwrap();

        setToastData({
          message: "Supplier updated successfully",
          success: true,
        });
        handleCloseDialog();
      } catch (error: any) {
        const res: ErrorResponseType = error;
        setToastData({
          message: res?.data?.message || "Failed to update supplier",
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
        <InputLabel id="fullName-label">Full Name</InputLabel>
        <TextField
          label="Full Name"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("fullName", { required: "Full name is required" })}
          error={!!errors.fullName}
          helperText={errors.fullName ? errors.fullName.message : ""}
          disabled={isLoading}
        />

        <InputLabel id="email-label">Email</InputLabel>
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          disabled={isLoading}
        />

        <InputLabel id="phone-label">Phone</InputLabel>
        <TextField
          label="Phone"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("phone", { required: "Phone number is required" })}
          error={!!errors.phone}
          helperText={errors.phone ? errors.phone.message : ""}
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
          disabled={isLoading}
        >
          {isSuccess &&
            categoriesData.map((cat: supplierCategoryType) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
        {errors.categoryId && (
          <p className="text-red-500">{errors.categoryId.message}</p>
        )}

        <InputLabel id="country-label">Country</InputLabel>
        <TextField
          label="Country"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("country", { required: "Country is required" })}
          error={!!errors.country}
          helperText={errors.country ? errors.country.message : ""}
          disabled={isLoading}
        />

        <InputLabel id="city-label">City</InputLabel>
        <TextField
          label="City"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("city", { required: "City is required" })}
          error={!!errors.city}
          helperText={errors.city ? errors.city.message : ""}
          disabled={isLoading}
        />

        <InputLabel id="subCity-label">Sub-City</InputLabel>
        <TextField
          label="Sub-City"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("subCity", { required: "Sub-city is required" })}
          error={!!errors.subCity}
          helperText={errors.subCity ? errors.subCity.message : ""}
          disabled={isLoading}
        />

        <InputLabel id="wereda-label">Wereda</InputLabel>
        <TextField
          label="Wereda"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("wereda", { required: "Wereda is required" })}
          error={!!errors.wereda}
          helperText={errors.wereda ? errors.wereda.message : ""}
          disabled={isLoading}
        />

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
              {isLoading ? "Updating..." : "Update Supplier"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateSuppliers;
