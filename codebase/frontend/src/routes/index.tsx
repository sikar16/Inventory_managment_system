import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AdminLayout } from "../layout/Admin/AdminLayout";
import EmployeeLayout from "../layout/Employee/EmployeeLayout";
import UserList from "../features/admin/user/UserList";
import ProductList from "../features/admin/product/ProductList";
import CategoryList from "../features/admin/category/CategoryList";
import SupplierCategoryList from "../features/admin/supplierCategory/SupplierCategoryList";
import TemplateList from "../features/admin/template/TemplateList";
import SupplierList from "../features/admin/suppllier/SuppliersList";
import WareHouseList from "../features/admin/wareHouse/WareHouseList";
import IncomingRequest from "../features/departmentHead/IncomingRequest";
import MaterialRequestForm from "../features/MaterialRequistForm";
import RequiestDetail from "../features/employee/employee/RequiestDetail";
import Login from "../features/Login";
import ConfirmPassword from "../features/ConfirmPassword";
import ForgetPassword from "../features/ForgetPassword";
import Profile from "../features/Profile";
import SubCategoryList from "../features/admin/subCategory/SubCategoryList";
import AddUser from "../features/admin/user/AddUser";
import NotFound from "../features/NotFound";
import RequiestesList from "../features/employee/employee/RequiestesList";
import DepartmentHeadLayout from "../layout/DepartmentHead/DepartmentHeadLayout";
import Approvals from "../features/departmentHead/Approvals";
import { LogesticsLayout } from "../layout/Logestics/LogesticsLayout";
import { FinanceLayout } from "../layout/Finance/FinanceLayout";
import { GeneralManagerLayout } from "../layout/generalManager/GeneralManagerLayout";
import { WarehouseLayout } from "../layout/Warehouse/WarehouseLayout";
import RequiestApproval from "../features/departmentHead/RequiestApproval";
import PurchasedReqest from "../features/logesticsSuperviser/PurchasedReqest";
import MaterialRequiest from "../features/logesticsSuperviser/MaterialRequiest";
import PurchasedRequiestDetail from "../features/logesticsSuperviser/PurchasedRequiestDetail";
import PurchasedOrder from "../features/logesticsSuperviser/PurchasedOrder";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* root section */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/profile" element={<Profile />} />

      {/* admin section */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="/admin/dashbord"
          element={
            <>
              <h1>dashbord</h1>
            </>
          }
        />
        <Route path="/admin/user" element={<UserList departments={[]} />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/product" element={<ProductList />} />
        <Route path="/admin/category" element={<CategoryList />} />
        <Route path="/admin/sub-category" element={<SubCategoryList />} />
        <Route path="/admin/template" element={<TemplateList />} />
        <Route path="/admin/suppliers" element={<SupplierList />} />
        <Route
          path="/admin/suppliers-category"
          element={<SupplierCategoryList />}
        />
        <Route path="/admin/warehouse" element={<WareHouseList />} />
        <Route
          path="/admin/report"
          element={
            <>
              <h1>report</h1>
            </>
          }
        />
        <Route path="/admin/*" element={<NotFound />} />
      </Route>

      {/* employees section */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route path="/employee/requests-list" element={<RequiestesList />} />
        <Route
          path="/employee/create-requests"
          element={<MaterialRequestForm />}
        />
        <Route path="/employee/requests-Detaile" element={<RequiestDetail />} />
      </Route>
      {/* employees section */}

      {/* {department section} */}
      <Route path="/department-head" element={<DepartmentHeadLayout />}>
        <Route
          path="/department-head/incoming-requests"
          element={<IncomingRequest />}
        />
        <Route
          path="/department-head/material-request"
          element={<MaterialRequestForm />}
        />
        <Route
          path="/department-head/requiestApproval"
          element={<RequiestApproval />}
        />
        <Route path="/department-head/approvals" element={<Approvals />} />
        <Route path="/department-head/*" element={<NotFound />} />
      </Route>

      {/* {logeistic section} */}
      <Route path="/logestics" element={<LogesticsLayout />}>
        <Route path="/logestics/dashbord" element={<p>logestics dashbord</p>} />
        <Route
          path="/logestics/incoming-requests"
          element={<MaterialRequiest />}
        />
        <Route
          path="/logestics/material-request"
          element={<MaterialRequestForm />}
        />
        <Route
          path="/logestics/materialRequiest-detaile"
          element={<RequiestDetail />}
        />
        <Route
          path="/logestics/purchase-requests"
          element={
            <>
              <h1>
                <PurchasedReqest />
              </h1>
            </>
          }
        />
        <Route
          path="/logestics/purchasedRequiest-detaile"
          element={
            <>
              <h1>
                <PurchasedRequiestDetail />
              </h1>
            </>
          }
        />
        <Route
          path="/logestics/purchase-order"
          element={
            <>
              <PurchasedOrder />
            </>
          }
        />
        <Route
          path="/logestics/supplier-response"
          element={
            <>
              <h1>supplier response</h1>
            </>
          }
        />
        <Route
          path="/logestics/stock"
          element={
            <>
              <h1>stock</h1>
            </>
          }
        />
        <Route
          path="/logestics/report"
          element={
            <>
              <h1>report</h1>
            </>
          }
        />
        <Route path="/logestics/*" element={<NotFound />} />
      </Route>

      {/* {finance section} */}

      <Route path="/finance" element={<FinanceLayout />}>
        <Route path="/finance/dashbord" element={<p>finance dashbord</p>} />
        <Route
          path="/finance/material-request"
          element={<MaterialRequestForm />}
        />
        <Route path="/finance/requiest-detaile" element={<RequiestDetail />} />
        <Route
          path="/finance/purchase-requests"
          element={
            <>
              <h1>purchase request</h1>
            </>
          }
        />
        <Route
          path="/finance/purchase-order"
          element={
            <>
              <h1>purchase order</h1>
            </>
          }
        />
        <Route path="/finance/*" element={<NotFound />} />
      </Route>

      {/* {general manager section} */}

      <Route path="/manager" element={<GeneralManagerLayout />}>
        <Route path="/manager/dashbord" element={<p>manager dashbord</p>} />
        <Route
          path="/manager/material-request"
          element={<MaterialRequestForm />}
        />
        <Route path="/manager/requiest-detaile" element={<RequiestDetail />} />
        <Route
          path="/manager/purchase-requests"
          element={
            <>
              <h1>purchase request</h1>
            </>
          }
        />
        <Route
          path="/manager/purchase-order"
          element={
            <>
              <h1>purchase order</h1>
            </>
          }
        />
        <Route path="/manager/*" element={<NotFound />} />
      </Route>

      {/* {general manager section} */}

      <Route path="/warehouse" element={<WarehouseLayout />}>
        <Route path="/warehouse/dashbord" element={<p>warehouse dashbord</p>} />
        <Route path="/warehouse/inventory" element={<p>Inventory</p>} />
        <Route
          path="/warehouse/incoming-shipment"
          element={<p>Incomming shipemnt</p>}
        />
        <Route path="/warehouse/*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

{
  /* <Route path='/employee' element={<EmployeeLayout />}>
                <Route path='/employee/requests-list' element={<RequiestesList />} />
                <Route path='/employee/create-requests' element={<MaterialRequestForm />} />
                <Route path='/employee/department-head' element={<DepartmentHeadLayout />}>
                </Route>
                <Route path='/employee/dashbord' element={<Analysis />} />
                <Route path='/employee/incoming-requests' element={<IncomingRequest />} />
                <Route path='/employee/material-request' element={<MaterialRequestForm />} />
                <Route path='/employee/requiest-detaile' element={<RequiestDetail />} />
                <Route path='/employee/purchase-requests' element={<><h1>purchase request</h1></>} />
                <Route path='/employee/purchase-order' element={<><h1>purchase order</h1></>} />
                <Route path='/employee/supplier-response' element={<><h1>supplier response</h1></>} />
                <Route path='/employee/stock' element={<><h1>stock</h1></>} />
                <Route path='/employee/report' element={<><h1>report</h1></>} />
                <Route path='/employee/*' element={<NotFound />} />
            </Route> */
}
