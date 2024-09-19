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
import { useDeleteProductCategoryMutation } from '../../../services/productCategorySerivce';

const columns: {
    id: string;
    label: string;
    minWidth: number;
    align?: "center" | "left" | "right" | "inherit" | "justify";
}[] = [
        { id: "no", label: "No", minWidth: 50 },
        { id: "categoryId", label: "Category Id", minWidth: 70 },
        { id: "category", label: "Category", minWidth: 70, align: "left" },
    ];

function createData(no: number, categoryId: string, category: string) {
    return { no, categoryId, category };
}

type RowData = ReturnType<typeof createData>;

interface ProductCategoryProps {
    productCategorylist?: ProductCategoryType[]; // Optional to handle undefined
}
const CategoryTable: React.FC<ProductCategoryProps> = ({
    productCategorylist = [] // Default to empty array
}) => {
    const rows: RowData[] = productCategorylist.map((i, index) =>
        createData(
            index + 1, // Use index as the row number
            `${i.id}`,
            `${i.name}`
        )
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [deleteProductCategory] = useDeleteProductCategoryMutation();

    const handleDelete = (id: string) => {
        console.log(id)
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
                                            const value = row[column.id as keyof RowData];
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
