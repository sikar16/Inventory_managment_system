
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// import MaterialRequistForm from '../MaterialRequistForm';

const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'orderId', label: 'Order Id', minWidth: 70 },
    { id: 'requestedEmployee', label: 'Requested Employee', minWidth: 70, align: 'left' },
    { id: 'product', label: 'Product', minWidth: 70, align: 'left' },
    { id: 'quantity', label: 'Quantity', minWidth: 70, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 70, align: 'left' },
    { id: 'dateOfRequest', label: 'Date of request', minWidth: 70, align: 'left' },
];

function createData(no: number, orderId: string, requestedEmployee: string, product: string, quantity: string, status: string, dateOfRequest: string) {
    return { no, orderId, requestedEmployee, product, quantity, status, dateOfRequest };
}

const rows = [
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),

];

export default function Approvals() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, product: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className='pt-10 mx-7'>
            <div className='flex justify-between mb-3 mx-2'>
                <p className='text-[#002a47] text-4xl font-medium'>Approval request</p>
                {/* <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={handleOpenDialog}>Add Product</button> */}
            </div>
            <hr className='w-full text-black bg-black' />
            <div className='my-4'>
                <input type="text" placeholder='Search' className='w-[80%] bg-[#f5f5f5] rounded-2xl py-[5px] px-3' />
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
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.productId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={(event) => handleClick(event, row)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleCloseMenu}
                                            >
                                                <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                                                <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog open={openDialog} onClose={handleCloseDialog}
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    style: {
                        width: '70vw',
                        maxWidth: '70vw',
                        height: '90vw'
                    },
                }}
                className="relative mx-auto"
            >
                <div className='flex justify-between me-5'>

                </div>

            </Dialog>
        </div>
    );
}
