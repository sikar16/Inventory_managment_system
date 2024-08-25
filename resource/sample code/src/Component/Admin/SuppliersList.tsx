import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddSuppliers from './AddSuppliers';
import SliderCom from './SliderCom';

const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'supplierId', label: 'SupplierId', minWidth: 50 },
    { id: 'supplierName', label: 'Supplier Name', minWidth: 200 },
    { id: 'category', label: 'Category', minWidth: 200, align: 'left' },
    { id: 'address', label: 'Address', minWidth: 200, align: 'left' },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

function createData(no, supplierId, supplierName, category, address) {
    return { no, supplierId, supplierName, category, address };
}

const rows = [
    createData(1, "#12345", "Zerubabel Damtew Zeru", "Electronics", "Ethiopia, Addis ababa, Megenagna"),
    createData(2, "#12345", "Zerubabel Damtew Zeru", "Electronics", "Ethiopia, Addis ababa, Megenagna"),
    createData(3, "#12345", "Zerubabel Damtew Zeru", "Electronics", "Ethiopia, Addis ababa, Megenagna"),
    createData(4, "#12345", "Zerubabel Damtew Zeru", "Electronics", "Ethiopia, Addis ababa, Megenagna"),
    createData(5, "#12345", "Zerubabel Damtew Zeru", "Electronics", "Ethiopia, Addis ababa, Megenagna"),
];

export default function SupplierList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

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
        <div className='mt-10'>
            <div>
                <div className='flex justify-between mb-3 mx-2'>
                    <p className='text-[#002a47] text-4xl font-medium'>Suppliers</p>
                    <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={handleOpenDialog}>Add Supplier</button>
                </div>
                <SliderCom />
            </div>
            <hr className='w-full text-black bg-black' />
            <div className='my-4'>
                <input type="text" placeholder='Search' className='w-[80%] bg-[#f5f5f5] rounded-md py-[5px] px-3' />
            </div>
            <div>
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
                                                        <div>
                                                            <IconButton
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true"
                                                                onClick={(event) => handleMenuClick(event, row)}
                                                            >
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                            <Menu
                                                                id="long-menu"
                                                                anchorEl={anchorEl}
                                                                keepMounted
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleMenuClose}
                                                            >
                                                                <MenuItem >Update</MenuItem>
                                                                <MenuItem >Delete</MenuItem>
                                                            </Menu>
                                                        </div>
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
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add new supplier</DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <AddSuppliers />
                </DialogContent>
            </Dialog>
        </div>
    );
}
