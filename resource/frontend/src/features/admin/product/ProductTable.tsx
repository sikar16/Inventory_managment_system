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
import { useState } from 'react';
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
function ProductTable({ anchorEl, setAnchorEl, setSelectedProduct, setOpenDetails }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
    return (
        <>
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
                                                onClose={handleCloseMenu}>
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
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
        </>
    )
}

export default ProductTable