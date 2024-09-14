import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { SupplierCategoryType } from '../../../_types/supplierCategory_type';

const columns: {
    id: string;
    label: string;
    minWidth: number;
    align?: "left" | "center" | "right" | "inherit" | "justify"; // Optional align property
}[] = [
        { id: 'no', label: 'No', minWidth: 50 },
        { id: 'suppliersid', label: 'Suppliers id', minWidth: 70 },
        { id: 'category', label: 'Category', minWidth: 70, align: 'left' },
    ];

interface RowType {
    no: number;
    suppliersid: string;
    category: string;
}

function createData(no: number, suppliersid: string, category: string): RowType {
    return { no, suppliersid, category };
}

interface SupplierCategoryProps {
    suppliersCategorylist: SupplierCategoryType[]; // Change to an array type
}

const SupplierCategoryTable: React.FC<SupplierCategoryProps> = ({ suppliersCategorylist }) => {
    const rows = suppliersCategorylist.map((i, index) =>  // Use index for 'no'
        createData(
            index + 1, // Assuming 'no' is the index + 1
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

    return (
        <>
            <div className="flex mx-[7%]">
                <Paper sx={{ overflow: 'hidden', maxWidth: 800, width: '100%' }}>
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.suppliersid}>
                                            {columns.map((column) => {
                                                const value = row[column.id as keyof RowType];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
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
        </>
    );
}

export default SupplierCategoryTable;