import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/base.css";
import "../../assets/styles/forms.css";

function BookList({ book }) {
    const navigate = useNavigate();

    const initialState = {
        bookName: book.bookName,
        totalBooks: book.totalBooks
    };

    const [formData, setFormData] = useState(initialState);
    const [editMode, setEditMode] = useState(false);

    function handleEdit() {
        setEditMode(true);
    }

    function stopEdit() {
        setEditMode(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleDelete() {
        const confirmation = window.confirm(`Are you sure you want to remove book?`);

        if (!confirmation) {
            return;
        }

        const res = await fetch(`${process.env.REACT_APP_API_URL}/library/delete-books/${book._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "applcation/json"
            }
        });

        if (res.ok) {
            const result = await res.json();

            if (result.deletedCount) {
                alert("Department deleted");
                window.location.reload();
            }
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/library/update-record/${book._id}`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
            }
        });

        if (res.ok) {
            const result = await res.json();

            if (result.modifiedCount) {
                alert('Updated successfully');
                window.location.reload();
            }

            setEditMode(false);
        }
    }

    return (
        <li>
            {editMode ?
                <form className="list-item" onSubmit={handleUpdate}>
                    <input type="text" onChange={handleChange} name="bookName" className="form-control-alt" id="bookName" value={formData.bookName} autoFocus />
                    <input type="number" onChange={handleChange} name="totalBooks" className="form-control-alt" id="totalBooks" value={formData.totalBooks} />
                    <div className="btn" onClick={stopEdit}> <i class="fa-solid fa-xmark form-actions-alt"></i> </div>
                    <button onClick={handleEdit} className="btn"> <i class="fa-solid fa-check form-actions-alt"></i> </button>
                </form> :
                <div className="list-item">
                    <div> {book.bookName} </div>
                    <div> {book.author} </div>
                    <div> {book.totalBooks - book.issuedBooks}</div>
                    <div> {book.totalBooks} </div>
                    <a href={`/library/issue-book/${book._id}`} > <i class="fa-solid fa-book-medical"></i> </a>
                    <div onClick={handleEdit}> <i class="fa-solid fa-pen"></i> </div>
                    <div onClick={handleDelete}> <i class="fa-solid fa-trash"></i> </div>
                </div>
            }
        </li>
    )
}

export default function Library() {

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
            <h2>Library</h2>

            <a href="/library/add-books" className="btn">Add books</a>
            <a href="/library/issued-books" className="btn">View Issued books</a>

            <li className="list-item list-title">
                <div> Title of Book </div>
                <div> Author of Book </div>
                <div> Available books </div>
                <div> Total books </div>
                <div> Issue Book </div>
                <div> Update </div>
                <div> Delete </div>
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