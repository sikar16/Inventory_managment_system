import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Component/Admin/AdminDashbord";
import AddUser from "./Component/Admin/AddUser";
import ProductList from "./Component/Admin/ProductList";
import UserList from "./Component/Admin/UserList";
import AddProduct from "./Component/Admin/AddProduct";
import CategoryList from "./Component/Admin/CategoryList";
import SubCategoryList from "./Component/Admin/SubCategoryList";
import AddCategory from "./Component/Admin/AddCategory";
import AddSubCategory from "./Component/Admin/AddSubCategory";
import TemplateList from "./Component/Admin/TemplateList";
import AddTemplate from "./Component/Admin/AddTemplate";
import SuppliersList from "./Component/Admin/SuppliersList";
import AddSuppliers from "./Component/Admin/AddSuppliers";
import SupplierCategoryList from "./Component/Admin/SupplierCategoryList";
import AddSupplierCategory from "./Component/Admin/AddSupplierCategory";
import WareHouseList from "./Component/Admin/WareHouseList";
import AddWareHouse from "./Component/Admin/AddWareHouse";
import Analysis from "./Component/Admin/Analaysis";
import Profile from "./Component/Profile";
import RequiestesList from "./Component/Employee/RequiestesList";
import MaterialRequestForm from "./Component/MaterialRequistForm";
import IncomingRequest from "./Component/DepartmentHead/IncomingRequest";
import Appbar from "./Component/DepartmentHead/Appbar";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>

      {/* <RequiestesList /> */}
      {/* <MaterialRequestForm /> */}
      {/* <AddProduct /> */}
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Analysis />} path="analysis" />
          <Route path="user-list" element={<UserList />} >
            <Route path="add-user" element={<AddUser />} />
          </Route>
          <Route path="product-list" element={<ProductList />} >
            <Route path="add-product" element={<AddProduct onAddProduct={AddProduct} />} />
          </Route>
          <Route path="category-list" element={<CategoryList />} >
            <Route path="add-category" element={<AddCategory />} />
          </Route>
          <Route path="subCategory-list" element={<SubCategoryList />} >
            <Route path="add-subCategory" element={<AddSubCategory />} />
          </Route>
          <Route path="template-list" element={<TemplateList />} >
            <Route path="add-template" element={<AddTemplate />} />
          </Route>
          <Route path="suppliers-list" element={<SuppliersList />} >
            <Route path="add-supplier" element={<AddSuppliers />} />
          </Route>
          <Route path="supplierCategory-list" element={<SupplierCategoryList />} >
            <Route path="add-supplierCategory" element={<AddSupplierCategory />} />
          </Route>
          <Route path="wareHouse-list" element={<WareHouseList />} >
            <Route path="add-wareHouse" element={<AddWareHouse />} />
          </Route>
        </Route>
      </Routes>

      {/* <IncomingRequest /> */}
      {/* <Appbar /> */}
    </>
  );
}

export default App;
