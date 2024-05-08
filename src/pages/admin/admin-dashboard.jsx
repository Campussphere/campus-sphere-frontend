import Header from "../header/userHeader";
import "../../assets/styles/base.css";

export default function AdminDashboard() {
    return (
        <main className="dashboard">
            <Header />
            <ul>
                <li>
                    <a href="/departments" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-building navigation-icons"></i>
                        <span>Departments</span>
                    </a>
                </li>
                <li>
                    <a href="/users" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-user navigation-icons"></i>
                        <span>Add Faculty/Student</span>
                    </a>
                </li>
                <li>
                    <a href="/notice" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-sticky-note navigation-icons"></i>
                        <span>Notices</span>
                    </a>
                </li>
                <li>
                    <a href="/create-batch" className="btn-alt dashboard-links">
                        <i class="fa-solid fa-landmark navigation-icons"></i>
                        <span>Create Batch</span>
                    </a>
                </li>
            </ul>
        </main>
    )
}