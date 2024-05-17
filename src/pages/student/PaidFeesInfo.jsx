import React, { useEffect, useState } from "react";
import jsPDF from 'jspdf';

function PaidFeesView() {
    const [feesList, setFeesList] = useState([]);

    useEffect(() => {
        async function fetchFeesList() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/fees/paid-fees`, {
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

    function handleDownload(studentInfo, feesInfo) {
        // const doc = new jsPDF();
        // doc.text(`Student Name: ${studentInfo.name}`, 10, 10);
        // doc.text(`Email: ${studentInfo.email}`, 10, 20);
        // doc.text(`Fees Paid for: ${feesInfo.semester}`, 10, 30);
        // doc.text(`Payment Date: ${feesInfo.paymentDate}`, 10, 40);

        // feesInfo.fees.forEach((fee, index) => {
        //     const y = 50 + index * 10;
        //     doc.text(`${index + 1}. ${fee.name}: ${fee.amount}`, 10, y);
        // });

        // doc.save(`fees_receipt_${feesInfo.semester}.pdf`);

        const doc = new jsPDF();

        // Campus Sphere Header
        doc.setFontSize(18);
        doc.text('Campus Sphere', 105, 20, { align: 'center' });

        // Student Information
        doc.setFontSize(12);
        doc.text(`Student Name: ${studentInfo.name}`, 10, 40);
        doc.text(`Email: ${studentInfo.email}`, 10, 50);
        doc.text(`Fees Paid for semester ${feesInfo.semester}`, 10, 60);
        doc.text(`Payment Date: ${feesInfo.paymentDate}`, 10, 70);

        // Receipt Heading
        doc.setFontSize(16);
        doc.text('RECEIPT', 105, 90, { align: 'center' });

        // Fees Table
        let startY = 100;
        let totalAmount = 0;
        feesInfo.fees.forEach((fee, index) => {
            doc.setFontSize(12);
            doc.text(`${index + 1}`, 10, startY);
            doc.text(`${fee.name}`, 30, startY);
            doc.text(`${fee.amount}`, 150, startY);
            totalAmount += +fee.amount;
            startY += 10;
        });

        // Total Amount
        doc.setFontSize(12);
        doc.text('Total', 30, startY);
        doc.text(`${totalAmount}`, 150, startY);

        // Save the PDF
        doc.save(`Fee receipt Sem-${feesInfo.semester}.pdf`);

    };

    const renderFeesDetails = () => {
        return Object.keys(feesList.fees || {}).map((key) => {
            if (key.startsWith("semester")) {
                const semester = key.replace("semester", "");
                const semesterNo = semester.replace("Fees", "");

                const studentInfo = {
                    name: feesList.name.firstName + ' ' + feesList.name.lastName,
                    email: feesList.email
                };

                const feesInfo = {
                    semester: semesterNo,
                    paymentDate: new Date(feesList.fees[`semester${semesterNo}Fees`].paidOn).toLocaleDateString(),
                    fees: [
                        {
                            name: 'Tuition Fees',
                            amount: feesList.fees[`semester${semesterNo}Fees`].amount
                        },
                        {
                            name: 'Penalty',
                            amount: feesList.fees[`semester${semesterNo}Fees`].penalty
                        }
                    ]
                };

                return (
                    <li key={key}>
                        <div className="list-item">
                            <div>Fees of Semester {semesterNo}</div>
                            <div>{feesList.fees[`semester${semesterNo}Fees`].amount}</div>
                            <div>{feesList.fees[`semester${semesterNo}Fees`].penalty}</div>
                            <div> {new Date(feesList.fees[`semester${semesterNo}Fees`].paidOn).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            })}
                            </div>
                            <div onClick={() => handleDownload(studentInfo, feesInfo)}><i class="fa-solid fa-receipt"></i></div>
                        </div>
                    </li>
                );
            }
            return null; // Return null for non-semester keys
        });
    };

    return (
        <main>
            <h2>Paid Fees List</h2>
            <ul>
                <li className="list-item list-title">
                    <div> Semester NO. </div>
                    <div> Amount paid </div>
                    <div> Penalty charged </div>
                    <div> Payment date </div>
                    <div> Receipt </div>
                </li>
                {renderFeesDetails()}
            </ul>
        </main>
    );
}

export default PaidFeesView;
