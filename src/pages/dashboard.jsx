import { useEffect } from "react";
import AdminDashboard from "./admin/admin-dashboard"
import Student from "./student/StudentDashboard"
import Library from "./librarian/BooksView";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let desg = localStorage.getItem('desg');
    const navigate = useNavigate();

    function authCheck() {
        if (localStorage.getItem('isAuth') !== 'true') {
            navigate('/login');
            return;
        }
    }

    useEffect(() => {
        authCheck();
    }, []);

    if (desg === 'Student') {
        return (
            <Student />
        )
    } else if (desg === 'Librarian') {
        return (
            <Library />
        )
    }
    return (
        <AdminDashboard />
    )
}