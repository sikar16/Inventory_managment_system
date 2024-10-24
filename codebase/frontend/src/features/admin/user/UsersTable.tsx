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

import { UserType } from "../../../_types/user_type";
import AssignRole from "./form/AssignRole";
import { useDeleteUserMutation } from "../../../services/user_service";

export type UsersListTableProps = {
  userList: UserType[] | undefined;
};

const UsersListTable = ({ userList }: UsersListTableProps) => {
  const { setToastData } = useToast();
  const [selectedRowData, setSelectedRowData] = useState<UserType | null>(null);
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();
  const [openEdit, setOpenEdit] = useState(false);
  const [openReset] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // Inside your component
  const handleClickOpenEdit = (row: UserType) => {
    setSelectedRowData(row);
    setOpenEdit(true);
  };

  const handleClickCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenDelete = (row: UserType) => {
    setSelectedRowData(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteUser = async () => {
    if (selectedRowData?.id != null) {
      try {
        await deleteUser(selectedRowData.id).unwrap();
        setToastData({
          message: "Department deleted successfully",
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
        message: "Department not selected is missing",
        success: false,
      });
    }
  };

  // Get unique suggestions from the user data for Autocomplete

  const nameSuggestions =
    userList == undefined ? [] : userList.map((user) => user.profile.firstName);
  const roleSuggestions =
    userList == undefined ? [] : userList.map((user) => user.role);
  const columns = useMemo<MRT_ColumnDef<UserType>[]>(
    () => [
      {
        id: "users",
        header: "users",
        columns: [
          {
            accessorFn: (row) => `${row.profile.firstName}`,
            id: "firstName",
            header: "firstName",
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
          {
            accessorFn: (row) => `${row.profile.middleName}`,
            id: "middleName",
            header: "middleName",
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
          {
            accessorFn: (row) => `${row.email}`,
            id: "email",
            header: "email",
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
          {
            accessorFn: (row) => `${row.profile.lastName}`,
            id: "lastName",
            header: "lastName",
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
          {
            id: "details",
            header: "Details",
            columns: [
              {
                accessorKey: "role",
                header: "Role",
                size: 200,
                Cell: ({ cell }) => {
                  const role = cell.getValue<string>(); // Get the role value

                  // Set the background color based on the role
                  let backgroundColor;
                  switch (role) {
                    case "super_admin":
                      backgroundColor = "#d32f2f"; // Red for super admin
                      break;
                    case "DEPARTMENT_HEAD":
                      backgroundColor = "#1976d2"; // Blue for department head
                      break;
                    case "EMPLOYEE":
                      backgroundColor = "#4caf50"; // Green for employee
                      break;
                    case "ADMIN":
                      backgroundColor = "#ff9800"; // Orange for admin
                      break;
                    case "LOGISTIC_SUPERVISOR":
                      backgroundColor = "#3f51b5"; // Indigo for logistic supervisor
                      break;
                    case "FINANCE":
                      backgroundColor = "#9c27b0"; // Purple for finance
                      break;
                    case "GENERAL_MANAGER":
                      backgroundColor = "#f44336"; // Red for general manager
                      break;
                    case "STORE_KEEPER":
                      backgroundColor = "#e91e63"; // Pink for store keeper
                      break;
                    default:
                      backgroundColor = "#9e9e9e"; // Grey for fallback
                  }

                  return (
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: backgroundColor, // Use the defined background color
                        borderRadius: "0.25rem",
                        color: "#fff",
                        maxWidth: "9ch",
                        p: "0.25rem",
                      }}
                    >
                      {role}
                    </Box>
                  );
                },
                Filter: ({ column }) => (
                  <Autocomplete
                    options={roleSuggestions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter by Role"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    onChange={(_event, value) => column.setFilterValue(value)}
                  />
                ),
              },
              {
                accessorFn: (row) => new Date(row.createdAt),
                id: "createdAt",
                header: "Created At",
                filterVariant: "date",
                sortingFn: "datetime",
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
              },
              {
                accessorFn: (row) => new Date(row.createdAt),
                id: "updatedAt",
                header: "Updated At",
                filterVariant: "date",
                sortingFn: "datetime",
                Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
              },
            ],
          },
        ],
      },
    ],
    [nameSuggestions]
  );

  const table = useMaterialReactTable({
    columns,
    data: userList == undefined ? [] : userList,
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
        Assign Role
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
        <div className="m-5 p=5">
          <AssignRole
            selectedRow={selectedRowData}
            handleCloseDialog={handleClickCloseEdit}
          />
        </div>
      </Dialog>
      <Dialog open={openReset}></Dialog>
      <Dialog open={openDelete}>
        <Warning
          handleClose={handleCloseDelete}
          handleAction={handleDeleteUser}
          message={`Are you sure you want to delete product category ${selectedRowData?.id} :  ${selectedRowData?.profile.firstName}?`}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Dialog>
    </Box>
  );
};

export default UsersListTable;
