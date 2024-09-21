import { ThemeProvider } from "@mui/material";
import "./App.css";
import ToastNotification from "./component/ToastNotification";
import { router } from "./routes/index";
import { RouterProvider } from "react-router-dom";
import { useThemeData } from "./context/them_context";

function App() {
  const { muiTheme } = useThemeData();

  return (
    <div className="w-full h-screen">
      <ThemeProvider theme={muiTheme}>
        <ToastNotification />
        <div className="bg-white text-[#002A47] dark:bg-zinc-950 dark:text-white  w-full h-[100%]  items-center justify-center">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
