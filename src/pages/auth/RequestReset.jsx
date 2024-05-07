import { useState } from "react";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";
import resetImg from "../../assets/images/forgotpassword_img.jpg"

export default function RequesReset() {
    let [email, setEmail] = useState('');

    function handleChange(e) {
        setEmail(e.target.value);
    }

    async function requestReset(e) {
        e.preventDefault();

        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}/request-reset`, {
                method: 'POST',
                body: JSON.stringify({ email: email }),
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

                <div id="image-containter">
                    <img src={resetImg} alt="" />
                </div>
                <div className="form-container">
                    <h1>Find your account</h1>
                    <form onSubmit={requestReset}>
                        <div className="form-control">
                            <label htmlFor="email">Email address</label>
                            <input type="email" name="email" id="email" onChange={handleChange} />
                        </div>
                        <button className="btn" type="submit">Next</button>
                    </form>
                </div>

            </div>
        </main>
    )
}