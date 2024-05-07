import { useState } from "react";
import loginImage from "../../assets/images/login_img.jpg";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";
import { useNavigate } from "react-router-dom";


export default function CreateDepartment() {
    let [deptName, setDeptName] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setDeptName(e.target.value);
    }

    async function CreateDept(e) {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/dept/create-dept`, {
            method: 'POST',
            body: JSON.stringify({ deptName: deptName }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        if (!res) {
            return alert("Something went wrong!");
        }

        if (res.ok) {
            const result = await res.json();

            if (result.insertedId) {
                navigate('/departments');
            }
        } else {
            alert("Something went wrong");
        }
    }
    return (
        <main>
            <div className="form-card">
                <div className="form-container">
                    <h1>Create Department</h1>
                    <form onSubmit={CreateDept}>
                        <div className="form-control">
                            <label htmlFor="deptName">Department name</label>
                            <input type="text" name="deptName" id="deptName" onChange={handleChange} />
                        </div>
                        <button className="btn" type="submit">Add Department</button>
                    </form>

                </div>
                <div id="image-container">
                    <img src={loginImage} alt="" />
                </div>
            </div>
        </main>
    )
}