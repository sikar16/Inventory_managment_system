import Dialog from "@mui/material/Dialog";

import { Box } from "@mui/material";
import RectangularButton from "../../../component/ui/RectangularButton";

import { useState } from "react";
import { useGetAllTemplatesQuery } from "../../../services/template_service";
import TemplateListTable from "./TemplateTable";
import AddTemplate from "./form/AddTemplate";

const TemplateList = () => {
  const { data: templates, isLoading } = useGetAllTemplatesQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  console.log(templates);

  return (
    <>
      <p className="text-2xl font-semibold mb-3">Template</p>

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
              <p className="px-3">Add Template</p>
            </RectangularButton>
          </Box>
        </Box>
        <TemplateListTable templateList={templates} />
        <Dialog open={open} onClose={handleClickClose}>
          <div className="m-4 p-4">
            <AddTemplate handleCloseDialog={handleClickClose} />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default TemplateList;
