import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, MouseEvent } from 'react';
import { ProductCategoryType } from '../../../_types/productCategory_type';
import { useDeleteProductCategoryMutation } from '../../../services/productCategorySerivce';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const columns: {
    id: string;
    label: string;
    minWidth: number;
    align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
}[] = [
        { id: 'no', label: 'No', minWidth: 50 },
        { id: 'categoryId', label: 'Category Id', minWidth: 70 },
        { id: 'category', label: 'Category', minWidth: 70, align: 'left' },
    ];

function createData(no: number, categoryId: string, category: string) {
    return { no, categoryId, category };
}

type RowData = ReturnType<typeof createData>;

interface ProductCategoryProps {
    productCategorylist?: ProductCategoryType[];
    setAnchorEl: (value: null | HTMLElement) => void;
    anchorEl: HTMLElement | null;
    setSelectedCategory: (product: ProductCategoryType) => void;
    selectedCategory: ProductCategoryType | null;
}

const CategoryTable: React.FC<ProductCategoryProps> = ({
    productCategorylist = [], // Default to empty array
    setAnchorEl,
    anchorEl,
    selectedCategory,
    setSelectedCategory,
}) => {
    const rows: RowData[] = productCategorylist.map((i, index) =>
        createData(
            index + 1, // Use index as the row number
            `${i.id}`,
            `${i.name}`
        )
    );
    console.log(selectedCategory)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (
        event: MouseEvent<HTMLButtonElement>,
        category: ProductCategoryType
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [deleteProductCategory] = useDeleteProductCategoryMutation();

    const handleDelete = async (id: string) => {
        try {
            console.log("Deleting category with ID:", id);  // Add logging for better debugging
            await deleteProductCategory(id).unwrap();  // Trigger the delete mutation
            console.log('Category deleted successfully');
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
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
                                .map((row, index) => {
                                    const category = productCategorylist[index]; // Get the product corresponding to the row index

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.categoryId}>
                                            {columns.map((column) => {
                                                const value = row[column.id as keyof RowData];
                                                return (
                                                    <TableCell key={column.id} align={column.align || 'left'}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleClick(event, category)} // Pass the full product object
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleCloseMenu}
                                                >
                                                    <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                                                    <MenuItem onClick={() => handleDelete(row.categoryId)}>Delete</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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
