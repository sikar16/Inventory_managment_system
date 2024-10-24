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
    <>
      <p className="text-2xl font-semibold mb-3">Supplier category</p>

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
              <p className="px-2">Add Category</p>
            </RectangularButton>
          </Box>
        </Box>
        <SupplierCategoryListTable supplierCategoryList={supplierCategory} />
        <Dialog open={open} onClose={handleClickClose}>
          <AddSupplierCategory handleCloseDialog={handleClickClose} />
        </Dialog>
      </div>
    </>
  );
};

export default SupplierCategoryList;
