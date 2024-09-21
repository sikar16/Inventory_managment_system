import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { CSSTransition } from "react-transition-group";
import {
  TemplateAttributeType,
  TemplateType,
} from "../../../_types/template_type";

// Define column types for better control over alignment and labels
interface Column {
  id: keyof RowData;
  label: string;
  minWidth: number;
  align?: "left" | "right" | "center";
}

// Row data definition
interface RowData {
  no: number;
  templateId: string;
  template: string;
  attributes: TemplateAttributeType[];
}

// Define columns with alignment, width, and labeling
const columns: Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "templateId", label: "Template ID", minWidth: 70 },
  { id: "template", label: "Template", minWidth: 70, align: "left" },
];

// Function to create rows of data
function createData(
  no: number,
  templateId: string,
  template: string,
  attributes: TemplateAttributeType[]
) {
  return { no, templateId, template, attributes };
}

// Props for the Template Table
interface TemplateProps {
  templateList: TemplateType[];
}

const TemplateTable: React.FC<TemplateProps> = ({ templateList }) => {
  // Map data from templateList to rows
  const rows = templateList.map((i) =>
    createData(i.id, `${i.id}`, `${i.name}`, i.attributes)
  );

  // Pagination and row expansion states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  // Toggle row expansion
  const handleToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Pagination handlers
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
    <div className="flex justify-center p-4">
      <Paper
        sx={{
          overflow: "hidden",
          width: "100%",
          maxWidth: "900px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="template table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell className="bg-gray-100 dark:bg-gray-700"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={row.templateId}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof RowData];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="text-gray-800 dark:text-gray-300"
                          >
                            {Array.isArray(value)
                              ? value.map((item, itemIndex) => (
                                <p key={itemIndex}>{item.name}</p>
                              ))
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <button
                          className="flex items-center transition-colors duration-200 hover:bg-primary/10 dark:hover:bg-gray-800 rounded-lg p-2"
                          onClick={() => handleToggle(index)}
                        >
                          <div className="flex h-10 w-10 items-center justify-center bg-primary/5 text-primary dark:bg-white/5 rounded-lg">
                            {openFaqIndex === index ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </div>
                        </button>
                      </TableCell>
                    </TableRow>

                    {/* FAQ Row Expansion */}
                    <CSSTransition
                      in={openFaqIndex === index}
                      timeout={300}
                      classNames=""
                      unmountOnExit
                    >
                      <TableRow>
                        <TableCell colSpan={columns.length + 1}>
                          <div className="pl-16 py-4 bg-gray-50 dark:bg-gray-900 transition-all duration-500 ease-in-out rounded-lg shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                              Template Attributes
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                              {row.attributes.map(
                                (attribute, attrIndex) => (
                                  <p key={attrIndex} className="flex">
                                    <span className="font-medium mr-3">
                                      {attribute.name}:
                                    </span>
                                    <span>{attribute.dataType}</span>
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CSSTransition>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        />
      </Paper>
    </div>
  );
};

export default TemplateTable;
