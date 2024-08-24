import { useState } from "react";
import "./App.css";
import Login from "./Component/Login";
import ForgetPassword from "./Component/ForgetPassword";
import ConfirmPassword from "./Component/ConfirmPassword";
import Profile from "./Component/Profile";
import AdminDashbord from "./Component/Admin/AdminDashbord.tsx";
import AddUser from "./Component/Admin/AddUser.tsx";
import ProductList from "./Component/Admin/ProductList.tsx";
import UserList from "./Component/Admin/UserList.tsx";
import AddProduct from "./Component/Admin/AddProduct.tsx";
import CategoryList from "./Component/Admin/CategoryList.tsx";
import SubCategoryList from "./Component/Admin/SubCategoryList.tsx";
import TemplateList from "./Component/Admin/TemplateList.tsx";
import SuppliersList from "./Component/Admin/SuppliersList.tsx";
import SupplierCategoryList from "./Component/Admin/SupplierCategoryList.tsx";
import WareHouseList from "./Component/Admin/WareHouseList.tsx";
import RequiestesList from "./Component/Employee/RequiestesList.tsx";
import MaterialRequistForm from "./Component/MaterialRequistForm.tsx";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>
        <Login />
        <ForgetPassword />
        <ConfirmPassword />
        <Profile />
        <AdminDashbord />
        <AddUser />
        <UserList />
        <ProductList />
        <CategoryList />
        <SubCategoryList />
        <TemplateList />
        <SuppliersList />
        <SupplierCategoryList />
        <WareHouseList />
        <RequiestesList />
      </div>
    </>
  );
}

export default App;
