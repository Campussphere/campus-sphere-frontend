import { useState } from "react";
import { useParams } from "react-router-dom";
import resetImg from "../../assets/images/forgotpassword_img.jpg"
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

const initialState = {
    password: '',
    confirmPassword: ''
}

export default function ResetPassword() {
    const { resetToken } = useParams();
    let [passwordData, setPasswordData] = useState(initialState);

    function handleChange(e) {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value })
    }

    async function updatePassword(e) {
        e.preventDefault();

        try {

            if (passwordData.password !== passwordData.confirmPassword) {
                return alert('Password does not match');
            }

            const res = await fetch(`${process.env.REACT_APP_API_URL}/reset-password/${resetToken}`, {
                method: 'POST',
                body: JSON.stringify({ password: passwordData.password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const result = await res.json();
                return alert(result.message);
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            alert('Something went wrong');
        }
    }

    return (
        <main id="reset-form-card">
            <div className="form-card">

                <div id="image-container">
                    <img src={resetImg} alt="" />
                </div>

                <div className="form-container">
                    <h1>Update your Password</h1>
                    <form onSubmit={updatePassword}>
                        <div className="form-control">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" id="password" onChange={handleChange} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} />
                        </div>

                        <button className="btn" type="submit">Change Password!</button>
                    </form>
                </div>

            </div>
        </main>
    )
}