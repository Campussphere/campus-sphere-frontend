import { useEffect, useState } from "react";
import "../../assets/styles/base.css";
import { useNavigate } from "react-router-dom";

function IssuerList({ issuer }) {

    async function handleReturn() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/library/return-book/${issuer.bookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (!res.ok) {
                alert('Something went wrong');
            }

            if (res.ok) {
                const result = await res.json();

                if (result.deletedCount) {
                    alert('Book has been returned!');
                }
            }
        } catch (error) {
            alert('Something went wrong!');
        }
    }

    async function requestReminder() {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/library/reminder/${issuer._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (!res.ok) {
                alert('Something went wrong!');
            }

            if (res.ok) {
                const result = await res.json();
                console.log(result);
                alert(result.message);
            }
        } catch (error) {
            alert('Something went wrong!');
        }
    }

    return (

        <li>
            {
                <div className="list-item">
                    <div> {issuer.userName} </div>
                    <div> {issuer.bookName} </div>
                    <div> {new Date(issuer.returnDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })} </div>
                    <div onClick={requestReminder}> <i class="fa-solid fa-envelope"></i> </div>
                    <div onClick={handleReturn}><i class="fa-solid fa-arrow-left-long"></i></div>
                </div>
            }
        </li>
    )
}

export default function IssuersDetails() {

    const [issuersDetails, setIssuersDetails] = useState([]);

    useEffect(() => {
        async function getIssuersList() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/library/issued-books`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setIssuersDetails(result);
            }
        }

        getIssuersList();
    }, []);

    return (
        <main>
            <h2>Issuer details</h2>

            <li className="list-item list-title">
                <div> Name of Issuer </div>
                <div> Issued Book </div>
                <div> Return Date </div>
                <div> Reminder </div>
                <div> Return </div>
            </li>
            <ul>
                {
                    issuersDetails.length ?
                        issuersDetails.map((issuer) => (
                            <IssuerList issuer={issuer} />
                        ))
                        : <span>No books issued</span>
                }
            </ul>
        </main>
    )
}