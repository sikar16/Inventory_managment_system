import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useApproveReqMutation } from "../../services/materialReq_service";

interface RowData {
    no: number; // Assuming 'no' represents the request ID
}

interface ApproveReqProps {
    selectedRow: RowData | null;
    handleCloseDialog: () => void;
}

const ApproveReq: React.FC<ApproveReqProps> = ({ selectedRow, handleCloseDialog }) => {
    const { setToastData } = useToast();
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [approveRequest, { isError, isSuccess, isLoading, error, reset }] =
        useApproveReqMutation();

    // Hardcode the logistic supervisor ID (assuming there is only one supervisor)
    const logisticSuperViserId = 1; // Replace 1 with the actual supervisor ID

    const handleApprove = async () => {
        if (selectedRow?.no) {
            try {
                await approveRequest({
                    body: {
                        isApproviedByDH: !isApproved, // Toggle the approval status
                        logisticSuperViserId: logisticSuperViserId, // Hardcoded supervisor ID
                    },
                    param: selectedRow.no,
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
            setToastData({ message: `Error: ${error || "Something went wrong"}`, success: false });
            console.log(error);
        }
    }, [isSuccess, isError, setToastData, handleCloseDialog, reset, error]);

    return (
        <div>
            <div className="w-[200px] ">
                <label htmlFor="isApproved" className="block text-sm font-medium">
                    Approve Request
                </label>
                <input
                    type="checkbox"
                    id="isApproved"
                    checked={isApproved}
                    onChange={() => setIsApproved(!isApproved)} // Toggling approval status
                    className="focus:outline-none bg-slate-100 py-2 rounded-md"
                />

            </div>

            <div className="flex justify-center mt-2">
                {isLoading ? (
                    <div>Approving...</div>
                ) : (
                    <button
                        type="button"
                        onClick={handleApprove}
                        className="bg-[#002A47] text-white px-6 py-2 rounded-md"
                        disabled={isLoading}
                    >
                        {isApproved ? "Revoke Approval" : "Approve"} {/* Update button text */}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApproveReq;
