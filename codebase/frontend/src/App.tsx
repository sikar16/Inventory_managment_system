import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import axios from "axios";
import { useEffect } from "react";
const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

function App() {
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data = await axios.get(`${serverURL}user`);
    console.log(data.data.data);
  };

  return (
    <>
      <div className="dark:bg-[#002A47] text-[#002A47] bg-[#f1f4ff] dark:text-[#edf0fc] w-full h-screen  items-center justify-center">
        {" "}
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
