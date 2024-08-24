import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Employee_layout() {
  return (
    <>
      <Header />
      <div>Employee_layout Employee_layout</div>
      <Outlet />
      <Footer />
    </>
  );
}

export default Employee_layout;
