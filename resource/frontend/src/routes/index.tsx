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
export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* root section */}
            <Route path='/' element={<><h1>root</h1></>} />
            <Route path='/login' element={<><h1>login</h1></>} />
            <Route path='/confirm-password' element={<><h1>confirm passsword</h1></>} />
            <Route path='/forget-password' element={<><h1>forget password</h1></>} />
            <Route path='/profile' element={<><h1>profile</h1></>} />

            {/* admin section */}
            <Route path='/admin' element={<AdminLayout />}>
                <Route path='/admin/dashbord' element={<><h1>dashbord</h1></>} />
                <Route path='/admin/user' element={<UserList />} />
                <Route path='/admin/product' element={<ProductList />} />
                <Route path='/admin/category' element={<CategoryList />} />
                <Route path='/admin/sub-category' element={<SupplierCategoryList />} />
                <Route path='/admin/template' element={<TemplateList />} />
                <Route path='/admin/suppliers' element={<SupplierList />} />
                <Route path='/admin/suppliers-category' element={<SupplierCategoryList />} />
                <Route path='/admin/warehouse' element={<WareHouseList />} />
                <Route path='/admin/report' element={<><h1>report</h1></>} />
                <Route path='/admin/*' element={<><h1>Not found</h1></>} />

            </Route>

            {/* employee section */}
            <Route path='/employee' element={<EmployeeLayout />}>
                <Route path='/employee/dashbord' element={<Analysis />} />
                <Route path='/employee/incoming-requests' element={<><h1>incomming request</h1></>} />
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

