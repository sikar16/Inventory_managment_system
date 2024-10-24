import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useAddNewProductMutation } from "../../../../services/product_service";
import { useGetAllTemplatesQuery } from "../../../../services/template_service";
import { useGetAllProductCategoryQuery } from "../../../../services/productCategorySerivce";
import { useGetAllProductSubCategoryQuery } from "../../../../services/productSubcategory_service";
import { useToast } from "../../../../context/ToastContext";
import { ProductSubCategoryType } from "../../../../_types/productSubcategory_type";
import { ErrorResponseType } from "../../../../_types/request_reponse_type";

interface AddProductProps {
  handleCloseDialog: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ handleCloseDialog }) => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "">(""); // Handle category as a number
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | "">(
    ""
  );
  const [selectedTemplate, setSelectedTemplate] = useState<
    string | { id: number; name: string }
  >("");
  const [attributes, setAttributes] = useState<
    { key: string; value: string; templateAttributeId: number }[]
  >([]);

  const { data: categories = [] } = useGetAllProductCategoryQuery();
  const { data: allSubCategories = [] } = useGetAllProductSubCategoryQuery();
  const { data: allTemplates = [] } = useGetAllTemplatesQuery();
  const [addProduct, { isLoading }] = useAddNewProductMutation();

  const { setToastData } = useToast(); // Using toast to display success/error messages

  const filteredSubCategories = allSubCategories.filter(
    (subCategory: ProductSubCategoryType) =>
      subCategory.categoryId === selectedCategory
  );

  useEffect(() => {
    if (typeof selectedTemplate === "object" && selectedTemplate.id) {
      const selectedTemplateData = allTemplates.find(
        (t) => t.id === selectedTemplate.id
      );
      if (selectedTemplateData && selectedTemplateData.attributes) {
        setAttributes(
          selectedTemplateData.attributes.map((attr) => ({
            key: attr.name,
            value: "",
            templateAttributeId: attr.id,
          }))
        );
      }
    } else {
      setAttributes([]);
    }
  }, [selectedTemplate, allTemplates]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = Number(event.target.value); // Convert to number
    setSelectedCategory(category);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedSubCategory(Number(event.target.value)); // Convert to number
  };

  const handleTemplateChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === "Other") {
      setSelectedTemplate("Other");
    } else {
      const template = allTemplates.find((temp) => temp.name === value);
      if (template) {
        setSelectedTemplate(template);
      }
    }
  };

  const handleAddProduct = async () => {
    const subCategoryId = Number(selectedSubCategory);

    if (isNaN(subCategoryId)) {
      console.error("Invalid subCategoryId");
      return;
    }

    const items = attributes.map((attr) => ({
      templateAttributeId: attr.templateAttributeId,
      value: attr.value,
    }));

    const formData = {
      name: productName,
      category: selectedCategory,
      subcategoryId: subCategoryId,
      template: selectedTemplate,
      items,
    };

    try {
      // Unwrap to correctly handle success/failure
      await addProduct({ data: formData }).unwrap();
      setToastData({
        message: "Product added successfully",
        success: true,
      });
      handleCloseDialog(); // Close the dialog after success
    } catch (err: any) {
      const res: ErrorResponseType = err;
      setToastData({
        message: res?.data?.message || "Failed to add product",
        success: false,
      });
    }
  };

  const handleAttributeChange = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attr, i) =>
        i === index ? { ...attr, [field]: newValue } : attr
      )
    );
  };

  console.log(attributes);
  return (
    <div className="mx-10 mb-10 w-[400px]">
      <InputLabel id="category-label">
        <p className="my-3 text-xl font-bold">Add product</p>
      </InputLabel>
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

        <InputLabel id="template-label">Template</InputLabel>
        <Select
          labelId="template-label"
          variant="outlined"
          size="small"
          className="w-full"
          value={
            typeof selectedTemplate === "object"
              ? selectedTemplate.name
              : selectedTemplate
          }
          onChange={handleTemplateChange}
        >
          {allTemplates.map((template) => (
            <MenuItem key={template.id} value={template.name}>
              {template.name}
            </MenuItem>
          ))}
        </Select>

        {attributes.length > 0 && (
          <div className="w-full">
            <p className="mt-4 mb-2">Attributes</p>
            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  disabled
                  value={attr.key}
                  className="w-full"
                />
                <TextField
                  label="Value"
                  variant="outlined"
                  size="small"
                  placeholder={attr.key}
                  value={attr.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}

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
              onClick={handleAddProduct}
            >
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
