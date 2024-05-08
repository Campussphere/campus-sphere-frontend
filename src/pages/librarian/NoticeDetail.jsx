import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";
import Header from "../header/userHeader";

export default function NoticeDetail() {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState([]);
    const [issuerDetails, setDetails] = useState([]);

    useEffect(() => {
        async function getNotice() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/notice/view/${noticeId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();
                setNotice(result);
            }
        }

        getNotice();
    }, []);



    return (
        <main>
            <Header />
            <div>
                <h1> {notice.noticeTitle} </h1>
                <div>
                    <span> Issued on:
                        {new Date(notice.issuedOn).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <div></div>
                <div>
                    <b>Notice message: </b>{notice.noticeMessage}
                </div>
            </div>
        </main>
    )
}