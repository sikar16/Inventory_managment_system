import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { PurchasedRequest_type } from "../../_types/purchasedReq_type";
import { useApprovePurchasedReqMutation } from "../../services/purchasedReq_service";

interface ApproveReqProps {
    selectedRow: PurchasedRequest_type;
    handleCloseDialog: () => void;
}

type FormValues = {
    isApproviedByDH: boolean
};

const ApprovePurchasedReqF: React.FC<ApproveReqProps> = ({ selectedRow, handleCloseDialog }) => {
    const { setToastData } = useToast();
    const [isApproved, setIsApproved] = useState<boolean>(selectedRow?.isApproviedByFinance);

    const [approveRequest, { isError, isSuccess, isLoading, error }] = useApprovePurchasedReqMutation();

    const handleApprove = async (data: FormValues) => {
        if (selectedRow?.id) {
            try {
                await approveRequest({
                    body: {
                        isApproviedByFinance: !isApproved,
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
        }
        if (isError) {
            setToastData({ message: `Error: ${error || "Something went wrong"}`, success: false });
            console.log(error);
        }
    }, [isSuccess, isError, setToastData, handleCloseDialog, error]);

    return (
        <div>
            <div className="w-[200px]">
                {isApproved ? (
                    <label htmlFor="isApproved" className="block text-sm font-medium text-red-500">
                        Reject Request
                    </label>
                ) : (
                    <label htmlFor="isApproved" className="block text-sm font-medium text-green-800">
                        Approve Request
                    </label>
                )}
            </div>



            <div className="flex justify-center mt-2">
                {isLoading ? (
                    <div>Approving...</div>
                ) : (
                    <button
                        type="button"
                        onClick={() => handleApprove}
                        className={`${isApproved ? "bg-red-500" : "bg-green-800"} text-white px-6 py-2 rounded-md`}
                        disabled={isLoading}
                    >
                        {isApproved ? "Reject" : "Approve"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApprovePurchasedReqF;