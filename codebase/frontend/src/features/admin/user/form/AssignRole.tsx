import { useState, useEffect } from "react";
import { useAssignRoleMutation } from "../../../../services/user_service";
import { useToast } from "../../../../context/ToastContext";
import { UserType } from "../../../../_types/user_type";

interface AssignRoleProps {
  selectedRow: UserType | null;
  handleCloseDialog: () => void;
}

const AssignRole: React.FC<AssignRoleProps> = ({
  selectedRow,
  handleCloseDialog,
}) => {
  const { setToastData } = useToast();
  const [role, setRole] = useState(selectedRow?.role || "");
  const [assignRole, { isError, isSuccess, isLoading, error, reset }] =
    useAssignRoleMutation();

  const handleSubmit = async () => {
    const data = {
      role: role, // The role from the state
    };

    if (selectedRow?.id) {
      try {
        await assignRole({ body: data, param: selectedRow.id });
      } catch (error) {
        // Handle error case
      }
    }
  };

  // Effect to handle the success state only once
  useEffect(() => {
    if (isSuccess) {
      setToastData({
        message: "Role Assigned Successfully",
        success: true,
      });
      handleCloseDialog(); // Close dialog after success
      reset(); // Reset the mutation state to prevent repeated calls
    }
    if (isError) {
      setToastData({
        message: `Error: ${error || "Something went wrong"}`,
        success: false,
      });
      reset(); // Reset the mutation state to allow further attempts
    }
  }, [isSuccess, isError, setToastData, handleCloseDialog, reset, error]);

  return (
    <div>
      <div className="flex justify-between mx3">
        <p className="text-xl font-semibold mb-3">Assign role</p>

        <div className=" cursor-pointer" onClick={handleCloseDialog}>
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
      <div className="w-full md:w-[45%] p-5 ">
        <label htmlFor="role" className="block text-sm font-medium ">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="focus:outline-none bg-slate-100  py-2 rounded-md"
        >
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="FINANCE">FINANCE</option>
          <option value="ADMIN">ADMIN</option>
          <option value="DEPARTMENT_HEAD">DEPARTMENT HEAD</option>
          <option value="LOGESTIC_SUPERVISER">LOGISTICS SUPERVISOR</option>
          <option value="GENERAL_MANAGER">GENERAL MANAGER</option>
          <option value="STORE_KEEPER">STORE KEEPER</option>
        </select>
      </div>
      <div className="flex justify-center mt-2">
        {isLoading ? (
          <div>Assigning</div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#002A47] text-white px-6 py-2 rounded-md "
            disabled={isLoading} // Disable button during loading state
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignRole;
