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
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteMaterialReqMutation,
  useGetAllMaterialReqByLsQuery,
} from "../../services/materialReq_service";
import { MaterialRequest_type } from "../../_types/materialReq_type";

interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center";
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "requestId", label: "Request Id", minWidth: 120 },
  {
    id: "departmentHeadId",
    label: "Department Head Id",
    minWidth: 200,
    align: "left",
  },
  {
    id: "departmentName",
    label: "Department name",
    minWidth: 200,
    align: "left",
  },
  { id: "createdAt", label: "Created at", minWidth: 200, align: "left" },
  { id: "isApprovedBy", label: "Approved By", minWidth: 50, align: "center" },
];

function createData(
  no: number,
  requestId: string,
  departmentHeadId: string,
  departmentName: string,
  createdAt: string,
  isApprovedBy: string
) {
  return {
    no,
    requestId,
    departmentHeadId,
    departmentName,
    isApprovedBy,
    createdAt,
  };
}

type RowData = ReturnType<typeof createData>;

export default function MaterialRequiest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [matReq, setMatReq] = React.useState<MaterialRequest_type | null>(null);

  // Fetching data using the hook

  const {
    data: materialReq,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllMaterialReqByLsQuery();

  function formatDateToReadable(dateString: string) {
    const date = new Date(dateString);
    // const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US");
  }

  const rows: RowData[] = isSuccess
    ? materialReq.map((i, index) =>
        createData(
          index + 1,
          `${i.id}`,
          `${i.departmentHead?.profile.firstName} ${i.departmentHead?.profile.lastName} ${i.departmentHead?.profile.middleName}`,
          `${i.departmentHead?.department.name}`,
          formatDateToReadable(i.createdAt),
          `${i.isApproviedByDH}`
        )
      )
    : [];

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
    setMatReq(singleMaterialRequest); // Store the selected request
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [deleteMaterialReq] = useDeleteMaterialReqMutation();

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting category with ID:", id);
      await deleteMaterialReq(id).unwrap(); // Trigger the delete mutation
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const navigate = useNavigate();

  const handleView = async () => {
    if (matReq) {
      console.log(`Viewing request with id: ${matReq.id}`);
      navigate("/logestics/materialRequiest-detaile", {
        state: { id: matReq.id },
      });
    }
  };

  return (
    <div className="pt-6">
      <div className="flex justify-between mb-3 mx-2">
        <p className="text-[#002a47] text-4xl font-medium">Incoming Requests</p>
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
                    const singleMaterialRequest = materialReq[index];
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.requestId}
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
                        <TableCell align="center">
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(event) =>
                              handleClick(event, singleMaterialRequest)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                          >
                            <MenuItem onClick={handleView}>
                              View detail
                            </MenuItem>
                            {/* <MenuItem
                              onClick={() => handleEdit(singleMaterialRequest)}
                            >
                              Edit
                            </MenuItem> */}
                            <MenuItem
                              onClick={() => handleDelete(row.requestId)}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>View Request Details</DialogTitle>
        <DialogContent>Details go here...</DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog}>Close</button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
