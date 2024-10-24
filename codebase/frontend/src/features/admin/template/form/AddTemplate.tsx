import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  useAddNewTemplateMutation,
  useGetAllTemplatesQuery,
} from "../../../../services/template_service";
import { useToast } from "../../../../context/ToastContext"; // Import toast context

interface AddTemplateProps {
  handleCloseDialog: () => void;
}

const dataTypeOptions = ["STRING", "DOUBLE", "INT", "DATE_TIME"];

const AddTemplate: React.FC<AddTemplateProps> = ({ handleCloseDialog }) => {
  const { setToastData } = useToast(); // Using toast for success/error messages
  const [customTemplate, setCustomTemplate] = useState("");
  const [attributes, setAttributes] = useState<
    { name: string; dataType: string }[]
  >([]);
  const [addTemplate, { isLoading, isError, error }] =
    useAddNewTemplateMutation();

  const { isError: isTemplateError, isLoading: isTemplateLoading } =
    useGetAllTemplatesQuery();

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: "", dataType: "STRING" }]); // Default dataType is STRING
  };

  const handleCustomTemplateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTemplate(event.target.value);
  };

  const handleAttributeChange = (
    index: number,
    field: "name" | "dataType",
    value: string
  ) => {
    const updatedAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    );
    setAttributes(updatedAttributes);
  };

  const handleAddTemplate = async () => {
    if (!customTemplate) {
      alert("Please enter a template name.");
      return;
    }

    // Validate that all attributes have required fields
    if (attributes.some((attr) => !attr.name || !attr.dataType)) {
      alert("Please ensure all attributes have both name and data type.");
      return;
    }

    const formData = {
      name: customTemplate,
      attributes: attributes,
    };

    try {
      console.log(formData);

      await addTemplate(formData).unwrap(); // Unwrap to handle promise correctly
      setToastData({
        message: "Template added successfully",
        success: true,
      });
      handleCloseDialog();
    } catch (err: any) {
      setToastData({
        message: `${error?.toString()}`,
        success: false,
      });
    }
  };

  const handleDiscard = () => {
    handleCloseDialog();
  };

  if (isTemplateLoading) return <div>Loading templates...</div>;
  if (isTemplateError) return <div>Error loading templates</div>;

  return (
    <div className="mx-10 mb-10">
      <form className="space-y-2">
        <TextField
          label="Template Name"
          variant="outlined"
          size="small"
          className="w-full mt-2"
          value={customTemplate}
          onChange={handleCustomTemplateChange}
        />

        <div className="w-full">
          <p className="mt-4 mb-2">Attributes</p>
          {attributes.map((attr, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(index, "name", e.target.value)
                }
                className="w-full"
              />
              <Select
                label="Data Type"
                variant="outlined"
                size="small"
                value={attr.dataType}
                onChange={(e) =>
                  handleAttributeChange(
                    index,
                    "dataType",
                    e.target.value as string
                  )
                }
                className="w-full"
              >
                {dataTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ))}
          <Button onClick={handleAddAttribute} variant="outlined">
            Add
          </Button>
        </div>

        <div className="pt-10">
          <div className="flex justify-between gap-5">
            <Button variant="outlined" color="error" onClick={handleDiscard}>
              Discard
            </Button>
            <button
              type="button" // Use button type instead of submit to manually handle submission
              disabled={isLoading}
              className="bg-[#002a47] py-1 px-3 text-white rounded-md"
              onClick={handleAddTemplate}
            >
              {isLoading ? "Adding..." : "Add Template"}
            </button>
          </div>
          {isError && <p className="text-red-500">{error.toString()}</p>}{" "}
          {/* Error message */}
        </div>
      </form>
    </div>
  );
};

export default AddTemplate;
