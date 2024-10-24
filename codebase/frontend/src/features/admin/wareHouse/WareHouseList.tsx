import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddWareHouse from "./AddWareHouse";
import WareHouseTable from "./WareHouseTable";
import Title from "../../../component/TablesTitle";
import { useGetAllStoresQuery } from "../../../services/store_service";
import Loader from "../../../component/Loading";

export default function WareHouseList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { isError, isLoading, data, error } = useGetAllStoresQuery();

  if (isError) return <h1>Error: {error.toString()}</h1>;
  if (isLoading) return <Loader />;

  const filteredData =
    data?.filter((store) => {
      const { name, address } = store;
      // Check if address exists to avoid accessing properties of undefined
      const country = address?.country || "";
      const city = address?.city || "";
      const subCity = address?.subCity || "";

      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subCity.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return (
    <>
      <p className="text-2xl font-semibold mb-3">Warehouse</p>

      <div className="mt-10">
        <Title
          tableName={"Stock"}
          action={"Add Stock"}
          onClick={handleOpenDialog}
        />

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

        <WareHouseTable storeList={filteredData} />

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <div className="flex justify-between me-5">
            <DialogTitle>Add New Warehouse</DialogTitle>
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
            <AddWareHouse handleCloseDialog={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
