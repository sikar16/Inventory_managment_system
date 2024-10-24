import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../../../context/ToastContext";
import { useAuth } from "../../../../context/AuthContext";
import { useAddNewDepartmentMutation } from "../../../../services/department_service";
import { TextField } from "@mui/material";

interface AddDepartmentProps {
  handleClickClose: () => void;
}

interface RegisterDepartmentFormType {
  name: string;
}

const AddDepartment: React.FC<AddDepartmentProps> = ({ handleClickClose }) => {
  const { setToastData } = useToast();
  useAuth();
  const [createDepartment, { isLoading }] = useAddNewDepartmentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDepartmentFormType>();

  const onSubmit: SubmitHandler<RegisterDepartmentFormType> = async (
    data: RegisterDepartmentFormType
  ) => {
    try {
      await createDepartment({ name: data.name }).unwrap();
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
  };

  return (
    <div className="w-full">
      <div className="flex justify-between m-4 ">
        <p className="text-xl font-medium">Add Department</p>
        {/* Close icon to close the modal */}
        <div className=" cursor-pointer" onClick={handleClickClose}>
          <svg
            className="w-4 h-4"
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
      </div>
      <div className="w-full max-w-md px-6 shadow-md rounded-lg text-center m-auto ">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="New Department"
            variant="outlined"
            size="small"
            className="w-full "
            {...register("name", { required: "Department name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#002a47] py-1 px-3 mb-4 text-white rounded-md mt-4"
          >
            {isLoading ? "Adding..." : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
