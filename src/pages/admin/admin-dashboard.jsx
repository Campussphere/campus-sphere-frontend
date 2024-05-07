import "../../assets/styles/base.css";

export default function AdminDashboard() {
    return (
        <main className="dashboard">
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
                    <a href="/notices" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-sticky-note navigation-icons"></i>
                        <span>Notices</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-calendar-alt navigation-icons"></i>
                        <span>Leaves</span>
                    </a>
                </li>
            </ul>
        </main>
    )
}