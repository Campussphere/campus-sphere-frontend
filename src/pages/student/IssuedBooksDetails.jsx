import { useEffect, useState } from "react";
import Header from "../header/userHeader";
import "../../assets/styles/base.css";
import { useNavigate } from "react-router-dom";

function IssuerList({ issuer }) {

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
                </div>
            }
        </li>
    )
}

export default function IssueDetail() {

    const [issuersDetails, setIssuersDetails] = useState([]);

    useEffect(() => {
        async function getIssuersList() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/library/my-issues`, {
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
            <Header />
            <h2>Issued Books details</h2>

            <li className="list-item list-title">
                <div> Name of Issuer </div>
                <div> Issued Book </div>
                <div> Return Date </div>
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