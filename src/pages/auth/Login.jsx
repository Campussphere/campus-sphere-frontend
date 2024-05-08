import { useState } from "react";
import loginImage from "../../assets/images/login_img.jpg";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";
import { useNavigate } from "react-router-dom";

const initialState = {
    email: '',
    password: ''
};

export default function Login() {
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function login(e) {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const result = await res.json();

                console.log(result);
                if (result.hasError) {
                    return alert(result.message);
                }

                if (result.token) {
                    localStorage.setItem('jwtToken', result.token);
                    localStorage.setItem('isAuth', true);
                    localStorage.setItem('desg', result.desg);

                    navigate('/dashboard');
                }
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    }

    var [formData, setFormData] = useState(initialState);

    return (
        <main>
            <div className="form-card">
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={login}>
                        <div className="form-control">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" id="email" onChange={handleChange} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" minLength={6} maxLength={16} required onChange={handleChange} />
                        </div>

                        <div className="form-control">
                            <a href="/reset-password" className="btn-alt">Forgot password</a>
                        </div>

                        <button className="btn" type="submit">Login</button>
                    </form>

                </div>
                <div id="image-container">
                    <img src={loginImage} alt="" />
                </div>
            </div>
        </main>
    )
}