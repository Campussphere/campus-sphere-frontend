import { useEffect, useState } from "react";
import Header from "../header/userHeader";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

function FeesView() {
    const [feesList, setFeesList] = useState([]);

    useEffect(() => {
        async function fetchFeesList() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/fees/pending-fees`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('jwtToken')
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch fees data');
                }
                const data = await response.json();
                setFeesList(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFeesList();
    }, []);

    const renderFeesDetails = () => {
        return Object.keys(feesList.fees || {}).map((key) => {
            if (key.startsWith("semester")) {
                const semester = key.replace("semester", "");
                const semesterNo = semester.replace("Fees", "");
                const dueKey = `fees${semesterNo}Due`;
                return (

                    <li key={key}>
                        <div className="list-item">
                            <div>Fees of Semester {semesterNo}</div>
                            <div>{feesList.fees[key]}</div>
                            <div>{feesList.fees[dueKey]}</div>
                            <form method="post" action={`${process.env.REACT_APP_API_URL}/fees/pay-now/${semesterNo}`}>
                                <input type="hidden" name="token" value={localStorage.getItem('jwtToken')} />
                                <button className="btn">Pay now</button>
                            </form>
                        </div>
                    </li>
                );
            }
            return null; // Return null for non-semester keys
        });
    };

    return (
        <main>
            <Header />
            <h2>Fees List</h2>

            <a href="/fees/paid-fees" className="btn">View Paid Fees</a>

            <ul>
                <li className="list-item list-title">
                    <div> Semester </div>
                    <div> Fees </div>
                    <div> Due Date </div>
                </li>
                {renderFeesDetails()}
            </ul>
        </main>
    );
}

export default FeesView;