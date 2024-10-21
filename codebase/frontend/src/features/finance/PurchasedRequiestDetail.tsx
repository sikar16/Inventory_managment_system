import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllpurchasedReqQuery } from "../../services/purchasedReq_service";
import Loader from "../../component/Loading";
import { useAuth } from "../../context/AuthContext";
import { PurchasedRequest_type } from "../../_types/purchasedReq_type";
import ApprovePurchasedReqF from "./ApprovePurchasedReqF";
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

function createData(
  no: number,
  product: string,
  subCategory: string,
  category: string,
  quantity: number,
  remark: string
): Data {
  return { no, product, subCategory, category, quantity, remark };
}

const PurchasedRequestDetail: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const { isFinance } = useAuth();

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] =
    useState<PurchasedRequest_type | null>(); // Correct typing for state
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for approval

  const handleCloseDialog = () => setOpenDialog(false);

  const handleApprove = async () => {
    console.log("kkkkkkkkkk");
    if (purchasedReq) {
      console.log("qqqqqqqq");
      setSelectedRow(purchasedReq);
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
    isSuccess,
  } = useGetAllpurchasedReqQuery(id);

  const rows = isSuccess
    ? purchasedReq.map((item, index) =>
        createData(
          index + 1,
          (item.items || [])
            .map((i) => (i.products || []).map((p) => p?.name || "").join(", "))
            .join(", "),
          (item.items || [])
            .map((i) =>
              (i.products || [])
                .map((p) => p?.subcategory?.name || "")
                .join(", ")
            )
            .join(", "),
          (item.items || [])
            .map((i) =>
              (i.products || []).map((p) => p?.category?.name || "").join(", ")
            )
            .join(", "),
          item?.totalPrice || 0,
          (item.items || []).map((i) => i?.remark || "").join(", ")
        )
      )
    : [];

  if (isError) {
    return <p>{error?.message || "An error occurred"}</p>;
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
          {rows.map((row, rowIndex) => (
            <React.Fragment key={row.no}>
              <tr>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="p-2"
                    style={{ textAlign: column.align }}
                  >
                    {row[column.id as keyof Data]}
                  </td>
                ))}
                <td className="p-2">
                  <button onClick={() => handleToggleDetails(row.no)}>
                    {expandedRow === row.no ? (
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

              {expandedRow === row.no && (
                <tr className="bg-white text-[#002A47] dark:bg-zinc-950 dark:text-white">
                  <td
                    colSpan={columns.length + 1}
                    className="p-4 border-t border-gray-200 shadow-lg"
                  >
                    <div className="space-y-4 w-[85%] justify-center m-auto p-5">
                      <div className="flex gap-4">
                        <p>
                          <strong>Category:</strong> {row.category}
                        </p>
                        <p>
                          <strong>Sub-Category:</strong> {row.subCategory}
                        </p>
                        <p>
                          <strong>Product Name:</strong> {row.product}
                        </p>
                      </div>
                      <p>
                        <strong>Quantity:</strong> {row.quantity}
                      </p>

                      {purchasedReq[rowIndex]?.items?.length > 0 && (
                        <div className="grid grid-cols-2 gap-10 p-1 rounded-lg">
                          <div>
                            <p className="text-lg font-semibold">Key</p>
                            <ul className="list-disc list-inside">
                              {purchasedReq[rowIndex].items.map((item) =>
                                item.products.map((product) =>
                                  product.productAttributes.map((attr) => (
                                    <li key={attr.id}>
                                      {attr.templateAttribute.name}
                                    </li>
                                  ))
                                )
                              )}
                            </ul>
                          </div>
                          <div>
                            <p className="text-lg font-semibold">Value</p>
                            <ul className="list-disc list-inside">
                              {purchasedReq[rowIndex].items.map((item) =>
                                item.products.map((product) =>
                                  product.productAttributes.map((attr) => (
                                    <li key={attr.id}>{attr.value}</li>
                                  ))
                                )
                              )}
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

      {isFinance && (
        <div className="p-6">
          <button
            className={`px-5 py-2 text-black rounded-lg bg-green-500`}
            onClick={handleApprove}
          >
            Approve
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
          <ApprovePurchasedReqF row={selectedRow} onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchasedRequestDetail;
