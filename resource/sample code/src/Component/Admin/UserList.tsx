import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SliderCom from './SliderCom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'fullName', label: 'Full name', minWidth: 200 },
    { id: 'department', label: 'Department', minWidth: 200, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'left' },
    { id: 'phone', label: 'Phone', minWidth: 200, align: 'left' },
    { id: 'gender', label: 'Gender', minWidth: 200, align: 'left' },
    { id: 'address', label: 'Address', minWidth: 200, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 200, align: 'left' },
    { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
];

function createData(no, fullName, department, email, phone, gender, address, status) {
    return { no, fullName, department, email, phone, gender, address, status };
}

const rows = [
    createData(2, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
    createData(1, "Zerubabel Damtew Zeru", "Information Technology", "zeru@gmail.com", "0965199682", "Male", "Addis Ababa", "Active"),
];

export default function UserList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };



    return (
        <div className='mx-10 mt-10'>
            <div>
                <div className='flex justify-between mb-3 mx-2'>
                    <p className='text-[#002a47] text-4xl font-medium'>User</p>
                    <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={() => console.log("object")}>Add User</button>
                </div>
                <SliderCom />
            </div>
            <div className='bg-[#F5F5F5] w-[20%] px-3 py-1 rounded-md mb-4 flex'>
                <p className='me-3 text-gray-500'>Role:</p>
                <select name="" id="" className='w-[70%] bg-[#F5F5F5] text-gray-700'>
                    <option value="">Finance</option>
                    <option value="">Logistics</option>
                    <option value="">Information Technology</option>
                    <option value="">Human Resource</option>
                </select>
            </div>
            <div className='flex gap-8 text-gray-400 mt-8 mb-1'>
                <button className='hover:underline hover:text-black'>All Users</button>
                <button className='hover:underline hover:text-black'>Finance</button>
                <button className='hover:underline hover:text-black'>Information Technology</button>
                <button className='hover:underline hover:text-black'>Human Resource</button>
            </div>
            <hr className='w-full text-black bg-black' />
            <div className='my-4'>
                <input type="text" placeholder='Search' className='w-[80%] bg-[#f5f5f5] rounded-md py-[5px] px-3' />
            </div>

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
                                                        onClick={(event) => handleMenuClick(event, row)}
                                                    >
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
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem>Update</MenuItem>
                <MenuItem>Delete</MenuItem>
            </Menu>
        </div>
    );
}
