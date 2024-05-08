import "../../assets/styles/base.css";
import Header from "../header/userHeader";

export default function Student() {
    return (
        <main className="dashboard">
            <Header />
            <ul>
                <li>
                    <a href="/my-library" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-book-open navigation-icons"></i>
                        <span>Library</span>
                    </a>
                </li>
            
                <li>
                    <a href="/student-notice" className="btn-alt dashboard-links">
                        <i className="fa-solid fa-sticky-note navigation-icons"></i>
                        <span>View Notices</span>
                    </a>
                </li>
            </ul>
        </main>
    )
}