import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllMaterialReqQuery } from "../../services/materialReq_service";
import { MaterialRequest_type } from "../../_types/materialReq_type";

interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center";
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "orderId", label: "Order Id", minWidth: 70 },
  {
    id: "requestedEmployee",
    label: "Requested Employee",
    minWidth: 100,
    align: "left",
  },
  { id: "product", label: "Product", minWidth: 70, align: "left" },
  { id: "quantity", label: "Quantity", minWidth: 70, align: "left" },
  { id: "status", label: "Status", minWidth: 70, align: "left" },
  {
    id: "dateOfRequest",
    label: "Date of Request",
    minWidth: 100,
    align: "left",
  },
];

function createData(
  no: number,
  orderId: string,
  requestedEmployee: string,
  product: string,
  quantity: string,
  status: string,
  dateOfRequest: string
) {
  return {
    no,
    orderId,
    requestedEmployee,
    product,
    quantity,
    status,
    dateOfRequest,
  };
}

type RowData = ReturnType<typeof createData>;

export default function IncomingRequest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<RowData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const {
    data: materialReq,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllMaterialReqQuery();

  const formatDateToReadable = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US");
  };

  const rows: RowData[] =
    isSuccess && materialReq
      ? materialReq.map((i, index) =>
          createData(
            index + 1,
            `${i.id}`,
            `${i.employee?.profile.firstName} ${i.employee?.profile.lastName} ${i.employee?.profile.middleName}`,
            `${i.id}`,
            `${i.id}`,
            `${i.id}`,
            formatDateToReadable(i.createdAt)
          )
        )
      : [];

  const filteredRows = rows.filter((row) =>
    row.requestedEmployee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    singleMaterialRequest: MaterialRequest_type
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(singleMaterialRequest);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleView = () => {
    if (selectedProduct) {
      navigate("/department-head/requiestApproval", {
        state: { id: selectedProduct.orderId },
      });
    }
  };

  const handleDelete = () => {
    if (selectedProduct) {
      // Add delete functionality here with confirmation
      console.log(`Deleting request with id: ${selectedProduct.orderId}`);
      handleCloseMenu();
    }
  };

  return (
    <div className="mt-10 mx-7">
      <div className="flex justify-between mb-3 mx-4">
        <p className="text-[#002a47] dark:text-gray-200 text-4xl font-medium">
          Incoming Requests
        </p>
        <Link to="/department-head/material-request">
          <button className="bg-[#002A47] dark:bg-[#313131] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md">
            Material Req
          </button>
        </Link>
      </div>
      <hr className="w-full text-black bg-black" />
      <div className="my-4">
        <input
          type="text"
          placeholder="Search"
          className="w-[80%] bg-[#f5f5f5] rounded-2xl py-[5px] px-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              {isError && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Error fetching data
                  </TableCell>
                </TableRow>
              )}
              {isSuccess &&
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
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
                      <TableCell align="center">
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(event) =>
                            handleClick(event, materialReq[row.no - 1])
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={handleView}>Edit</MenuItem>
                          <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
