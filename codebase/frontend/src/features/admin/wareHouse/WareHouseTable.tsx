import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { StoreType } from "../../../_types/store_type";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddProduct from "../product/form/AddProduct";

interface Column {
  id: keyof RowData;
  label: string;
  minWidth?: number;
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

interface RowData {
  no: number;
  storeName: string;
  city: string;
  subCity: string;
  wereda: string;
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "storeName", label: "Store Name", minWidth: 200 },
  { id: "city", label: "City", minWidth: 200, align: "left" },
  { id: "subCity", label: "Sub City", minWidth: 200, align: "left" },
  { id: "wereda", label: "Wereda", minWidth: 200, align: "left" },
];

function createData(
  no: number,
  storeName: string,
  city: string,
  subCity: string,
  wereda: string
): RowData {
  return { no, storeName, city, subCity, wereda };
}

interface StoreProps {
  storeList: StoreType[];
}

const WareHouseTable: React.FC<StoreProps> = ({ storeList }) => {
  const rows: RowData[] = storeList.map((store, index) =>
    createData(
      index + 1,
      store.name,
      store.address?.city || "",
      store.address?.subCity || "",
      store.address?.wereda || ""
    )
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [storeProducts] = React.useState<{
    [key: string]: any[];
  }>({});

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-col mx-[7%]">
      <Paper sx={{ overflow: "hidden", width: "100%" }}>
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
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <div className="flex gap-4">
                          <button
                            className="flex items-center"
                            onClick={() => handleToggle(index)}
                          >
                            <div className="mr-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
                              {openFaqIndex === index ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </div>
                          </button>
                          <button
                            className="text-[#002a47] px-2 py-1 rounded-lg"
                            onClick={handleOpenDialog}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={15}
                              height={15}
                              viewBox="0 0 14 14"
                            >
                              <path
                                fill="#002a47"
                                fillRule="evenodd"
                                d="M8 1a1 1 0 0 0-2 0v5H1a1 1 0 0 0 0 2h5v5a1 1 0 1 0 2 0V8h5a1 1 0 1 0 0-2H8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {openFaqIndex === index && (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1}>
                          <div className="pl-[62px] bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                              <p className="text-md">
                                Store Name:{" "}
                                <span className="text-sm">
                                  {storeList[index].name}
                                </span>
                              </p>
                              <p className="text-md">Products:</p>
                              <div className="col-span-2 grid grid-cols-2 text-sm gap-2">
                                {storeProducts[storeList[index].name]?.map(
                                  (product, i) => (
                                    <div key={i}>
                                      <p>Product Name: {product.name}</p>
                                      <p>Category: {product.category}</p>
                                      <p>Subcategory: {product.subCategory}</p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="flex justify-between me-5">
          <DialogTitle>Add New Product</DialogTitle>
          <DialogActions>
            <svg
              onClick={handleCloseDialog}
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              />
            </svg>
          </DialogActions>
        </div>
        <DialogContent>
          <AddProduct
            // onAddProduct={handleAddProduct}
            handleCloseDialog={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WareHouseTable;
