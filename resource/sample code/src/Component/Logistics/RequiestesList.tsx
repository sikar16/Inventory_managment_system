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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MaterialRequestForm from '../MaterialRequistForm';
const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'orderId', label: 'Order Id', minWidth: 200 },
    { id: 'category', label: 'Category', minWidth: 200, align: 'left' },
    { id: 'product', label: 'Product', minWidth: 200, align: 'left' },
    { id: 'quantity', label: 'Quantity', minWidth: 200, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 200, align: 'left' },
    { id: 'createdAt', label: 'Created at', minWidth: 200, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 200, align: 'left' },
    { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
];

function createData(no: number, orderId: string, category: string, product: string, quantity: string, status: string, createdAt: string) {
    return { no, orderId, category, product, quantity, status, createdAt };
}

const rows = [
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
    createData(1, "#12345", "Electronics", "Lenevo", "20", "Active", "16-08-2024"),
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

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    PaperProps={{
                        style: {
                            width: '70vw',
                            maxWidth: '70vw', // Prevents it from being wider than 70% of viewport width
                        },
                    }}
                    className="relative mx-auto"
                >
                    <div className='flex justify-between p-4'>
                        <DialogTitle
                        // className='bg-[#002a47] text-white rounded-e-full '
                        >
                            <p className='bg-[#002a47] text-white rounded-e-full pe-20 ps-2 py-[5px] '>
                                Material Request Form
                            </p>
                            {/* Material Request Form */}
                        </DialogTitle>
                        <DialogActions>
                            <svg
                                onClick={handleCloseDialog}
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 24 24"
                                className="cursor-pointer"
                            >
                                <path
                                    fill="none"
                                    stroke="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                                ></path>
                            </svg>
                        </DialogActions>
                    </div>
                    <div>
                        <DialogContent>
                            <MaterialRequestForm />
                        </DialogContent>
                    </div>
                </Dialog>



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
        </div>
    );
}
