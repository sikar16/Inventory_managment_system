import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function Admin_layout() {
  return (
    <>
      <Header />
      <div>Admin_layout</div>
      <Outlet />
      <Footer />
    </>
  );
}

export default Admin_layout;
