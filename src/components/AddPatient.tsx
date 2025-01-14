import axios from "axios";
import { useState } from "react";

const AddPatient = ({ handleCancelBtn }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [blood_group, setBloodGroup] = useState("");
    const handleAddSubmit = async e => {
        e.preventDefault(); // prevent the default form submission
        const response = await axios.post("http://127.0.0.1:8000/patients/", {name, age, blood_group});
        console.log("handleSubmit: ", response.data);
        setAge("");
        setName("");
        setBloodGroup("");
    }
    return (
        <>
            <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="blood_group" className="form-label">Blood Group</label>
                    <input type="text" className="form-control" id="blood_group" value={blood_group} onChange={(e) => setBloodGroup(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary m-2">Add</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelBtn}>Cancel</button>
            </form>
        </>
    )
}

export default AddPatient