import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SliderCom from '../Admin/SliderCom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import logo from "../../assets/logo.png"
const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'orderId', label: 'Order Id', minWidth: 100 },
    { id: 'requestedDepartment', label: 'Requested Department', minWidth: 100, align: 'left' },
    { id: 'quantity', label: 'Quantity', minWidth: 100, align: 'left' },

];

function createData(no: number, orderId: string, requestedDepartment: string, quantity: string) {
    return { no, orderId, requestedDepartment, quantity };
}

const rows = [
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),
    createData(1, "#12345", "Finance", "20"),

];

export default function RequiestesList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <div>
            <div className='w-full bg-[#002a47]'>
                <div className='ms-10 pt-5 flex justify-between'>
                    <img src={logo} alt="" className='w-24 md:w-40' />
                    <svg className='me-10' xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="#ffffff" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"></path></svg>
                </div>
            </div>
            <div className='mx-10 mt-6'>
                <div>
                    <div className='flex justify-between mb-3 mx-2'>
                        <p className='text-[#002a47] text-4xl font-medium'>Requests</p>
                        <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={handleOpenDialog}>Create request</button>
                    </div>
                    <SliderCom />
                </div>
                <div className='flex gap-8 text-gray-400 mt-8 mb-1'>
                    <button className='hover:underline hover:text-black'>All requests</button>
                    <button className='hover:underline hover:text-black'>Accepted requests</button>
                    <button className='hover:underline hover:text-black'>Pending requests</button>
                    <button className='hover:underline hover:text-black'>Rejected requests</button>
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
                                        {/* <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" ><path fill="#002A47" d="M9.923 16.5H13.5v-1H9.923zm0-4H16.5v-1H9.923zM7.5 8.5h9v-1h-9zM3 21v-1h2.704q-1.2-.46-1.966-1.527q-.767-1.067-.767-2.434q0-1.764 1.243-2.998q1.244-1.233 3.007-1.233v1q-1.355 0-2.303.944q-.947.944-.947 2.306q0 1.167.725 2.051t1.843 1.124v-2.771h1V21zm6.923-1v-1h8.462q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v3.807H4V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20z"></path></svg>
                                        </div> */}
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
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
            </div>
        </div>
    );
}
