import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Admin_layout from "../layouts/Admin_layout";
import Employee_layout from "../layouts/Employee_layout";
import Login from "../features/login/Login";
import ForgetPassword from "../features/forget_pawword/ForgetPassword";
import ConfirmPassword from "../features/confirm_password/ConfirmPassword";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <h1>Root</h1>
          </>
        }
      ></Route>
      {/* login */}
      <Route
        path="/login"
        element={
          <>
            <Login />
          </>
        }
      />
      {/* forget-password */}
      <Route
        path="/forget-password"
        element={
          <>
            <ForgetPassword />
          </>
        }
      />
      {/* confirm-password */}
      <Route
        path="/confirm-password"
        element={
          <>
            <ConfirmPassword />
          </>
        }
      />
      {/* Admin */}
      <Route
        path="/admin"
        element={
          <>
            <Admin_layout />
          </>
        }
      >
        <Route
          path="/admin/dashbord"
          element={
            <>
              <h1>admin home</h1>
            </>
          }
        />
        <Route
          path="/admin/product-category"
          element={
            <>
              <h1>Product category</h1>
            </>
          }
        />
        <Route
          path="/admin/product-sub-category"
          element={
            <>
              <h1>Product sub category</h1>
            </>
          }
        />
      </Route>
      {/* employee */}
      <Route
        path="employee"
        element={
          <>
            <Employee_layout />
          </>
        }
      ></Route>
      {/* store */}
      <Route path="store" element={<></>}>
        {" "}
      </Route>

      <Route path="gm" element={<></>}>
        {" "}
      </Route>
    </>
  )
);
