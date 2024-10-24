import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useApproveReqMutation } from "../../services/materialReq_service";
import { MaterialRequest_type } from "../../_types/materialReq_type";
import { useGetAllUsersQuery } from "../../services/user_service";
import { useForm } from "react-hook-form";

interface ApproveReqProps {
  selectedRow: MaterialRequest_type;
  handleCloseDialog: () => void;
}

type FormValues = {
  logisticSuperViserId: number;
  isApproviedByDH: boolean;
};

const ApproveReq: React.FC<ApproveReqProps> = ({
  selectedRow,
  handleCloseDialog,
}) => {
  const { setToastData } = useToast();
  const [isApproved, setIsApproved] = useState<boolean>(
    selectedRow?.isApproviedByDH
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [approveRequest, { isError, isSuccess, isLoading, error }] =
    useApproveReqMutation();
  const { data: userList } = useGetAllUsersQuery();

  const handleApprove = async (data: FormValues) => {
    if (selectedRow?.id) {
      try {
        await approveRequest({
          body: {
            isApproviedByDH: !isApproved, // Toggle the approval status
            logisticSuperViserId: data.logisticSuperViserId, // Use form data
          },
          param: selectedRow.id,
        });
        setIsApproved(!isApproved); // Toggle approval status
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setToastData({ message: "Request Approved Successfully", success: true });
      handleCloseDialog();
      reset();
    }
    if (isError) {
      setToastData({
        message: `Error: ${error || "Something went wrong"}`,
        success: false,
      });
      console.log(error);
    }
  }, [isSuccess, isError, setToastData, handleCloseDialog, reset, error]);

  return (
    <div>
      <div className="w-[200px]">
        {isApproved ? (
          <label
            htmlFor="isApproved"
            className="block text-sm font-medium text-red-500"
          >
            Reject Request
          </label>
        ) : (
          <label
            htmlFor="isApproved"
            className="block text-sm font-medium text-green-800"
          >
            Approve Request
          </label>
        )}
      </div>

      {!isApproved && (
        <div className="w-full md:w-[45%] my-5">
          <label
            htmlFor="logisticSuperViserId"
            className="block text-sm font-medium text-gray-700"
          >
            Logistic Supervisor
          </label>
          <select
            id="logisticSuperViserId"
            {...register("logisticSuperViserId", {
              required: "Logistic Supervisor is required",
            })}
            className="focus:outline-none bg-slate-100 w-full py-2 rounded-md"
          >
            <option value="">Select Logistic Supervisor</option>
            {userList
              ?.filter((i) => i.role === "LOGESTIC_SUPERVISER")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.profile.firstName} {user.profile.lastName}
                </option>
              ))}
          </select>
          <p className="text-red-600 text-[13px] mt-1">
            {errors.logisticSuperViserId?.message}
          </p>
        </div>
      )}

      <div className="flex justify-center mt-2">
        {isLoading ? (
          <div>Approving...</div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit(handleApprove)}
            className={`${
              isApproved ? "bg-red-500" : "bg-green-800"
            } text-white px-6 py-2 rounded-md`}
            disabled={isLoading}
          >
            {isApproved ? "Reject" : "Approve"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApproveReq;
