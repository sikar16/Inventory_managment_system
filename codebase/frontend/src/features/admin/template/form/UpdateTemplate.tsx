import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  useUpdateTemplateMutation,
  useGetAllTemplatesQuery,
} from "../../../../services/template_service";
import { useToast } from "../../../../context/ToastContext"; // Import toast context
import { TemplateAttributeType } from "../../../../_types/template_type";

interface UpdateTemplateProps {
  handleCloseDialog: () => void;
  template: {
    id: number;
    name: string;
    attributes: TemplateAttributeType[];
  } | null; // Template to be updated
}

const dataTypeOptions = ["STRING", "DOUBLE", "INT", "DATE_TIME"];

const UpdateTemplate: React.FC<UpdateTemplateProps> = ({
  handleCloseDialog,
  template, // Template to be updated
}) => {
  const { setToastData } = useToast(); // Using toast for success/error messages
  const [customTemplate, setCustomTemplate] = useState("");
  const [attributes, setAttributes] = useState<
    { name: string; dataType: string }[]
  >([]);
  const [updateTemplate, { isLoading, isError, error }] =
    useUpdateTemplateMutation();

  const { isError: isTemplateError, isLoading: isTemplateLoading } =
    useGetAllTemplatesQuery();

  // Prepopulate form with existing template data
  useEffect(() => {
    if (template) {
      setCustomTemplate(template.name);
      setAttributes(
        template.attributes.map((attr) => ({
          name: attr.name,
          dataType: attr.dataType,
        }))
      );
    }
  }, [template]);

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

  const handleUpdateTemplate = async () => {
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
      id: template?.id, // Pass the template ID for update
      name: customTemplate,
      attributes: attributes,
    };

    if (template) {
      try {
        await updateTemplate({ data: formData, id: template?.id }).unwrap(); // Unwrap to handle promise correctly
        setToastData({
          message: "Template updated successfully",
          success: true,
        });
        handleCloseDialog();
      } catch (err: any) {
        setToastData({
          message: `${error?.toString()}`,
          success: false,
        });
      }
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
              onClick={handleUpdateTemplate}
            >
              {isLoading ? "Updating..." : "Update Template"}
            </button>
          </div>
          {isError && <p className="text-red-500">{error.toString()}</p>}{" "}
          {/* Error message */}
        </div>
      </form>
    </div>
  );
};

export default UpdateTemplate;
