import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useUpdateProductMutation } from "../../../../services/product_service";
import { useGetAllProductCategoryQuery } from "../../../../services/productCategorySerivce";
import { useGetAllProductSubCategoryQuery } from "../../../../services/productSubcategory_service";
import { useToast } from "../../../../context/ToastContext";
import { ProductSubCategoryType } from "../../../../_types/productSubcategory_type";
import { ProductType } from "../../../../_types/product_type";

interface UpdateProductProps {
  handleCloseDialog: () => void;
  product: ProductType | null;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  handleCloseDialog,
  product,
}) => {
  const [productName, setProductName] = useState(product?.name || "");
  const [selectedCategory, setSelectedCategory] = useState<number | "">(
    product?.subcategory.category.id || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | "">(
    product?.subcategoryId || ""
  );

  const { data: categories = [] } = useGetAllProductCategoryQuery();
  const { data: allSubCategories = [] } = useGetAllProductSubCategoryQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const { setToastData } = useToast();

  // Filter subcategories by category
  const filteredSubCategories = allSubCategories.filter(
    (subCategory: ProductSubCategoryType) =>
      subCategory.categoryId === selectedCategory
  );

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = Number(event.target.value);
    setSelectedCategory(category);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedSubCategory(Number(event.target.value));
  };

  const handleUpdateProduct = async () => {
    const subCategoryId = Number(selectedSubCategory);

    if (isNaN(subCategoryId)) {
      console.error("Invalid subCategoryId");
      return;
    }
    if (product) {
      try {
        await updateProduct({
          data: {
            name: productName,
            subcategoryId: subCategoryId,
          },
          id: product.id,
        }).unwrap();
        setToastData({
          message: "Product updated successfully",
          success: true,
        });
        handleCloseDialog();
      } catch (err: any) {
        console.log(err);
        setToastData({
          message: err.toString(),
          success: false,
        });
      }
    }
  };

  return (
    <div className="mx-10 mb-10 w-[400px]">
      <form className="space-y-2">
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          variant="outlined"
          size="small"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full"
        />
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          variant="outlined"
          size="small"
          className="w-full"
          value={selectedCategory.toString()}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="subCategory-label">Sub Category</InputLabel>
        <Select
          labelId="subCategory-label"
          variant="outlined"
          size="small"
          className="w-full"
          value={selectedSubCategory.toString()}
          onChange={handleSubCategoryChange}
        >
          {filteredSubCategories.length > 0 ? (
            filteredSubCategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              No subcategories available
            </MenuItem>
          )}
        </Select>

        <div className="pt-10">
          <div className="flex justify-between gap-5">
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseDialog}
            >
              Discard
            </Button>

            <button
              type="button"
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md"
              onClick={handleUpdateProduct}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
