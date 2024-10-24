import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Box,
  Dialog,
  ListItemIcon,
  MenuItem,
  lighten,
  Autocomplete,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DeleteForever } from "@mui/icons-material";
import { useToast } from "../../../context/ToastContext";
import Warning from "../../../component/Warning";
import { ErrorResponseType } from "../../../_types/request_reponse_type";
import { useDeleteSupplierCategoryMutation } from "../../../services/supplierCategoryService";
import { supplierCategoryType } from "../../../_types/supplierCategory_type";
import UpdateSupplierCategory from "./form/UpdateSupplierCategory";

export type SupplierCategoryListTableProps = {
  supplierCategoryList: supplierCategoryType[] | undefined;
};

const SupplierCategoryListTable = ({
  supplierCategoryList,
}: SupplierCategoryListTableProps) => {
  const { setToastData } = useToast();
  const [selectedRowData, setSelectedRowData] =
    useState<supplierCategoryType | null>(null);
  const [deleteSupplierCategory, { isLoading, isSuccess }] =
    useDeleteSupplierCategoryMutation();
  const [openEdit, setOpenEdit] = useState(false);
  const [openReset] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenEdit = (row: supplierCategoryType) => {
    setSelectedRowData(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenDelete = (row: supplierCategoryType) => {
    setSelectedRowData(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteDepartment = async () => {
    if (selectedRowData?.id != null) {
      try {
        await deleteSupplierCategory(selectedRowData.id).unwrap();
        setToastData({
          message: "Supplayer Category deleted successfully",
          success: true,
        });
        handleCloseDelete();
      } catch (error: any) {
        handleCloseDelete();
        const res: ErrorResponseType = error;
        setToastData({
          message: res.data.message,
          success: false,
        });
      }
    } else {
      handleCloseDelete();
      setToastData({
        message: "Supplayer Category not selected is missing",
        success: false,
      });
    }
  };

  // Get unique suggestions from the user data for Autocomplete

  const nameSuggestions =
    supplierCategoryList == undefined
      ? []
      : supplierCategoryList.map((user) => user.name);

  const columns = useMemo<MRT_ColumnDef<supplierCategoryType>[]>(
    () => [
      {
        id: "Supplayer category",
        header: "Supplayer category",
        columns: [
          {
            accessorFn: (row) => `${row.name}`,
            id: "name",
            header: "Name",
            size: 250,
            Filter: ({ column }) => (
              <Autocomplete
                options={nameSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Name"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
        ],
      },
    ],
    [nameSuggestions]
  );

  const table = useMaterialReactTable({
    columns,
    data: supplierCategoryList == undefined ? [] : supplierCategoryList,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
      showGlobalFilter: true, // This should be true
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={`edit-${row.original.id}`}
        onClick={() => {
          handleClickOpenEdit(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        Edit
      </MenuItem>,

      <MenuItem
        key={`delete-${row.original.id}`}
        onClick={() => {
          handleClickOpenDelete(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <DeleteForever />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],

    renderTopToolbar: () => (
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: "flex",
          gap: "0.5rem",
          p: "8px",
          justifyContent: "space-between",
        })}
      >
        <Autocomplete
          options={nameSuggestions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              variant="outlined"
              size="small"
              sx={{ width: "300px" }} // Adjust the width as needed
            />
          )}
          onChange={(_event, value) => {
            // Set global filter based on the selected suggestion
            table.setGlobalFilter(value);
          }}
        />
      </Box>
    ),
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
      <Dialog open={openEdit}>
        <UpdateSupplierCategory
          handleCloseDialog={handleCloseEdit}
          selectedCategory={selectedRowData}
        />
      </Dialog>
      <Dialog open={openReset}></Dialog>
      <Dialog open={openDelete}>
        <Warning
          handleClose={handleCloseDelete}
          handleAction={handleDeleteDepartment}
          message={`Are you sure you want to delete product category ${selectedRowData?.id} :  ${selectedRowData?.name}?`}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Dialog>
    </Box>
  );
};

export default SupplierCategoryListTable;
