import { Box, Dialog } from "@mui/material";
import RectangularButton from "../../../component/ui/RectangularButton";

import { useState } from "react";
import ProductCategoryListTable from "./CategoryTable";
import { useGetAllProductCategoryQuery } from "../../../services/productCategorySerivce";
import AddProductCategory from "./form/AddCategory";

const CategoryList = () => {
  const { data: productCategory } = useGetAllProductCategoryQuery();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p className="text-2xl font-semibold mb-3">Category</p>

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
              <p className="px-3">Add Category</p>
            </RectangularButton>
          </Box>
        </Box>
        <ProductCategoryListTable productCategoryList={productCategory} />
        <Dialog open={open} onClose={handleClickClose}>
          <AddProductCategory handleCloseDialog={handleClickClose} />
        </Dialog>
      </div>
    </>
  );
};

export default CategoryList;
