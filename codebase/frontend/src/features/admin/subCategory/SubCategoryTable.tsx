import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ProductSubCategoryType } from "../../../_types/productSubcategory_type";
import { useDeleteProductSubCategoryMutation } from "../../../services/productSubcategory_service";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const columns: {
  id: string;
  label: string;
  minWidth: number;
  align?: "center" | "left" | "right" | "inherit" | "justify";
}[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "subcategoryId", label: "SubCategory Id", minWidth: 70 },
  { id: "category", label: "Category", minWidth: 70, align: "left" },
  { id: "subCategory", label: "SubCategory", minWidth: 70, align: "left" },
];

function createData(
  no: number,
  subcategoryId: string,
  category: string,
  subCategory: string
) {
  return { no, subcategoryId, category, subCategory };
}

type RowData = ReturnType<typeof createData>;

interface productSubcategoryprops {
  subcategoryList: ProductSubCategoryType[];
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
  setSelectedSubCategory: (product: ProductSubCategoryType) => void;
  selectedSubCategory: ProductSubCategoryType | null;
}

const SubCategoryTable: React.FC<productSubcategoryprops> = ({
  subcategoryList,
  setSelectedSubCategory,
  anchorEl,
  setAnchorEl,
  selectedSubCategory,
}) => {
  const rows: RowData[] = subcategoryList.map((i, index) =>
    createData(index + 1, `${i.id}`, `${i.category.name}`, `${i.name}`)
  );
  console.log(selectedSubCategory?.id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    subCategory: ProductSubCategoryType
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubCategory(subCategory);
  };
  const [deleteProductSubCategory] = useDeleteProductSubCategoryMutation();

  const handleDelete = async (id: number) => {
    console.log("Deleting category with ID:", id); // Log to check if the correct id is passed
    try {
      await deleteProductSubCategory(id).unwrap(); // Ensure the correct ID is being used
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex mx-[7%]">
        <Paper sx={{ overflow: "hidden", maxWidth: 800, width: "100%" }}>
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
                  <TableCell align="center">Actions</TableCell>{" "}
                  {/* Add Actions column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const category = subcategoryList[index]; // Ensure the correct product is accessed for each row

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.category}
                      >
                        {columns.map((column) => {
                          const value = row[column.id as keyof RowData];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align || "left"}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell align="center">
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, category)} // Pass the correct category object here
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                          >
                            <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleDelete(parseInt(row.subcategoryId))
                              }
                            >
                              {" "}
                              {/* Pass the correct id */}
                              Delete
                            </MenuItem>
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
    </>
  );
};

export default SubCategoryTable;
