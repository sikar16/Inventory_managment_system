import React from "react";
import { DepartmentType } from "../../../../_types/department_type";
import { useToast } from "../../../../context/ToastContext";
import { useUpdateDepartmentMutation } from "../../../../services/department_service";
import { useAuth } from "../../../../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

interface RegisterDepartmentFormType {
  name: string;
}
interface EditDepartmentProps {
  handleClickClose: () => void;
  selectedRowData: DepartmentType | null;
}
const EditDepartment: React.FC<EditDepartmentProps> = ({
  handleClickClose,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  useAuth();
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDepartmentFormType>({
    defaultValues: {
      name: selectedRowData?.name,
    },
  });

  const onSubmit: SubmitHandler<RegisterDepartmentFormType> = async (
    data: RegisterDepartmentFormType
  ) => {
    if (selectedRowData != undefined && selectedRowData.id != null) {
      try {
        await updateDepartment({
          body: { name: data.name },
          params: selectedRowData?.id,
        }).unwrap();
        setToastData({
          message: "Department created successfully",
          success: true,
        });
        handleClickClose();
      } catch (error: any) {
        console.log(error.error);
        setToastData({
          message: error.toString(),
          success: false,
        });
      }
    }
  };

  return (
    <div className="w-full">
      {/* Close icon to close the modal */}
      <div
        className="absolute top-1 left-0 right-0 m-2 p-2 cursor-pointer text-red-800"
        onClick={handleClickClose}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <br />
      <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Company Name Field */}
          <TextField
            label="New Department"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            {...register("name", { required: "Department name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#002a47] py-1 px-3 text-white rounded-md mt-4"
          >
            {isLoading ? "update..." : "update Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
