import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

export default function IssueBook() {
    const navigate = useNavigate();
    const { bookId } = useParams();
    let [issueData, setIssueData] = useState({});
    let [users, setUsers] = useState([]);

    function handleChange(e) {
        const { name, value } = e.target;
        setIssueData({ ...issueData, [name]: value })
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/students`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('jwtToken')
                    }
                });

                if (!res.ok) {
                    return alert('Something went wrong!');
                }

                if (res.ok) {
                    const result = await res.json();
                    setUsers(result);
                }

            } catch (error) {
                alert('Something went wrong!');
            }
        }

        fetchUsers();
    }, []);

    async function issue(e) {
        e.preventDefault();

        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}/library/issue-book/${bookId}`, {
                method: 'POST',
                body: JSON.stringify(issueData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();

                if (result.insertedId) {
                    alert("Book issued!");
                    navigate('/library');
                    return;
                }
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            alert('Something went wrong');
        }
    }

    return (
        <main id="library-form-card">
            <div className="form-card">

                {/* <div id="image-container">
                    <img src={resetImg} alt="" />
                </div> */}

                <div className="form-container">
                    <h1>Issue Book</h1>
                    <form onSubmit={issue}>
                        <div className="form-control">
                            <label htmlFor="userId">Issuer Name</label>
                            <select name="userId" id="userId" onChange={handleChange}>
                                <option hidden>Select issuers</option>

                                {users.length ?
                                    users.map((user) => (
                                        <option value={user._id}> {user.name.firstName + " " + user.middleName + " " + user.name.lastName} </option>
                                    )) :
                                    <option disabled>No students found!</option>
                                }
                            </select>
                        </div>

                        <div className="form-control">
                            <label htmlFor="returnDate">Return Date</label>
                            <input type="date" name="returnDate" id="returnDate" onChange={handleChange} />
                        </div>

                        <button className="btn" type="submit">Issue Book!</button>
                    </form>
                </div>

            </div>
        </main>
    )
}