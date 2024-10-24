import { Box, Dialog } from "@mui/material";
import RectangularButton from "../../../component/ui/RectangularButton";
import { useState } from "react";
import { useGetAllSupplierCategoryQuery } from "../../../services/supplierCategoryService";
import SupplierCategoryListTable from "./SupplierCategoryTable";
import AddSupplierCategory from "./form/AddSupplierCategory";

const SupplierCategoryList = () => {
  const { data: supplierCategory } = useGetAllSupplierCategoryQuery();
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
            Add Category
          </RectangularButton>
        </Box>
      </Box>
      <SupplierCategoryListTable supplierCategoryList={supplierCategory} />
      <Dialog open={open} onClose={handleClickClose}>
        <AddSupplierCategory handleCloseDialog={handleClickClose} />
      </Dialog>
    </div>
  );
};

export default SupplierCategoryList;
