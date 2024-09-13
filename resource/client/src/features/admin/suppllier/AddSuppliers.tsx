import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select"; // Import SelectChangeEvent
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useGetAllsupplierCategoryQuery } from "../../../services/supplierCategoryService";
import { SupplierCategoryType } from "../../../_types/supplierCategory_type";
import { useAddNewsupplierMutation } from "../../../services/supplier_service";

interface AddSuppliersProps {
  handleCloseDialog: () => void;
}

const AddSuppliers: React.FC<AddSuppliersProps> = ({ handleCloseDialog }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    categoryId: "",
    country: "",
    city: "",
    subCity: "",
    wereda: "",
  });

  const { isSuccess, data } = useGetAllsupplierCategoryQuery();
  const [addSupplier] = useAddNewsupplierMutation();

  const categories: SupplierCategoryType[] = isSuccess ? data : [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    // Change to SelectChangeEvent
    setFormData((prevState) => ({
      ...prevState,
      categoryId: event.target.value,
    }));
  };

  const handleAddSupplier = async () => {
    try {
      console.log(formData);
      await addSupplier(formData);
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to add supplier:", error);
    }
  };

  const handleDiscard = () => {
    handleCloseDialog();
  };

  return (
    <div className="mx-10 mb-10 w-[450px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <TextField
            label="Full Name"
            name="fullName"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.categoryId}
            onChange={handleCategoryChange} // Updated here
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div>
          <TextField
            label="Country"
            name="country"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            label="City"
            name="city"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            label="Sub-city"
            name="subCity"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.subCity}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            label="Wereda"
            name="wereda"
            variant="outlined"
            size="small"
            className="w-full mt-2"
            value={formData.wereda}
            onChange={handleInputChange}
          />
        </div>

        <div className="pt-10">
          <div className="flex justify-between gap-5">
            <Button variant="outlined" color="error" onClick={handleDiscard}>
              Discard
            </Button>
            <button
              type="button" // Prevents form submission
              className="bg-[#002a47] py-1 px-3 text-white rounded-md"
              onClick={handleAddSupplier}
            >
              Add Supplier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSuppliers;
