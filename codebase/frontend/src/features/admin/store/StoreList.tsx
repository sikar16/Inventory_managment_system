import { Box, Dialog } from "@mui/material";
import RectangularButton from "../../../component/ui/RectangularButton";

import { useState } from "react";
import { useGetAllStoresQuery } from "../../../services/store_service";
import AddStore from "./form/AddStore";
import StoreListTable from "./StoreTable";

const StoreList = () => {
  const { data: stores } = useGetAllStoresQuery();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
            margin: 0,
          }}
        >
          <RectangularButton type="primary" onClick={handleClickOpen}>
            Add Store
          </RectangularButton>
        </Box>
      </Box>
      <StoreListTable stores={stores} />
      <Dialog open={open} onClose={handleClickClose}>
        <AddStore handleCloseDialog={handleClickClose} />
      </Dialog>
    </div>
  );
};

export default StoreList;
