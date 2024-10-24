import * as React from "react";
import { Box, Dialog } from "@mui/material";
import RectangularButton from "../../../component/ui/RectangularButton";
import { useGetAllUsersQuery } from "../../../services/user_service";
import AddUser from "./form/AddUser";
import UsersListTable from "./UsersTable";

const UsersList = () => {
  const { data: users } = useGetAllUsersQuery();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p className="text-2xl font-semibold mb-3">User</p>
      <div>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 1,
              right: 1,
              margin: 0,
              padding: 2,
            }}
          >
            <RectangularButton type="primary" onClick={handleClickOpen}>
              <p className="px-3">Add User</p>
            </RectangularButton>
          </Box>
        </Box>
        <UsersListTable userList={users} />
        <Dialog open={open} onClose={handleClickClose}>
          <AddUser handleCloseDialog={handleClickClose} />
        </Dialog>
      </div>
    </>
  );
};

export default UsersList;
