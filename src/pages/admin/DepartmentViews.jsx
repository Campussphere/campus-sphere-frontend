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
        setEditMode(true);
    }

    function stopEdit() {
        setEditMode(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/dept/update-dept/' + dept._id, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const result = await res.json();

            if (result.modifiedCount) {
                alert('Updated successfully');

                navigate('/departments');
            }
        }
    }

    useEffect(() => {
        async function fetchOptions() {
            const res = await fetch('http://localhost:5000/available-hod/' + dept._id, {
                headers: {
                    'Content-Type': 'application/json'
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
                        {options.length ?
                            options.map((option) => (
                                <option value={option._id}>{option.name.firstName + ' ' + option.name.lastName}</option>
                            ))
                            : <option disabled>No hod</option>}
                    </select>
                    <div className="btn" onClick={stopEdit}> <i class="fa-solid fa-xmark form-actions-alt"></i> </div>
                    <button onClick={handleEdit} className="btn"> <i class="fa-solid fa-check form-actions-alt"></i> </button>
                </form> :
                <div className="list-item">
                    <div> {dept.deptName} </div>
                    <div> {dept.hodInfo ? "hod" : "No hod"} </div>
                    <div onClick={handleEdit}> <i class="fa-solid fa-pen"></i> </div>
                    <div> <i class="fa-solid fa-trash"></i> </div>
                </div>
            }
        </li>
    )
}

export default function DepartmentView() {

    const [deptList, setList] = useState([]);

    useEffect(() => {
        async function getDeptList() {
            const res = await fetch('http://localhost:5000/dept/', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const result = await res.json();
                setList(result);
            }
        }

        getDeptList();
    }, []);

    return (
        <main>
            <h2>Departments</h2>

            <a href="" className="btn">Add new dept</a>
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