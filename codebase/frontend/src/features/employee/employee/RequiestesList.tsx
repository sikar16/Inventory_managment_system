import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import { useGetAllMaterialReqQuery } from "../../../services/materialReq_service";

import { useThemeData } from "../../../context/them_context";
interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center";
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "orderId", label: "Order Id", minWidth: 200 },
  { id: "category", label: "Category", minWidth: 200, align: "left" },
  { id: "product", label: "Product", minWidth: 200, align: "left" },
  { id: "quantity", label: "Quantity", minWidth: 200, align: "left" },
  { id: "status", label: "Status", minWidth: 200, align: "left" },
  { id: "createdAt", label: "Created at", minWidth: 200, align: "left" },
  { id: "actions", label: "Actions", minWidth: 50, align: "center" },
];

export default function RequestsList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<null | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { muiTheme } = useThemeData();

  // Fetching data using the hook
  const {
    data: materialReq,
    error,
    isLoading,
    isSuccess,
  } = useGetAllMaterialReqQuery();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="mx-10 pt-6">
      <div className="flex justify-between mb-3 mx-2">
        <p className="text-[#002a47] text-4xl font-medium">Requests</p>
        <Link to="/employee/create-requests">
          <button className="bg-[#002A47] px-3 py-1 text-white rounded-md">
            Create request
          </button>
        </Link>
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
              {error && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Error fetching data
                  </TableCell>
                </TableRow>
              )}
              {isSuccess &&
                materialReq?.map((row: any, index: number) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <IconButton
                        onClick={(event) => handleMenuClick(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleOpenDialog}>
                          View Details
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={materialReq?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>View Request Details</DialogTitle>
        <DialogContent>jjj</DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
