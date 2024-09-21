
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
import { Link } from 'react-router-dom';

interface Column {
    id: string;
    label: string;
    minWidth: number;
    align?: 'left' | 'right' | 'center'; // Optional align property
}

const columns: Column[] = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'orderId', label: 'Order Id', minWidth: 70 },
    { id: 'requestedEmployee', label: 'Requested Employee', minWidth: 70, align: 'left' },
    { id: 'product', label: 'Product', minWidth: 70, align: 'left' },
    { id: 'quantity', label: 'Quantity', minWidth: 70, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 70, align: 'left' },
    { id: 'dateOfRequest', label: 'Date of request', minWidth: 70, align: 'left' },
];

interface RowType {
    no: number;
    orderId: string;
    requestedEmployee: string;
    product: string;
    quantity: string;
    status: string;
    dateOfRequest: string;
}


function createData(no: number, orderId: string, requestedEmployee: string, product: string, quantity: string, status: string, dateOfRequest: string): RowType {
    return { no, orderId, requestedEmployee, product, quantity, status, dateOfRequest };
}

const rows: RowType[] = [
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),
    createData(1, "#12345", "Zerubabel ", "Hp laptop", "20", "Active", "8-26-2024"),

];

export default function IncomingRequest() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = React.useState<RowType | null>(null);
    console.log(selectedProduct)
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, product: RowType) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    const [addMaterialReq, setAddMaterialReq] = React.useState(false);
    console.log(addMaterialReq)
    const handleAddMaterialReq = () => {
        setAddMaterialReq(true); // Set to true when adding a user
    };


    return (
        <div className='mt-10 mx-7'>

            {/* <Link onClick={handleOpenDialog} to="/employee/create-requests">
                <Title tableName={"Incoming request"} action={'Create req'} />
            </Link> */}

            <div className='flex justify-between mb-3 mx-4'>
                <p className='text-[#002a47] dark:text-gray-200 text-4xl font-medium'>Incoming Requestes</p>
                <Link to='/department-head/material-request'>
                    <button onClick={handleAddMaterialReq} className='bg-[#002A47] dark:bg-[#313131] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md'>
                        Material Req
                    </button>
                </Link>
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                                        {columns.map((column) => {
                                            const value = row[column.id as keyof RowType];
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
            {/* <Dialog
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
                    <DialogTitle>
                        <p className='bg-[#002a47] text-white rounded-e-full pe-20 ps-2 py-[5px] '>
                            Material Request Form
                        </p>
                    </DialogTitle>
                    <DialogActions>
                        <svg onClick={handleCloseDialog} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path></svg>
                    </DialogActions>
                </div>
                <DialogContent>
                    <MaterialRequistForm />
                </DialogContent>
            </Dialog> */}


        </div>
    );
}
