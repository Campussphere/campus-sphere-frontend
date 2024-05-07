import { useEffect, useState } from "react";
import "../../assets/styles/base.css";
import { useNavigate } from "react-router-dom";

function DeptList({ dept }) {
    const navigate = useNavigate();

    const initialState = {
        deptName: dept.deptName,
        hodId: dept.hodInfo ? dept.hodInfo.hodId : ''
    };

    const [formData, setFormData] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const [options, setOptions] = useState([]);

    function handleEdit() {
        console.log(initialState);
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

        const confirmation = window.confirm(`Are you sure you want to remove ${dept.deptName} department`);

        if (!confirmation) {
            return;
        }

        const res = await fetch(`${process.env.API_URL}/dept/delete-dept/${dept._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "applcation/json",
                'x-access-token': localStorage.getItem('jwtToken')
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

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(`${process.env.API_URL}/dept/update-dept/${dept._id}`, {
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

    useEffect(() => {
        async function fetchOptions() {
            const res = await fetch(`${process.env.API_URL}/available-hod/${dept._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                }
            });

            if (res.ok) {
                const result = await res.json();
                setOptions(result);
            }
        }

        fetchOptions();
    }, []);


    return (

        <li>
            {editMode ?
                <form className="list-item" onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} name="deptName" className="form-control-alt" id="deptName" value={formData.deptName} autoFocus />
                    <select name="hodId" onChange={handleChange} className="form-control-alt" id="hodId">
                        <option hidden>{'Select HOD'}</option>
                        {dept.hodInfo !== null && <option value={dept.hodInfo.hodId} selected>{dept.hodInfo.hodName}</option>}
                        {options.length ?
                            options.map((option) => (
                                <option value={option._id}>{option.name.firstName + ' ' + option.name.lastName}</option>
                            ))
                            : <option disabled>No other HOD available</option>}
                    </select>
                    <div className="btn" onClick={stopEdit}> <i class="fa-solid fa-xmark form-actions-alt"></i> </div>
                    <button onClick={handleEdit} className="btn"> <i class="fa-solid fa-check form-actions-alt"></i> </button>
                </form> :
                <div className="list-item">
                    <div> {dept.deptName} </div>
                    <div> {dept.hodInfo ? `${dept.hodInfo.hodName}` : "No HOD assigned"} </div>
                    <div onClick={handleEdit}> <i class="fa-solid fa-pen"></i> </div>
                    <div onClick={handleDelete}> <i class="fa-solid fa-trash"></i> </div>
                </div>
            }
        </li>
    )
}

export default function DepartmentView() {

    const [deptList, setList] = useState([]);

    useEffect(() => {
        async function getDeptList() {
            const res = await fetch(`${process.env.API_URL}/dept/`, {
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

        getDeptList();
    }, []);

    return (
        <main>
            <h2>Departments</h2>

            <a href="/create-dept" className="btn">Add new dept</a>
            <li className="list-item list-title">
                <div> Department </div>
                <div> HOD </div>
                <div> Update </div>
                <div> Remove </div>
            </li>
            <ul>
                {
                    deptList.length ?
                        deptList.map((dept) => (
                            <DeptList dept={dept} />
                        ))
                        : <span>No dept found</span>
                }
            </ul>
        </main>
    )
}