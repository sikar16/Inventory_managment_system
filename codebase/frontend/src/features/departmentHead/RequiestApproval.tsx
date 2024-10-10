import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetSingleMaterialReqQuery } from "../../services/materialReq_service";
import Loader from "../../component/Loading";

// Sample data
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

interface Data {
  no: number; // Assuming 'no' is a number
  product: string;
  subCategory: string;
  category: string;
  quantity: number; // Assuming 'quantity' is a number
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

const RequiestApproval: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Use optional chaining to avoid errors
  const { isEmployee, isLS, isDH } = useAuth();
  // console.log(`id : ${id}`);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleToggleDetails = (no: number) => {
    setExpandedRow(expandedRow === no ? null : no);
  };

  const {
    data: materialReq,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetSingleMaterialReqQuery(id);

  console.log(materialReq?.isApproviedByDH);


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

  console.log(1);

  if (isError) {
    return <p> `${error.toString()}` </p>;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    return (
      <div className="bg-white text-[#002A47] dark:bg-zinc-950 dark:text-white ">
        <header className="text-2xl py-1 px-2 rounded-e-full">
          {!isEmployee && <h2>Employee Information</h2>}
        </header>
        {isDH ||
          (!isEmployee && (
            <div className="p-3 text-sm">
              <p>
                <strong>Name: </strong>
                {materialReq.employee.profile.firstName}{" "}
                {materialReq.employee.profile.lastName}{" "}
                {materialReq.employee.profile.middleName}
              </p>
              <p>
                <strong>Role:</strong>
                {materialReq.employee.role}
              </p>
              <p>
                <strong> Department:</strong>
                {materialReq.employee.department.name}
              </p>
              <p>
                {" "}
                <strong>Email:</strong>
                {materialReq.employee.email}
              </p>
              <p>
                <strong>Phone:</strong>
                {materialReq.employee.profile.phone}
              </p>
            </div>
          ))}
        {isLS ||
          (!isEmployee && (
            <>
              <p>
                <strong>Role:</strong>
                {materialReq.employee.role}
              </p>
              <p>
                <strong> Department:</strong>
                {materialReq.employee.department.name}
              </p>
              <p>
                {" "}
                <strong>Email:</strong>
                {materialReq.employee.email}
              </p>
              <p>
                <strong>Phone:</strong>
                {materialReq.employee.profile.phone}
              </p>
            </>
          ))}
        <h2 className=" px-2 rounded-e-full mb-5 text-2xl">
          Material Request Overview
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#002A47] text-white  dark:bg-white dark:text-[#002A47]">
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
                    <button
                      className=""
                      onClick={() => handleToggleDetails(row.no)}
                    >
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
                      className="p-4 border-t border-gray-200 shadow-lg "
                    >
                      <div className=" space-y-4  w-[85%] justify-center m-auto p-5">
                        <div className="flex justify-between">
                          <div className="flex gap-4">
                            <p className=" text-gray-700">
                              <strong>Category:</strong>
                            </p>
                            <p className="">{row.category}</p>
                          </div>
                          <div className="flex gap-4">
                            <p className=" text-gray-700">
                              <strong>Sub-Category:</strong>
                            </p>
                            <p className="">{row.subCategory}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className=" text-gray-700">
                              <strong>Product Name:</strong>
                            </p>
                            <p className="">{row.product}</p>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <div className="flex justify-between gap-4">
                            <p className=" text-gray-700">
                              <strong>Quantity:</strong>
                            </p>
                            <p className="">{row.quantity}</p>
                          </div>
                          <div className="flex gap-4">
                            <p className=" text-gray-700">
                              <strong>Date of Request:</strong>
                            </p>
                            <p className="">{materialReq.createdAt}</p>
                          </div>
                        </div>

                        <div className="flex  gap-4">
                          <p className=" text-gray-700">
                            <strong>Remark:</strong>
                          </p>
                          <p className="">{row.remark}</p>
                        </div>
                      </div>
                      {/* Detail of product */}

                      <div className="rounded-lg p-6 space-y-4 w-[85%] mx-auto mt-6">
                        <p className="text-xl font-semibold text-gray-800 border-b pb-1">
                          Details
                        </p>

                        {materialReq.items.findIndex(
                          (i) => i.product.name === row.product
                        ) !== -1 &&
                          materialReq.items[
                            materialReq.items.findIndex(
                              (i) => i.product.name === row.product
                            )
                          ].product.productAttributes &&
                          materialReq.items[
                            materialReq.items.findIndex(
                              (i) => i.product.name === row.product
                            )
                          ].product.productAttributes.length > 0 && (
                            <div className="grid grid-cols-2 gap-10 p-1  rounded-lg">
                              <div className="space-y-2">
                                <p className="text-lg font-semibold text-gray-700">
                                  Key
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {materialReq.items[
                                    materialReq.items.findIndex(
                                      (i) => i.product.name === row.product
                                    )
                                  ].product.productAttributes.map((item) => (
                                    <p
                                      className="capitalize"
                                      key={item.templateAttribute.name}
                                    >
                                      {item.templateAttribute.name}
                                    </p>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <p className="text-lg font-semibold text-gray-700">
                                  Value
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {materialReq.items[
                                    materialReq.items.findIndex(
                                      (i) => i.product.name === row.product
                                    )
                                  ].product.productAttributes.map((item) => (
                                    <p key={item.value}>{item.value}</p>
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
        <button
          className={`px-4 py-2 text-white rounded-md transition duration-300 
                ${materialReq.isApproviedByDH
              ? 'bg-red-600 hover:bg-red-500 dark:bg-red-800 hover:dark:bg-red-700'
              : 'bg-green-600 hover:bg-green-500 dark:bg-green-800 hover:dark:bg-green-700'}`}>
          {materialReq.isApproviedByDH ? <p>Reject</p> : <p>Approve</p>}
        </button>

      </div>
    );
  }
};

export default RequiestApproval;
