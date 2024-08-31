import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddSuppliers from "./AddSuppliers";
import SupplierTable from "./SupplierTable";
import Title from "../../../component/TablesTitle";
import { useGetAllsupplierQuery } from "../../../services/supplier_service";
import Loading from "../../../component/Loading";
export default function SupplierList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { isError, isLoading, isSuccess, error, data } =
    useGetAllsupplierQuery("supplier");
  // console.log(data)
  if (isError) return <h1>Error :{error.toString()}</h1>;
  if (isLoading) return <Loading />;
  if (isSuccess)
    return (
      <div className="mt-10">
        <div>
          <Title
            tableName={"Supplier"}
            action={"Add supplier"}
            onClick={handleOpenDialog}
          />
        </div>
        <hr className="w-full text-black bg-black" />
        <div className="my-4">
          <input
            type="text"
            placeholder="Search"
            className="w-[80%] bg-[#f5f5f5] rounded-md py-[5px] px-3"
          />
        </div>
        <SupplierTable
          supplierslist={data}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <div className="flex justify-between me-5">
            <DialogTitle>Add new supplier</DialogTitle>
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
            <AddSuppliers handleCloseDialog={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    );
}
