import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetSinglepurchasedReqQuery } from "../../services/purchasedReq_service";
import Loader from "../../component/Loading";
import { useAuth } from "../../context/AuthContext";
import ApprovePurchasedReqF from "./ApprovePurchasedReqM";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

// Define columns for the table
interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center";
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "product", label: "Product", minWidth: 70, align: "left" },
  { id: "subCategory", label: "Sub-Category", minWidth: 70 },
  { id: "category", label: "Category", minWidth: 70 },
  { id: "quantity", label: "Quantity", minWidth: 70, align: "left" },
  { id: "remark", label: "Remark", minWidth: 70, align: "left" },
];

// Define the structure for a row in the table
interface Data {
  no: number;
  product: string;
  subCategory: string;
  category: string;
  quantity: number;
  remark: string;
}

const PurchasedRequestDetailM: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const { isGM } = useAuth();

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for approval

  const handleCloseDialog = () => setOpenDialog(false);

  const handleApprove = async () => {
    if (purchasedReq) {
      setOpenDialog(true);
    }
  };

  const handleToggleDetails = (no: number) => {
    setExpandedRow(expandedRow === no ? null : no);
  };

  const {
    data: purchasedReq,
    isError,
    error,
    isLoading,
  } = useGetSinglepurchasedReqQuery(id);

  if (isError) {
    return <p>{`An error occurred ${error}`}</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white text-[#002A47] dark:bg-zinc-950 dark:text-white">
      <h2 className="px-2 rounded-e-full mb-5 text-2xl">
        Material Request Overview
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#002A47] text-white dark:bg-white dark:text-[#002A47]">
            {columns.map((column) => (
              <td
                key={column.id}
                className="p-2 font-medium"
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </td>
            ))}
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {purchasedReq?.items.map((row, rowIndex) => (
            <React.Fragment key={row.id}>
              <tr>
                <td className="p-2">{rowIndex + 1}</td>
                <td className="p-2">{row.products.name}</td>
                <td className="p-2">{row.products.subcategory.name}</td>
                <td className="p-2">
                  {row.products.subcategory.category.name}
                </td>
                <td className="p-2">{row.quantityToBePurchased}</td>
                <td className="p-2">
                  {row.remark == undefined ? "N/A" : row.remark}
                </td>
                <td className="p-2">
                  <button onClick={() => handleToggleDetails(row.id)}>
                    {expandedRow === row.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="#002A47"
                          d="M210.83 162.83a4 4 0 0 1-5.66 0L128 85.66l-77.17 77.17a4 4 0 0 1-5.66-5.66l80-80a4 4 0 0 1 5.66 0l80 80a4 4 0 0 1 0 5.66"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="#002A47"
                          d="m210.83 98.83-80 80a4 4 0 0 1-5.66 0l-80-80a4 4 0 0 1 5.66-5.66L128 170.34l77.17-77.17a4 4 0 1 1 5.66 5.66"
                        />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>

              {expandedRow === row.id && (
                <tr className="bg-white text-[#002A47] dark:bg-zinc-950 dark:text-white">
                  <td
                    colSpan={columns.length + 1}
                    className="p-4 border-t border-gray-200 shadow-lg"
                  >
                    <div className="space-y-4 w-[85%] justify-center m-auto p-5">
                      <div className="flex gap-4">
                        <p>
                          <strong>Product:</strong> {row.products.name}
                        </p>
                        <p>
                          <strong>Category:</strong>{" "}
                          {row.products.subcategory.category.name}
                        </p>
                        <p>
                          <strong>Sub-Category:</strong>{" "}
                          {row.products.subcategory.category.name}
                        </p>
                      </div>
                      <p>
                        <strong>Quantity:</strong> {row.quantityToBePurchased}
                      </p>

                      {row.products.productAttributes.length > 0 && (
                        <div className="grid grid-cols-2 gap-10 p-1 rounded-lg">
                          <div>
                            <p className="text-lg font-semibold">Key</p>
                            <ul className="list-disc list-inside">
                              {row.products.productAttributes.map((attr) => (
                                <li key={attr.id}>
                                  {attr.templateAttribute.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Value</p>
                            <ul className="list-disc list-inside">
                              {row.products.productAttributes.map((attr) => (
                                <li key={attr.id}>{attr.value}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {isGM && (
        <div className="p-6">
          <button
            className={`px-5 py-2 text-white rounded-lg ${
              purchasedReq?.isApproviedByGM ? "bg-red-500" : "bg-green-400"
            }`}
            onClick={handleApprove}
          >
            {purchasedReq?.isApproviedByGM ? "Reject" : "Approve"}
          </button>
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Approve Request</DialogTitle>
        <DialogContent>
          <ApprovePurchasedReqF
            purchasedReq={purchasedReq}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchasedRequestDetailM;
