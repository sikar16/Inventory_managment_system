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
import { useState } from "react";
import { UserType } from "../../../_types/user_type";

const columns = [
  { id: "no", label: "No", maxWidth: 10 },
  { id: "fullName", label: "Full name", minWidth: 200 },
  { id: "department", label: "Department", minWidth: 180, align: "left" },
  { id: "email", label: "Email", minWidth: 80, align: "left" },
  { id: "phone", label: "Phone", minWidth: 80, align: "left" },
  { id: "gender", label: "Gender", minWidth: 50, align: "left" },
  { id: "address", label: "Address", minWidth: 250, align: "left" },
  { id: "actions", label: "Actions", minWidth: 30, align: "center" },
];

function createData(
  no: number,
  fullName: string,
  department: string,
  email: string,
  phone: string,
  gender: string,
  address: string
) {
  return { no, fullName, department, email, phone, gender, address };
}

interface UsersTableProps {
  userList: UserType[];
}

const UsersTable: React.FC<UsersTableProps> = ({ userList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [rows, setRows] = useState(
    userList.map((i) =>
      createData(
        i.id,
        `${i.profile.firstName} ${i.profile.middleName} ${i.profile.lastName}`,
        `${i.department.name}`,
        `${i.email}`,
        `${i.profile.phone}`,
        `${i.profile.gender}`,
        `${i.profile.address.city} ${i.profile.address.subCity}`
      )
    )
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRow(row); // Store the selected row
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8888/api/user/${id}`, {
        method: "DELETE",

      });
      console.log(`User with id ${id} deleted`);

      setRows((prevRows) => prevRows.filter((row) => row.no !== id));
      setMenuAnchorEl(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "30px" }} className="bg-green-900">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ color: "gray" }} // Dark mode text color
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
                            <MenuItem onClick={() => handleDelete(row.no)}>Delete</MenuItem>
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersTable;
