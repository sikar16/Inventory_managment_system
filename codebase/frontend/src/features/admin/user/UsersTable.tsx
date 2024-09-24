import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserType } from "../../../_types/user_type";
import { useDeleteUserMutation } from "../../../services/user_service";

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
  gender: string,
  address: string,
  actions: boolean
) {
  return { no, fullName, department, email, phone, gender, address, actions };
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
  // console.log(selectedRow);
  // console.log(setRowsPerPage);
  useEffect(() => {
    const newRows = userList.map((i) =>
      createData(
        i.id,
        `${i.profile.firstName} ${i.profile.middleName || ""} ${i.profile.lastName
        }`,
        `${i.department.name}`,
        `${i.email}`,
        `${i.profile.phone}`,
        `${i.profile.gender}`,
        `${i.profile.address.city} ${i.profile.address.subCity}`,
        true
      )
    );
    setRows(newRows);
  }, [userList]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setRowsPerPage(Number(event.target.value)); // Ensure the value is a number
  //   setPage(0);
  // };

  // console.log(handleChangeRowsPerPage);

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

  const [deleteUser] = useDeleteUserMutation("")

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

  const activeStatus = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.no === id ? { ...row, isActive: !row.actions } : row
      )
    );
    setMenuAnchorEl(null);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "30px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
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
                              onClick={(event) => handleMenuClick(event, row)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={menuAnchorEl}
                              open={Boolean(menuAnchorEl)}
                              onClose={handleCloseMenu}
                            >
                              <MenuItem>Edit</MenuItem>
                              <MenuItem onClick={() => handleDelete(row.no)}>
                                Delete
                              </MenuItem>
                              {row.actions ? (
                                <MenuItem onClick={() => activeStatus(row.no)}>
                                  <button className="text-red-600">
                                    Deactivate
                                  </button>
                                </MenuItem>
                              ) : (
                                <MenuItem onClick={() => activeStatus(row.no)}>
                                  <button className="text-green-600">
                                    Activate
                                  </button>
                                </MenuItem>
                              )}
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
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage} // Keep as is
      />
    </Paper>
  );
};

export default UsersTable;
