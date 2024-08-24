import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

const categories = ["Electronics", "Stationary", "Food", "Drink"];

export default function AddTemplate() {
  const [selectedtemplate, setSelectedtemplate] = useState("");
  const [customtemplate, setCustomtemplate] = useState("");
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: "", value: "" }]);
  };
  const handleSelectChange = (event) => {
    setSelectedtemplate(event.target.value);
  };

  const handleCustomtemplateChange = (event) => {
    setCustomtemplate(event.target.value);
  };

  const handleAddtemplate = () => {
    const templateToAdd =
      selectedtemplate === "Other" && customtemplate
        ? customtemplate
        : selectedtemplate;
    console.log("template Added:", templateToAdd);
  };

  return (
    <div className="mx-10 mb-10">
      <form className="space-y-2">
        <InputLabel id="template-label">Template</InputLabel>
        <Select
          labelId="template-label"
          variant="outlined"
          size="small"
          className="w-full mt-2 dark:bg-[#002A47] dark:text-[#edf0fc] text-[#002A47] bg-[#edf0fc]"
          value={selectedtemplate}
          onChange={handleSelectChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
          <MenuItem value="Other">Other</MenuItem>
        </Select>

        {selectedtemplate === "Other" && (
          <TextField
            label="New template"
            variant="outlined"
            size="small"
            className="w-full mt-2 dark:bg-[#002A47] dark:text-[#edf0fc] text-[#002A47] bg-[#edf0fc]"
            value={customtemplate}
            onChange={handleCustomtemplateChange}
          />
        )}

        <div className="w-full">
          <p className="mt-4 mb-2">Attributes</p>
          {attributes.map((attr, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                value={attr.key}
                className="w-full dark:bg-[#002A47] dark:text-[#edf0fc] text-[#002A47] bg-[#edf0fc]"
              />
              <TextField
                label="Value"
                variant="outlined"
                size="small"
                value={attr.value}
                className="w-full"
              />
            </div>
          ))}
          <Button onClick={handleAddAttribute} variant="outlined">
            Add
          </Button>
        </div>

        <div className="pt-10 ">
          <div className="flex justify-between gap-5">
            <Button variant="outlined" color="error">
              Discard
            </Button>
            <button
              type="button"
              className="bg-[#002a47] py-1 px-3 text-[#edf0fc] rounded-md"
              onClick={handleAddtemplate}
            >
              Add template
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
