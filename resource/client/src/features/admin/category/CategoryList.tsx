import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddCategory from "./AddCategory";
import { useState } from "react";
import CategoryTable from "./CategoryTable";
import Title from "../../../component/TablesTitle";
import { useGetAllproductCategoryQuery } from "../../../services/productCategorySerivce";
import Loading from "../../../component/Loading";
import { ProductCategoryType } from "../../../_types/productCategory_type";

export default function CategoryList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const { isError, isLoading, isSuccess, data } =
    useGetAllproductCategoryQuery("productCategory");
  const {
    data: categories,
  } = useGetAllproductCategoryQuery("get all product");
  // console.log(data)
  if (isError) {
    return (
      <div>
        <h1>Error: {"An error occurred"}</h1>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <div className="mt-10">
        <Title
          tableName="Category"
          onClick={handleOpenDialog}
          action="Add Category"
        />

        <div className="flex flex-wrap gap-2 mt-10 mx-10 mb-5">
          <div className="bg-white px-3 py-3 rounded-md mb-2 flex items-center">
            <p className="me-3 text-gray-500">Category :</p>
            <select className="bg-[#F5F5F5] text-gray-700">
              {categories &&
                categories.map((category: ProductCategoryType) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <hr className="w-full text-black bg-black" />

        <div className="my-4">
          <input
            type="text"
            placeholder="Search"
            className="w-[50%] bg-white rounded-2xl py-[5px] px-3"
          />
        </div>
        <CategoryTable
          productCategorylist={data}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add new category</DialogTitle>
          <DialogContent>
            <AddCategory handleCloseDialog={handleCloseDialog} />
          </DialogContent>
          <DialogActions>
            <button onClick={handleCloseDialog} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                ></path>
              </svg>
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return null;
}
