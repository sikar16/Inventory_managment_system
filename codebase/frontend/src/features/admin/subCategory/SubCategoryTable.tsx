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
}

const SubCategoryTable: React.FC<productSubcategoryprops> = ({
  subcategoryList,
}) => {
  const rows: RowData[] = subcategoryList.map((i) =>
    createData(i.id, `${i.id}`, `${i.category.name}`, `${i.name}`)
  );
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
  const [deleteProductSubCategory] = useDeleteProductSubCategoryMutation();

  const handleDelete = (id: string) => {
    console.log(id)
    deleteProductSubCategory(id);
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
                  <TableCell align="center">Actions</TableCell> {/* Add Actions column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.category}
                    >
                      {columns.map((column) => {
                        const value = row[column.id as keyof RowData];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <button onClick={() => handleDelete(row.subcategoryId)}>Delete</button>
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
    </>
  );
};

export default SubCategoryTable;
