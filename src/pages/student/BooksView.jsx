import { useEffect, useState } from "react";
import Header from "../header/userHeader";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

function BookList({ book }) {

    return (
        <li>
            {
                <div className="list-item">
                    <div> {book.bookName} </div>
                    <div> {book.author} </div>
                    <div> {book.totalBooks - book.issuedBooks}</div>
                    <div> {book.totalBooks} </div>
                </div>
            }
        </li>
    )
}

export default function BooksView() {

    const [bookList, setList] = useState([]);

    useEffect(() => {
        async function getBookList() {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/library/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setList(result);
            }
        }

        getBookList();
    }, []);

    return (
        <main>
            <Header />
            <h2>Library</h2>

            <a href="/my-issues" className="btn">View my Issued books</a>

            <li className="list-item list-title">
                <div> Title of Book </div>
                <div> Author of Book </div>
                <div> Available books </div>
                <div> Total books </div>
            </li>
            <ul>
                {
                    bookList.length ?
                        bookList.map((book) => (
                            <BookList book={book} />
                        ))
                        : <span>No books found</span>
                }
            </ul>
        </main>
    )
}