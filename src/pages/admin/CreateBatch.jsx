import { useState } from "react";
import batchImg from "../../assets/images/batch_img.jpg";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

function Section1({ formData, handleChange }) {
    return (
        <div>
            <div className="section-title">
                Personal Info
            </div>

            <div className="form-control multi-input">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="middleName">Middle Name</label>
                    <input type="text" name="middleName" id="middleName" value={formData.middleName} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
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
                    <input type="tel" name="primaryNo" id="primaryNo" value={formData.primaryNo} onChange={handleChange} />
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
                    <input type="number" name="pincode" id="pincode" placeholder="Ex 390019" value={formData.pincode} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}

function Section3({ formData, handleChange }) {
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
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
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
            const res = await fetch('http://localhost:5000/dept/', {
                headers: {
                    'Content-Type': 'application/json'
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
            const res = await fetch('http://localhost:5000/batch/', {
                headers: {
                    'Content-Type': 'application/json'
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
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
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
        const res = await fetch('http://localhost:5000/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
            <h1 className="">Register Account</h1>
            <div className="form-card">

                <div id="image-container">
                    <img src={batchImg} alt="" />
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