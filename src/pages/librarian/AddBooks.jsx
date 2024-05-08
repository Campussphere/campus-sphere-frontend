import LibraryImage from "../../assets/images/Library_image.jpeg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";
import Header from "../header/userHeader";


export default function AddBooks() {
    const [bookData, setBookData] = useState({});
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
        console.log(bookData);
    }

    async function insertBook(e) {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/library/add-books`, {
            method: 'POST',
            body: JSON.stringify(bookData),
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
                navigate('/library');
            }
        } else {
            alert("Something went wrong");
        }
    }
    return (
        <main>
            <Header />
            <div className="form-card">
                <div className="form-container">
                    <h1>Add new book</h1>
                    <form onSubmit={insertBook}>
                        <div className="form-control">
                            <label htmlFor="bookName">Book name</label>
                            <input type="text" name="bookName" id="bookName" onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="author">Author</label>
                            <input type="text" name="author" id="author" onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="totalBooks">No of Books</label>
                            <input type="number" name="totalBooks" id="totalBooks" onChange={handleChange} />
                        </div>
                        <button className="btn" type="submit">Add books</button>
                    </form>

                </div>
                <div id="image-container">
                    <img src={LibraryImage} alt="" />
                </div>
            </div>
        </main>
    )
}