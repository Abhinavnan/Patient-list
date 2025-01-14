import axios from "axios";
import { useState } from "react";
import PatientList from "./PatientList";
import {editPatient} from "../services/ApiService";

const EditPatient = ({ editingPatient, handleCancelEditBtn }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [blood_group, setBloodGroup] = useState("");
    const handleEditSubmit = async e => {
        e.preventDefault(); // prevent the default form submission
        editPatient(editingPatient.patient_id, {name, age, blood_group});
        console.log("handleSubmit: ", {name, age, blood_group} );
        setAge("");
        setName("");
        setBloodGroup("");
    }
    return (
        <>
            <h3>Edit Patient</h3>
            <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} 
                    defaultValue={editingPatient.name} />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} 
                    defaultValue={editingPatient.age} />
                </div>
                <div className="form-group">
                    <label>Blood Group</label>
                    <input type="text" className="form-control" id="blood_group" value={blood_group} onChange={(e) => setBloodGroup(e.target.value)}
                     defaultValue={editingPatient.blood_group} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleCancelEditBtn}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    )
}

export default EditPatient