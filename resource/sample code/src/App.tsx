import { useState } from 'react';
import './App.css';
import Login from './Component/Login';
import ForgetPassword from './Component/ForgetPassword';
import ConfirmPassword from './Component/ConfirmPassword';
import Profile from './Component/Profile';
import AdminDashbord from './Component/Admin/AdminDashbord.tsx';

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>
        <Login />
        <ForgetPassword />
        <ConfirmPassword />
        <Profile />
        {/* <AdminDashbord /> */}
      </div>
    </>
  );
}

export default App;
