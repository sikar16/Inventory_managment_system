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
import AddProduct from './AddProduct'; // Import the AddProduct component

const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'productId', label: 'Product Id', minWidth: 70 },
    { id: 'product', label: 'Product', minWidth: 70, align: 'left' },
    { id: 'category', label: 'Category', minWidth: 70, align: 'left' },
    { id: 'subCategory', label: 'Sub Category', minWidth: 70, align: 'left' },
];

function createData(no: number, productId: string, product: string, category: string, subCategory: string) {
    return { no, productId, product, category, subCategory };
}

const rows = [
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
    createData(1, "#12345", "Lenovo", "Electronics", "Computer"),
];

export default function ProductList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);
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

    const handleViewDetails = () => {
        setOpenDetails(true);
        handleCloseMenu();
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className='mx-10 mt-10'>
            <div className='flex justify-between mb-3 mx-2'>
                <p className='text-[#002a47] text-4xl font-medium'>Product</p>
                <button className='bg-[#002A47] px-3 py-1 text-white rounded-md' onClick={handleOpenDialog}>Add Product</button>
            </div>

            <div className='flex flex-wrap gap-2 mt-10 mx-10 mb-5'>
                <div className='bg-[#F5F5F5] px-3 py-3 rounded-md mb-2 flex items-center '>
                    <p className='me-3 text-gray-500'>Category :</p>
                    <select className='bg-[#F5F5F5] text-gray-700'>
                        <option value="">Electronics</option>
                        <option value="">Stationary</option>
                        <option value="">Food</option>
                        <option value="">Drink</option>
                    </select>
                </div>
                <div className='bg-[#F5F5F5] px-3 py-3 rounded-md mb-2 flex items-center '>
                    <p className='me-3 text-gray-500'>Sub Category :</p>
                    <select className='bg-[#F5F5F5] text-gray-700'>
                        <option value="">Computer</option>
                        <option value="">Mobile</option>
                    </select>
                </div>
                <div className='bg-[#F5F5F5] px-3 py-3 rounded-md mb-2 flex items-center '>
                    <p className='me-3 text-gray-500'>Template :</p>
                    <select className='bg-[#F5F5F5] text-gray-700'>
                        <option value="">Computer</option>
                        <option value="">Mobile</option>
                    </select>
                </div>
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
                                <TableCell>Actions</TableCell>
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
                                                <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
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

            <Dialog open={openDetails} onClose={handleCloseDetails} className=''>
                <DialogTitle> <strong>Product Details</strong></DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <div className=' grid grid-cols-2 gap-4'>
                            <p className='text-md'> Product ID: <span className='text-sm'>{selectedProduct.productId}</span> </p>
                            <p className='text-md'>Product: <span className='text-sm'>{selectedProduct.product} </span></p>
                            <p className='text-md'>Category: <span className='text-sm'>{selectedProduct.category} </span></p>
                            <p className='text-md'>Template: <span className='text-sm'>Mobile </span></p>
                            <p className='text-md '>Attributes:
                                <div className='grid grid-cols-2 w-full text-sm  gap-2 mt-2 '>
                                    <p className='ms-3'>RAM  - 8GB</p>
                                    <p className='ms-3'>ROM  - 8GB</p>
                                    <p className='ms-3'>Graphics  - 8GB</p>
                                    <p className='ms-3'>Screen size  - 8GB</p>

                                </div>
                            </p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <div className='flex justify-between me-5'>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <AddProduct />
                </DialogContent>

            </Dialog>
        </div>
    );
}
