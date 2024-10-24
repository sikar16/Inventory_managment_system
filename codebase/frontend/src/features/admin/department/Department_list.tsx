import { Box, Dialog } from "@mui/material";
import RectangularButton from "../../../component/ui/RectangularButton";
import { useGetAllDepartmentQuery } from "../../../services/department_service";
import DepartmentListTable from "./Department_table";
import { useState } from "react";
import AddDepartment from "./from/AddDepartment";

const Department_list = () => {
  const { data: departments } = useGetAllDepartmentQuery("departments");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
            margin: 0,
          }}
        >
          <RectangularButton type="primary" onClick={handleClickOpen}>
            Add Department
          </RectangularButton>
        </Box>
      </Box>
      <DepartmentListTable departmentList={departments} />
      <Dialog open={open} onClose={handleClickClose}>
        <AddDepartment handleClickClose={handleClickClose} />
      </Dialog>
    </div>
  );
};

export default Department_list;
