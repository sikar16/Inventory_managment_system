import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AdminLayout } from '../layout/AdminLayout'
import EmployeeLayout from '../layout/EmployeeLayout'
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
                <Route path='/admin/user' element={<><h1>User</h1></>} />
                <Route path='/admin/product' element={<><h1>Product</h1></>} />
                <Route path='/admin/category' element={<><h1>Category</h1></>} />
                <Route path='/admin/*' element={<><h1>Not found</h1></>} />

            </Route>

            {/* employee section */}
            <Route path='/employee' element={<EmployeeLayout />}>
                <Route path='/employee/dashbord' element={<><h1>dashbord</h1></>} />
                <Route path='/employee/category' element={<><h1>Category</h1></>} />
            </Route>

            <Route path='*' element={<><h1>Not found</h1></>} />


        </>
    )
)

