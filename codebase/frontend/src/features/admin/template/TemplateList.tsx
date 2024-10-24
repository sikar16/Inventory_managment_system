import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddTemplate from "./AddTemplate";
import TemplateTable from "./TemplateTable";
import Title from "../../../component/TablesTitle";
import Loader from "../../../component/Loading";
import { useGetAlltemplateQuery } from "../../../services/template_service";
import { useGetAllProductCategoryQuery } from "../../../services/productCategorySerivce";
import { useGetAllproductSubCategoryQuery } from "../../../services/productSubcategory_service";

export default function TemplateList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    number | null
  >(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    isError: isCategoryError,
    isLoading: isCategoryLoading,
    data: categories = [], // Default to an empty array
    error: categoryError,
  } = useGetAllProductCategoryQuery();

  const {
    isError: isSubCategoryError,
    isLoading: isSubCategoryLoading,
    data: productSubCategories = [], // Default to an empty array
    error: subCategoryError,
  } = useGetAllproductSubCategoryQuery("subcategory");

  const { isError, isLoading, data, error } =
    useGetAlltemplateQuery("template");

  if (isCategoryError || isSubCategoryError || isError) {
    return (
      <h1>
        Error:{" "}
        {isCategoryError
          ? categoryError?.toString() || "Unknown category error"
          : isSubCategoryError
          ? subCategoryError?.toString() || "Unknown subcategory error"
          : error?.toString() || "Unknown error"}
      </h1>
    );
  }

  if (isCategoryLoading || isSubCategoryLoading || isLoading) return <Loader />;

  const filteredTemplates =
    data?.filter((template) => {
      const matchesSearchTerm = template.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory != null
          ? template.categoryId.id === selectedCategory
          : true;

      const matchesSubCategory =
        selectedSubCategory != null
          ? template.subCategoryId.id === selectedSubCategory
          : true;

      return matchesSearchTerm && matchesCategory && matchesSubCategory;
    }) ?? [];

  return (
    <div className="mt-10">
      <Title
        tableName={"Template"}
        action={"Add template"}
        onClick={handleOpenDialog}
      />
      <div className="flex flex-wrap mt-10 mx-10 mb-5">
        <div className="bg-white px-3 py-3 rounded-md mb-2 flex items-center">
          <p className="me-3 text-gray-500">Category :</p>
          <select
            className="bg-[#F5F5F5] text-gray-700"
            value={selectedCategory || ""}
            onChange={(e) => {
              const categoryId = Number(e.target.value);
              setSelectedCategory(isNaN(categoryId) ? null : categoryId);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white px-3 py-3 rounded-md mb-2 flex items-center">
          <p className="me-3 text-gray-500">Sub Category :</p>
          <select
            className="bg-[#faf9f9] text-gray-700"
            value={selectedSubCategory || ""}
            onChange={(e) => {
              const subCategoryId = Number(e.target.value);
              setSelectedSubCategory(
                isNaN(subCategoryId) ? null : subCategoryId
              );
            }}
          >
            <option value="">All Subcategories</option>
            {productSubCategories.map((productSubCategory) => (
              <option key={productSubCategory.id} value={productSubCategory.id}>
                {productSubCategory.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="w-full text-black bg-black" />
      <div className="my-4 justify-center flex">
        <input
          type="text"
          placeholder="Search"
          className="w-[90%] bg-white dark:bg-[#313131] rounded-md py-[5px] px-3 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TemplateTable templateList={filteredTemplates} />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="flex justify-between me-5">
          <DialogTitle>Add new template</DialogTitle>
          <DialogActions>
            <svg
              onClick={handleCloseDialog}
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
          </DialogActions>
        </div>
        <DialogContent>
          <AddTemplate handleCloseDialog={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
