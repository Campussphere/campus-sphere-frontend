import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImage from "../../assets/images/signup_img.jpg";
import "../../assets/styles/base.css"
import "../../assets/styles/forms.css"

function Section1({ formData, handleChange }) {
    return (
        <div>
            <div className="section-title">
                Personal Info
            </div>

            <div className="form-control multi-input">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} minLength={2} maxLength={8} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="middleName">Middle Name</label>
                    <input type="text" name="middleName" id="middleName" value={formData.middleName} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} minLength={2} maxLength={8} onChange={handleChange} />
                </div>

            </div>

            <div className="form-control">
                <label htmlFor="gender">Select Gender</label>
                <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
                    <option hidden>Select your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
            </div>

            <div className="form-control multi-input">

                <div>
                    <label htmlFor="primaryNo">Primary number</label>
                    <input type="tel" name="primaryNo" id="primaryNo" length={10} value={formData.primaryNo} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="alternativeNo">Alternative number</label>
                    <input type="tel" name="alternativeNo" id="alternativeNo" value={formData.alternativeNo} onChange={handleChange} />
                </div>
            </div>

            <div className="form-control">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} />
            </div>
        </div>
    )
}

function Section2({ formData, handleChange }) {
    return (
        <div>
            <div className="section-title">
                Residential info
            </div>

            <div className="form-control">
                <label htmlFor="colonyName">Enter Colony name</label>
                <input type="text" name="colonyName" id="colonyName" placeholder="House no, Flat name/Society Name" value={formData.colonyName} onChange={handleChange} />
            </div>

            <div className="form-control">
                <label htmlFor="landmark">Enter landmark</label>
                <input type="text" name="landmark" id="landmark" placeholder="Opp XYZ, Near ABC" value={formData.landmark} onChange={handleChange} />
            </div>

            <div className="form-control">
                <label htmlFor="area">Enter Colony name</label>
                <input type="text" name="area" id="area" placeholder="Ex Wagodia Road" value={formData.area} onChange={handleChange} />
            </div>

            <div className="form-control multi-input">
                <div>
                    <label htmlFor="city">Enter City</label>
                    <input type="text" name="city" id="city" placeholder="Ex Vadodara" value={formData.city} onChange={handleChange} />
                </div>

                <div>

                    <label htmlFor="pincode">Enter Pincode</label>
                    <input type="number" name="pincode" id="pincode" placeholder="Ex 390019" length={6} value={formData.pincode} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}

function Section3({ formData, handleChange }) {

    const [passwordValidity, setPasswordValidity] = useState(false);
    function validatePassword(e) {
        // Regular expressions for validation
        const password = e.target.value;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;

        // Check if password meets all criteria
        const isValid = (
            password.length >= 6 &&
            uppercaseRegex.test(password) &&
            lowercaseRegex.test(password) &&
            numberRegex.test(password)
        );

        setPasswordValidity(isValid);

        handleChange(e);
    }

    return (
        <div>
            <div className="section-title">
                Login Info
            </div>

            <div className="form-control">
                <label htmlFor="email">Enter email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-control">
                <label htmlFor="password">Enter password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={validatePassword} />
            </div>

            <div className="form-cont">
                {passwordValidity ? <span><i class="fa-solid fa-check"></i> Password is secure</span> : 
                <span><i class="fa-solid fa-xmark"></i> Password is too weak</span> }
            </div>
            {/* <span>The provided info will be used for Login your ERP</span> */}
        </div>
    )
}

function Section4({ formData, handleChange }) {
    const [deptInfo, setDeptInfo] = useState([]);
    const [batch, setBatch] = useState([]);

    useEffect(() => {
        async function fetchInfo() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/dept/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const data = await res.json();
                setDeptInfo(data);
            }
        }

        fetchInfo();
    }, []);

    useEffect(() => {
        async function fetchBatch() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/batch/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const data = await res.json();
                setBatch(data);
            }
        }

        fetchBatch();
    }, []);

    console.log(deptInfo);
    return (
        <div>
            <div className="section-title">
                Academic Info
            </div>

            <div className="form-control multi-input">

                <div>
                    <label htmlFor="dept">Select department</label>
                    <select name="dept" id="dept" value={formData.dept} onChange={handleChange} >
                        <option hidden>Select your department</option>
                        {
                            deptInfo.length ? deptInfo.map((dept) => (
                                <option value={dept._id}>{dept.deptName}</option>
                            ))
                                : <option disabled>No department created</option>
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="batch">Select batch</label>
                    <select name="batch" id="batch" value={formData.batch} onChange={handleChange} >
                        {/* It should be rendered dynamically */}
                        <option hidden>Select batch</option>
                        {
                            batch.length ? batch.map((singleBatch) => (
                                <option value={singleBatch._id}>{singleBatch.year}</option>
                            ))
                                : <option disabled>No batch created</option>
                        }
                    </select>
                </div>
            </div>

            <div className="form-control">
                <label htmlFor="desg">Select Designation</label>
                <select name="desg" id="desg" value={formData.desg} onChange={handleChange} >
                    <option hidden>Select Designation</option>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Librarian">Librarian</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
        </div>
    )
}

export default function CreateUser() {

    const navigate = useNavigate();
    const initialState = {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        primaryNo: '',
        alternativeNo: '',
        dob: '',
        colonyName: '',
        landmark: '',
        area: '',
        city: '',
        pincode: '',
        email: '',
        password: '',
        dept: '',
        batch: '',
        desg: '',
    }

    var [formData, setFormData] = useState(initialState);
    const [currentSection, setCurrentSection] = useState(1);


    function handlePrevious() {
        setCurrentSection(currentSection - 1);
    }

    function handleNext(e) {
        setCurrentSection(currentSection + 1);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function submitData(e) {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_API_URL}/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            const result = await res.json();

            if (result.userExist) {
                return alert(result.message);
            }

            navigate('/');
        }
    }

    return (
        <main>
            <h1 className="">Register User</h1>
            <div className="form-card">

                <div id="image-container">
                    <img src={signupImage} alt="" />
                </div>

                <div className="form-container">
                    <form id="create-user-form" onSubmit={submitData}>
                        {currentSection === 1 && <Section1 formData={formData} handleChange={handleChange} />}
                        {currentSection === 2 && <Section2 formData={formData} handleChange={handleChange} />}
                        {currentSection === 3 && <Section3 formData={formData} handleChange={handleChange} />}
                        {currentSection === 4 && <Section4 formData={formData} handleChange={handleChange} />}

                        {/* Navigation buttons */}
                    </form>
                    <div className="form-actions">
                        {currentSection > 1 && <button className="btn" onClick={handlePrevious}>Previous</button>}
                        {currentSection < 4 && <button className="btn" onClick={handleNext}>Next</button>}
                        {currentSection === 4 && <button type="submit" form="create-user-form" className="btn">Submit</button>}
                    </div>
                </div>
            </div>
        </main>
    );
}