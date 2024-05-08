import { useEffect, useState } from "react";
import "../../assets/styles/base.css";
import { useNavigate } from "react-router-dom";
import Header from "../header/userHeader";

function Notice({ notice }) {
    const [issuerDetails, setDetails] = useState([]);

    useEffect(() => {
        async function getIssuerDetails() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${notice.issuedBy}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('jwtToken')
                    }
                });

                if (res.ok) {
                    const result = await res.json();
                    setDetails(result.name.firstName + ' ' + result.name.lastName);
                }
            } catch (error) {
                alert('Something went wrong!');
            }
        }

        getIssuerDetails();
    }, []);

    return (

        <li>
            {
                <div className="list-item">
                    <div> {notice.noticeTitle} </div>
                    <div> {issuerDetails} </div>
                    <div> {new Date(notice.issuedOn).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })} </div>
                    <div><i class="fa-solid fa-eye"></i></div>
                </div>
            }
        </li>
    )
}

export default function StudentNotice() {

    const [noticeDetails, setNoticeDetails] = useState([]);

    useEffect(() => {
        async function getNotices() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/notice/student-notices`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setNoticeDetails(result);
            }
        }

        getNotices();
    }, []);

    return (
        <main>
            <Header />
            <h2>Notice details</h2>

            <li className="list-item list-title">
                <div> Notice Title </div>
                <div> Issued by </div>
                <div> Issued on </div>
                <div> View </div>
            </li>
            <ul>
                {
                    noticeDetails.length ?
                        noticeDetails.map((notice) => (
                            <Notice notice={notice} />
                        ))
                        : <span>No notice issued</span>
                }
            </ul>
        </main>
    )
}