import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useToast } from "../../../../context/ToastContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";
import { useUpdateStoreMutation } from "../../../../services/store_service";
import { StoreType } from "../../../../_types/store_type";

interface UpdateStoreProps {
  handleCloseDialog: () => void;
  selectedRowData: StoreType | null;
}

interface UpdateStoreFormType {
  name: string;
  country: string;
  city: string;
  subCity: string;
  wereda: string;
}

const UpdateStore: React.FC<UpdateStoreProps> = ({
  handleCloseDialog,
  selectedRowData,
}) => {
  const { setToastData } = useToast(); // Using toast to display success/error messages
  const [updateStore, { isLoading }] = useUpdateStoreMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStoreFormType>({
    defaultValues: {
      name: selectedRowData?.name || "",
      country: selectedRowData?.address.country || "",
      city: selectedRowData?.address.city || "",
      subCity: selectedRowData?.address.subCity || "",
      wereda: selectedRowData?.address.wereda || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateStoreFormType> = async (data) => {
    if (selectedRowData) {
      try {
        // Unwrap the promise to handle success/error properly
        await updateStore({
          body: data,
          params: selectedRowData,
        }).unwrap();

        setToastData({
          message: "Store updated successfully",
          success: true,
        });
        handleCloseDialog(); // Close dialog after success
      } catch (error: any) {
        const res: ErrorResponseType = error;
        setToastData({
          message: res?.data?.message || "Failed to update store",
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
          <p className="my-3 text-xl font-bold">Update store</p>
        </InputLabel>{" "}
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <TextField
          label="Store Name"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("name", { required: "Store name is required" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
          disabled={isLoading} // Disable field while loading
        />
        <InputLabel id="country-label">Country</InputLabel>
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
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
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
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
        <InputLabel id="subCity-label">Sub City</InputLabel>
        {errors.subCity && (
          <p className="text-red-500">{errors.subCity.message}</p>
        )}
        <TextField
          label="Sub City"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          {...register("subCity", { required: "Sub City is required" })}
          error={!!errors.subCity}
          helperText={errors.subCity ? errors.subCity.message : ""}
          disabled={isLoading}
        />
        <InputLabel id="wereda-label">Wereda</InputLabel>
        {errors.wereda && (
          <p className="text-red-500">{errors.wereda.message}</p>
        )}
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
              {isLoading ? "Updating..." : "Update Store"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateStore;
