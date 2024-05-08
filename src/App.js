import { BrowserRouter, Routes, Route } from "react-router-dom";
// const Login = React.lazy(() => import("./pages/auth/Login"));
import Login from "./pages/auth/Login"
import CreateUser from "./pages/user-registration/CreateUser"
import RequesReset from "./pages/auth/RequestReset";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard";
import DepartmentView from "./pages/admin/DepartmentViews";
import CreateDepartment from "./pages/admin/CreateDepartment";
import CreateBatch from "./pages/admin/CreateBatch";
import UserView from "./pages/admin/UserManagment";
import Library from "./pages/librarian/BooksView";
import StudentLibrary from "./pages/student/BooksView";
import IssueDetails from "./pages/student/IssuedBooksDetails";
import AddBooks from "./pages/librarian/AddBooks";
import IssueBook from "./pages/librarian/BookIssue";
import IssuersDetails from "./pages/librarian/IssuersDetails";
import IssueNotice from "./pages/admin/IssueNotice";
import StudentNotice from "./pages/student/StudentNotices";
import NoticeDetails from "./pages/admin/noticeViews";
import NoticeDetail from "./pages/librarian/NoticeDetail";

import './App.css';
import React, { Suspense } from "react";

function App() {

  return (
    <BrowserRouter>
      {/* <Suspense fallback={<div>...Loading</div>} > */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/reset-password" element={<RequesReset />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<DepartmentView />} />
        <Route path="/create-dept" element={<CreateDepartment />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/users" element={<UserView />} />
        <Route path="/my-library" element={<StudentLibrary />} />
        <Route path="/my-issues" element={<IssueDetails />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/add-books" element={<AddBooks />} />
        <Route path="/library/issue-book/:bookId" element={<IssueBook />} />
        <Route path="/library/issued-books" element={<IssuersDetails />} />
        <Route path="/notice" element={<NoticeDetails />} />
        <Route path="/student-notice" element={<StudentNotice />} />
        <Route path="/notice/issue-notice" element={<IssueNotice />} />
        <Route path="/notice-detail/:noticeId" element={<NoticeDetail />} />
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default App;