import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetSingleMaterialReqQuery } from "../../services/materialReq_service";
import Loader from "../../component/Loading";
import { MaterialRequest_type } from "../../_types/materialReq_type";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ApproveReq from "./ApproveReq";

// Sample data for table columns
interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center"; // Optional align property
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "product", label: "Product", minWidth: 70, align: "left" },
  { id: "subCategory", label: "Sub-Category", minWidth: 70 },
  { id: "category", label: "Category", minWidth: 70 },
  { id: "quantity", label: "Quantity", minWidth: 70, align: "left" },
  { id: "remark", label: "Remark", minWidth: 70, align: "left" },
];

// Table row interface
interface Data {
  no: number;
  product: string;
  subCategory: string;
  category: string;
  quantity: number;
  remark: string;
}

// Utility function to create table rows
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

const RequestApproval: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Extract the ID from location state
  const { isEmployee, isLS, isDH } = useAuth(); // Auth context
  const [selectedRow, setSelectedRow] = useState<MaterialRequest_type | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for approval

  const [expandedRow, setExpandedRow] = useState<number | null>(null); // State for expanding rows
  const handleCloseDialog = () => setOpenDialog(false);

  const handleToggleDetails = (no: number) => {
    setExpandedRow(expandedRow === no ? null : no);
  };

  // Fetch single material request using query
  const {
    data: materialReq,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetSingleMaterialReqQuery(id);

  // Create table rows based on the material request data
  const rows = isSuccess
    ? materialReq.items.map((item, index) =>
        createData(
          index + 1,
          item.product.name,
          item.product.subcategory.name,
          item.product.subcategory.category.name,
          parseInt(item.quantityRequested),
          item.remark
        )
      )
    : [];

  const handleApprove = async () => {
    if (materialReq) {
      setSelectedRow(materialReq);
      setOpenDialog(true);
    }
  };

  if (isError) {
    return <p>`${error.toString()}`</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    return (
      <div className="bg-white text-[#002A47] dark:bg-zinc-950 dark:text-white">
        <header className="text-2xl py-1 px-2 rounded-e-full">
          {!isEmployee && <h2>Employee Information</h2>}
        </header>
        {(isDH || !isEmployee) && (
          <div className="p-3 text-sm">
            <p>
              <strong>Name: </strong>
              {materialReq.employee.profile.firstName}{" "}
              {materialReq.employee.profile.lastName}{" "}
              {materialReq.employee.profile.middleName}
            </p>
            <p>
              <strong>Role:</strong> {materialReq.employee.role}
            </p>
            <p>
              <strong>Department:</strong>{" "}
              {materialReq.employee.department.name}
            </p>
            <p>
              <strong>Email:</strong> {materialReq.employee.email}
            </p>
            <p>
              <strong>Phone:</strong> {materialReq.employee.profile.phone}
            </p>
          </div>
        )}
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
            {rows.map((row) => (
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
                          ></path>
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
                            d="m210.83 98.83l-80 80a4 4 0 0 1-5.66 0l-80-80a4 4 0 0 1 5.66-5.66L128 170.34l77.17-77.17a4 4 0 1 1 5.66 5.66"
                          ></path>
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
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <p className="text-gray-700">
                              <strong>Category:</strong>
                            </p>
                            <p>{row.category}</p>
                          </div>
                          <div className="flex gap-4">
                            <p className="text-gray-700">
                              <strong>Sub-Category:</strong>
                            </p>
                            <p>{row.subCategory}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-700">
                              <strong>Product Name:</strong>
                            </p>
                            <p>{row.product}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex justify-between gap-4">
                            <p className="text-gray-700">
                              <strong>Quantity:</strong>
                            </p>
                            <p>{row.quantity}</p>
                          </div>
                          <div className="flex gap-4">
                            <p className="text-gray-700">
                              <strong>Date of Request:</strong>
                            </p>
                            <p>{materialReq.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <p className="text-gray-700">
                            <strong>Remark:</strong>
                          </p>
                          <p>{row.remark}</p>
                        </div>
                      </div>

                      <div className="rounded-lg p-6 space-y-4 w-[85%] mx-auto mt-6">
                        <p className="text-xl font-bold text-[#002A47]">
                          Request Details
                        </p>
                        <p className="text-gray-700">
                          <strong>Description: </strong>
                          {materialReq.id.toString()}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {(isLS || isDH) && (
          <div className="p-6">
            <button
              className={`${
                materialReq.isApproviedByDH ? "bg-red-600" : "bg-green-500"
              } px-5 py-2 text-white rounded-lg`}
              onClick={handleApprove}
            >
              {materialReq.isApproviedByDH ? "Reject" : "Approve"}
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
            <ApproveReq
              handleCloseDialog={handleCloseDialog}
              selectedRow={selectedRow}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
};

export default RequestApproval;
