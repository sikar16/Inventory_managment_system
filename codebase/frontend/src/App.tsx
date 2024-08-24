import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <>
      <div className="dark:bg-[#002A47] text-[#002A47] bg-white dark:text-white w-full h-screen  items-center justify-center">
        {" "}
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
