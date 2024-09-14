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

interface Column {
  id: keyof RowType; // Ensure this matches the keys of RowType
  label: string;
  minWidth: number;
  align?: "left" | "center" | "right" | "inherit" | "justify";
}

const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "subcategoryId", label: "SubCategory Id", minWidth: 70 },
  { id: "category", label: "Category", minWidth: 70, align: "left" },
  { id: "subCategory", label: "SubCategory", minWidth: 70, align: "left" },
];

interface RowType {
  no: number;
  subcategoryId: string;
  category: string;
  subCategory: string;
}

function createData(
  no: number,
  subcategoryId: string,
  category: string,
  subCategory: string
): RowType {
  return { no, subcategoryId, category, subCategory };
}

interface ProductSubCategoryProps {
  subcategoryList: ProductSubCategoryType[];
}

const SubCategoryTable: React.FC<ProductSubCategoryProps> = ({
  subcategoryList,
}) => {
  const rows = subcategoryList.map((i) =>
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
                      key={row.subcategoryId}
                    >
                      {columns.map((column) => {
                        const value = row[column.id as keyof RowType]; // Type assertion
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
};

export default SubCategoryTable;