import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserType } from "../../../_types/user_type";
import { useDeleteUserMutation } from "../../../services/user_service";
import AssignRole from "./AssignRole";

interface Column {
  id: keyof RowData;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

const columns: Column[] = [
  { id: "no", label: "No", maxWidth: 10 },
  { id: "fullName", label: "Full name", minWidth: 200 },
  { id: "department", label: "Department", minWidth: 180, align: "left" },
  { id: "email", label: "Email", minWidth: 80, align: "left" },
  { id: "phone", label: "Phone", minWidth: 80, align: "left" },
  { id: "role", label: "Role", minWidth: 50, align: "left" },
  { id: "gender", label: "Gender", minWidth: 50, align: "left" },
  { id: "address", label: "Address", minWidth: 180, align: "left" },
  { id: "actions", label: "Actions", minWidth: 30, align: "center" },
];
function createData(
  no: number,
  fullName: string,
  department: string,
  email: string,
  phone: string,
  role:
    | "DEPARTMENT_HEAD"
    | "EMPLOYEE"
    | "ADMIN"
    | "LOGESTIC_SUPERVISER"
    | "FINANCE"
    | "GENERAL_MANAGER"
    | "STORE_KEEPER",
  gender: string,
  address: string,
  actions: boolean
) {
  return {
    no,
    fullName,
    department,
    email,
    phone,
    role,
    gender,
    address,
    actions,
  };
}
interface UsersTableProps {
  userList: UserType[];
}
interface RowData {
  no: number;
  fullName: string;
  department: string;
  email: string;
  phone: string;
  role:
  | "DEPARTMENT_HEAD"
  | "EMPLOYEE"
  | "ADMIN"
  | "LOGESTIC_SUPERVISER"
  | "FINANCE"
  | "GENERAL_MANAGER"
  | "STORE_KEEPER";
  gender: string;
  address: string;
  actions: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ userList }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [rows, setRows] = useState<RowData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const newRows = userList.map((i) =>
      createData(
        i.id,
        `${i.profile.firstName} ${i.profile.middleName || ""} ${i.profile.lastName
        }`,
        `${i.department.name}`,
        `${i.email}`,
        `${i.profile.phone}`,
        `${i.role}`,
        `${i.profile.gender}`,
        `${i.profile.address.city} ${i.profile.address.subCity}`,
        true
      )
    );
    setRows(newRows);
  }, [userList]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: RowData
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      setRows((prevRows) => prevRows.filter((row) => row.no !== id));
      setMenuAnchorEl(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAssignRole = () => {
    handleOpenDialog();
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
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "actions" ? (
                            <>
                              <IconButton
                                onClick={(event) => handleMenuClick(event, row)}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                anchorEl={menuAnchorEl}
                                open={Boolean(menuAnchorEl)}
                                onClose={handleCloseMenu}
                              >
                                <MenuItem onClick={handleAssignRole}>
                                  Assign Role
                                </MenuItem>
                                <MenuItem onClick={() => handleDelete(row.no)}>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
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

      {/* Assign Role Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Assign Role</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <AssignRole
              selectedRow={selectedRow}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersTable;
