import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  useAddNewpurchasedOrderMutation,
  useGetAllpurchasedOrderQuery,
} from "../../services/purchasedOrder_service";
import { useToast } from "../../context/ToastContext";
import { useGetAllsupplierQuery } from "../../services/supplier_service";
import { SupplierType } from "../../_types/supplier_type";
import { PurchasedOrderType } from "../../_types/purchasedOrder_type";
import { useAddNewsupplierOfferApiMutation } from "../../services/supplierOffer_service";

// Column definitions for the table
interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center";
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "purchasedReqId", label: "PO Id", minWidth: 50 },
  { id: "createdAt", label: "Created at", minWidth: 80, align: "left" },
];

// Function to create row data
function createData(no: number, purchasedReqId: string, createdAt: string) {
  return { no, purchasedReqId, createdAt };
}

type RowData = ReturnType<typeof createData>;

export default function PurchasedOrder() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);
  const [selectedSuppliers, setSelectedSuppliers] = React.useState<
    SupplierType[]
  >([]);
  const { setToastData } = useToast();

  // Fetching purchased order data
  const {
    data: purchasedOrder,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllpurchasedOrderQuery();
  const { data: suppliersList } = useGetAllsupplierQuery("supplier");

  // Fetching supplier list data

  // Formatting date to readable format
  function formatDateToReadable(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  // Creating rows for the table
  const rows: RowData[] = isSuccess
    ? purchasedOrder.map((i, index) =>
        createData(
          index + 1,
          `${i.id}`,
          `${formatDateToReadable(i.createdAt.toString())}`
        )
      )
    : [];

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleCheckboxChange = (supplier: SupplierType) => {
    setSelectedSuppliers((prevSelected) => {
      if (prevSelected.includes(supplier)) {
        return prevSelected.filter((i) => i.id !== supplier.id);
      } else {
        return [...prevSelected, supplier];
      }
    });
  };
  const handleselectedpo = () => {
    console.log(rows.values);
  };

  const [addPO] = useAddNewsupplierOfferApiMutation();

  const handlesumbit = async (po: PurchasedOrderType) => {
    if (selectedSuppliers.length === 0) {
      setToastData({
        message: `Please select at least one supplier.`,
        success: false,
      });

      return;
    }
    const data = {
      purchasedOrderId: po.id,
      suppliersId: selectedSuppliers.map((i) => i.id),
      totalPrice: 1000,
      items: po.items.map((i) => ({
        productId: parseInt(i.productId.toString()),
        quantity: parseInt(i.quantityToBePurchased.toString()),
        unitPrice: 200,
        remark: "remark",
      })),
    };
    try {
      await addPO(data);
      setToastData({
        message: `Successfully sent purchased order`,
        success: true,
      });
      setSelectedSuppliers([]);
    } catch (error: any) {
      setToastData({
        message: error.message,
        success: false,
      });
    }
    console.log(data);
    console.log(po);
  };

  return (
    <div className="pt-6">
      <div className="flex justify-between mb-3 mx-2">
        <p className="text-[#002a47] text-4xl font-medium">Purchased Order</p>
      </div>

      <div className="flex gap-8 text-gray-400 mt-8 mb-1">
        <button className="hover:underline hover:text-black">
          All requests
        </button>
        <button className="hover:underline hover:text-black">
          Accepted requests
        </button>
        <button className="hover:underline hover:text-black">
          Pending requests
        </button>
        <button className="hover:underline hover:text-black">
          Rejected requests
        </button>
      </div>

      <hr className="w-full text-black bg-black" />

      <div className="my-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-white rounded-md py-[5px] px-3 outline-none"
        />
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>
                  <button className="text-black">Action</button>
                </TableCell>
                <TableCell>
                  <button className="text-black"></button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Error fetching data
                  </TableCell>
                </TableRow>
              )}
              {isSuccess &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <React.Fragment key={row.no}>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.no}
                        >
                          {columns.map((column) => {
                            const value = row[column.id as keyof RowData];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align || "left"}
                              >
                                {value}
                              </TableCell>
                            );
                          })}
                          <TableCell>
                            <button className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-3 py-1">
                              Pending
                            </button>
                          </TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() => toggleDropdown(index)}
                              className="flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                className={`ml-2 transition-transform ${
                                  openDropdown === index
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              >
                                <path
                                  fill="#002a47"
                                  d="M12 15.707l-4.95-4.95a1 1 0 0 1 1.414-1.414L12 12.879l3.536-3.536a1 1 0 0 1 1.414 1.414L12 15.707z"
                                />
                              </svg>
                            </button>

                            <button onClick={handleselectedpo}>
                              selectedPO id {row.purchasedReqId}
                            </button>
                          </TableCell>
                        </TableRow>
                        {openDropdown === index && (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length + 2}
                              className="transition-all w-full"
                            >
                              <>
                                <div className="bg-gray-100 p-4 rounded-lg w-full">
                                  {suppliersList?.length ? (
                                    suppliersList.map((supplier) => (
                                      <div
                                        key={supplier.id}
                                        className="flex items-center mb-2"
                                      >
                                        <input
                                          type="checkbox"
                                          className="text-sm text-gray-700 mr-2"
                                          onChange={() =>
                                            handleCheckboxChange(supplier)
                                          } // Step 3: Update checkbox change
                                        />
                                        <p className="text-sm text-gray-700">
                                          <div className="flex gap-2">
                                            <strong id={supplier.id}>
                                              {supplier.fullName}
                                            </strong>
                                            <p>({supplier.category.name})</p>
                                          </div>
                                        </p>
                                      </div>
                                    ))
                                  ) : (
                                    <p>No suppliers available</p>
                                  )}
                                  <button
                                    onClick={() =>
                                      handlesumbit(purchasedOrder[index])
                                    }
                                    className="mt-2 bg-[#002a47] text-white py-1 px-6 rounded"
                                  >
                                    Send
                                  </button>
                                </div>
                              </>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
