import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import batchImage from "../../assets/images/batch_img.jpg";
import Header from "../header/userHeader";
import "../../assets/styles/base.css"
import "../../assets/styles/forms.css"

function Section1({ formData, handleChange }) {
    return (
        <div>
            <div className="section-title">
                Batch Info
            </div>

            <div className="form-control">
                <label htmlFor="year">Batch year</label>
                <input type="number" name="year" id="year" onChange={handleChange} />
            </div>

            <div className="form-control">
                <label htmlFor="noOfSemester">No of Semester</label>
                <input type="number" name="noOfSemester" id="noOfSemester" onChange={handleChange} />
            </div>
        </div>
    )
}

function Section2({ formData, handleChange }) {
    console.log(formData.noOfSemester);
    return (
        <div>
            <div className="section-title">
                Fees Info
            </div>

            {Array.from({ length: formData.noOfSemester }, (_, index) => (
                <div className="form-control multi-input">
                    <div>
                        <label htmlFor={`semester${index + 1}Fees`}>Fees of sem {index + 1}</label>
                        <input type="number" name={`semester${index + 1}Fees`} id={`semester${index + 1}Fees`} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor={`fees${index + 1}Due`}>Due Date of sem {index + 1}</label>
                        <input type="date" name={`fees${index + 1}Due`} id={`fees${index + 1}Due`} onChange={handleChange} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function CreateUser() {

    const navigate = useNavigate();
    const initialState = {
        year: '',
        noOfSemester: ''
    }

    var [formData, setFormData] = useState(initialState);
    const [currentSection, setCurrentSection] = useState(1);


    function handlePrevious() {
        setCurrentSection(currentSection - 1);
    }

    function handleNext() {
        setCurrentSection(currentSection + 1);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        console.log(formData);
    }

    async function submitData(e) {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_API_URL}/batch/create-batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            const result = await res.json();

            console.log(result);

            navigate('/');
        }
    }

    return (
        <main>
            <Header />
            <h1 className="">Create Batch</h1>
            <div className="form-card">

                <div id="image-container">
                    <img src={batchImage} alt="" />
                </div>

                <div className="form-container">
                    <form id="create-user-form" onSubmit={submitData}>
                        {currentSection === 1 && <Section1 formData={formData} handleChange={handleChange} />}
                        {currentSection === 2 && <Section2 formData={formData} handleChange={handleChange} />}

                        {/* Navigation buttons */}
                    </form>
                    <div className="form-actions">
                        {currentSection > 1 && <button className="btn" onClick={handlePrevious}>Previous</button>}
                        {currentSection < 2 && <button className="btn" onClick={handleNext}>Next</button>}
                        {currentSection === 2 && <button type="submit" form="create-user-form" className="btn">Submit</button>}
                    </div>
                </div>
            </div>
        </main>
    );
}