import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { ProductCategoryType } from '../../../_types/productCategory_type';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteProductCategoryMutation } from '../../../services/productCategorySerivce';

const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'categoryId', label: 'Category Id', minWidth: 70 },
    { id: 'category', label: 'Category', minWidth: 70, align: 'left' },
];

function createData(no: number, categoryId: string, category: string) {
    return { no, categoryId, category };
}

interface ProductCategoryProps {
    anchorEl: any;
    setAnchorEl: any;
    productCategorylist?: ProductCategoryType[]; // Optional to handle undefined
}

const CategoryTable: React.FC<ProductCategoryProps> = ({
    productCategorylist = [] // Default to empty array
}) => {
    const rows = productCategorylist.map((i, index) =>
        createData(
            index + 1, // Use index as the row number
            `${i.id}`,
            `${i.name}`
        )
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [deleteProductCategory] = useDeleteProductCategoryMutation();

    const handleDelete = (id: string) => {
        deleteProductCategory(id);
    };

    return (
        <div className="flex mx-[7%]">
            <Paper sx={{ overflow: 'hidden', width: '100%' }}>
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
                                <TableCell align="center">Actions</TableCell> {/* Add Actions column */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.categoryId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="center">
                                            <button onClick={() => handleDelete(row.categoryId)}>Delete</button>
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
        </div>
    );
};

export default CategoryTable;
