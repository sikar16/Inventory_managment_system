import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserType } from "../../../_types/user_type";
import { useDeleteUserMutation } from "../../../services/user_service";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
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
  { id: "role", label: "Role", minWidth: 80, align: "left" },

  { id: "gender", label: "Gender", minWidth: 50, align: "left" },
  { id: "address", label: "Address", minWidth: 180, align: "left" },
  { id: "actions", label: "Actions", minWidth: 30, align: "left" },
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

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    const newRows = userList.map((i) =>
      createData(
        i.id,
        `${i.profile.firstName} ${i.profile.middleName || ""} ${
          i.profile.lastName
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

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      console.log(`User with id ${id} deleted`);

      setRows((prevRows) => prevRows.filter((row) => row.no !== id));
      setMenuAnchorEl(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: RowData
  ) => {
    setMenuAnchorEl(event.currentTarget); // Open the menu at the clicked button
    setSelectedRow(row); // Set the selected row before opening the menu
  };

  const handleAssignRole = () => {
    handleOpenDialog(); // Open the dialog for assigning roles
  };

  return (
    <>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === "actions" ? (
                      <>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleMenuClick(event, row)} // Pass row to handleMenuClick
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchorEl}
                          open={Boolean(menuAnchorEl)}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={handleAssignRole}>
                            AssignRole
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(row.no)}>
                            Delete
                          </MenuItem>
                          {/* Additional actions */}
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
