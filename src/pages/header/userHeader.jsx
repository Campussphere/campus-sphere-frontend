import { useNavigate } from "react-router-dom";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

export default function Header() {

    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    function logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAdmin');
        navigate('/login')
        return;
    }

    return (
        <>
            {<header className="main-header">
                <div id="logo">
                    <a href="/dashboard">Dashboard</a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <button onClick={logout} className="btn">Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>
            }
        </>
    )
}