import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateUser from "./pages/user-registration/CreateUser"
import RequesReset from "./pages/auth/RequestReset";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard";
import DepartmentView from "./pages/admin/DepartmentViews";
import CreateDepartment from "./pages/admin/CreateDepartment";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/reset-password" element={<RequesReset />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<DepartmentView />} />
        <Route path="/create-dept" element={<CreateDepartment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;