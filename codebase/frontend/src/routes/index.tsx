import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AdminLayout } from '../layout/AdminLayout'
import EmployeeLayout from '../layout/EmployeeLayout'
import Analysis from '../features/admin/dashbord/Analysis'
import UserList from '../features/admin/user/UserList'
import ProductList from '../features/admin/product/ProductList'
import CategoryList from '../features/admin/category/CategoryList'
import SupplierCategoryList from '../features/admin/supplierCategory/SupplierCategoryList'
import TemplateList from '../features/admin/template/TemplateList'
import SupplierList from '../features/admin/suppllier/SuppliersList'
import WareHouseList from '../features/admin/wareHouse/WareHouseList'
import IncomingRequest from '../features/departmentHead/IncomingRequest'
import MaterialRequestForm from '../component/MaterialRequistForm'
import RequiestDetail from '../features/employee/employee/RequiestDetail'
import Login from '../features/Login'
import ConfirmPassword from '../features/ConfirmPassword'
import ForgetPassword from '../features/ForgetPassword'
import Profile from '../features/Profile'
import SubCategoryList from '../features/admin/subCategory/SubCategoryList'
import AddUser from '../features/admin/user/AddUser'
export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* root section */}
            <Route path='/' element={<><h1>root</h1></>} />
            <Route path='/login' element={<Login />} />
            <Route path='/confirm-password' element={<ConfirmPassword />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/profile' element={<Profile />} />

            {/* admin section */}
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='/admin/dashbord' element={<><h1>dashbord</h1></>} />
                <Route path='/admin/user' element={<UserList />} />
                <Route path='/admin/add-user' element={<AddUser />} />
                <Route path='/admin/product' element={<ProductList />} />
                <Route path='/admin/category' element={<CategoryList />} />
                <Route path='/admin/sub-category' element={<SubCategoryList />} />
                <Route path='/admin/template' element={<TemplateList />} />
                <Route path='/admin/suppliers' element={<SupplierList />} />
                <Route path='/admin/suppliers-category' element={<SupplierCategoryList />} />
                <Route path='/admin/warehouse' element={<WareHouseList />} />
                <Route path='/admin/report' element={<><h1>report</h1></>} />
                <Route path='/admin/*' element={<><h1>Not found</h1></>} />

            </Route>

            {/* employees section */}
            {/* <Route path='/employee' element={<EmployeeLayout />}>
            <Route path='/employee/employeeRequester' element={<><h1>home</h1></>}>
                <Route path='/employee/employeeRequester/incoming-requests' element={<IncomingRequest />} >
                    <Route path='/employee/employeeRequester/incoming-requests/material-request' element={<MaterialRequestForm />} />s
                </Route>
            </Route>

            <Route path='/employee/departmentHead'>
                <Route path='/employee/departmentHead/incoming-requests' element={<><h1>incomming request</h1></>} />
            </Route> */}

            <Route path='/employee' element={<EmployeeLayout />}>
                <Route path='/employee/dashbord' element={<Analysis />} />
                <Route path='/employee/incoming-requests' element={<IncomingRequest />} />
                <Route path='/employee/material-request' element={<MaterialRequestForm />} />
                <Route path='/employee/requiest-detaile' element={<RequiestDetail />} />
                <Route path='/employee/purchase-requests' element={<><h1>purchase request</h1></>} />
                <Route path='/employee/purchase-order' element={<><h1>purchase order</h1></>} />
                <Route path='/employee/supplier-response' element={<><h1>supplier response</h1></>} />
                <Route path='/employee/stock' element={<><h1>stock</h1></>} />
                <Route path='/employee/report' element={<><h1>report</h1></>} />
            </Route>


            <Route path='*' element={<><h1>Not found</h1></>} />


        </>
    )
)

