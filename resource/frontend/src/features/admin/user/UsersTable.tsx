import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState } from 'react';

const columns = [
    { id: 'no', label: 'No', maxWidth: 10 },
    { id: 'fullName', label: 'Full name', minWidth: 200 },
    { id: 'department', label: 'Department', minWidth: 180, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 80, align: 'left' },
    { id: 'phone', label: 'Phone', minWidth: 80, align: 'left' },
    { id: 'gender', label: 'Gender', minWidth: 50, align: 'left' },
    { id: 'address', label: 'Address', minWidth: 120, align: 'left' },
    { id: 'actions', label: 'Actions', minWidth: 30, align: 'center' },
];

function createData(no: number, fullName: string, department: string, email: string, phone: string, gender: string, address: string) {
    return { no, fullName, department, email, phone, gender, address };
}
const rows = [
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa"),
];
const UsersTable = ({ anchorEl, setAnchorEl }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                // sx={{
                                //     backgroundColor: '#313131', // Dark background color
                                //     color: 'white',
                                //     fontWeight: 'bold',
                                // }}
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
                                            {column.id === 'actions' ? (
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleMenuClick(event, row)}>
                                                    <MoreVertIcon />
                                                </IconButton>
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
                onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>


    )
}
export default UsersTable