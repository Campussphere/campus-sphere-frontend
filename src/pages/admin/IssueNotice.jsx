import LibraryImage from "../../assets/images/Library_image.jpeg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";


export default function IssueNotice() {
    console.log(process.env.REACT_APP_API_URL);

    const [noticeData, setNoticeData] = useState({});
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setNoticeData({ ...noticeData, [name]: value });
    }

    async function issueNotice(e) {
        e.preventDefault();
        
        const confirmation = window.confirm('Are you sure! This action cannot be undone!');

        if (!confirmation) {
            return;
        }

        const res = await fetch(`${process.env.REACT_APP_API_URL}/notice/issue-notice`, {
            method: 'POST',
            body: JSON.stringify(noticeData),
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
                navigate('/notice');
            }
        } else {
            alert("Something went wrong");
        }
    }
    return (
        <main>
            <div className="form-card">
                <div className="form-container">
                    <h1>Issue notice</h1>
                    <form onSubmit={issueNotice}>
                        <div className="form-control">
                            <label htmlFor="noticeTitle">Notice Title</label>
                            <input type="text" name="noticeTitle" id="noticeTitle" onChange={handleChange} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="noticeLevel">Send Notice to</label>
                            <select name="noticeLevel" id="noticeLevel" onChange={handleChange}>
                                <option hidden>Select</option>
                                <option value="1">All Student and Faculties</option>
                                <option value="2">All Students</option>
                                <option value="3">All Faculties</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label htmlFor="noticeMessage">Notice message</label>
                            <textarea name="noticeMessage" id="noticeMessage" onChange={handleChange}></textarea>
                        </div>
                        <button className="btn" type="submit">Issue Notice</button>
                    </form>

                </div>
                <div id="image-container">
                    <img src={LibraryImage} alt="" />
                </div>
            </div>
        </main>
    )
}