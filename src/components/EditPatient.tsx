import axios from "axios";
import { useState } from "react";
import PatientList from "./PatientList";
import {editPatient} from "../services/ApiService";

const EditPatient = ({ editingPatient, handleCancelEditBtn }) => {
    const [name, setName] = useState(editingPatient.name || "");
    const [age, setAge] = useState(editingPatient.age || "");
    const [blood_group, setBloodGroup] = useState(editingPatient.blood_group || "");
    const handleEditSubmit = async e => {
        e.preventDefault(); // prevent the default form submission
        const updatedFields = {name, age, blood_group};    
        editPatient(editingPatient.patient_id, updatedFields);
        console.log("handleSubmit: ", updatedFields );
        window.location.reload();   //reload the page
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
                    <input type="text" className="form-control" id="name" defaultValue={editingPatient.name} 
                    onChange={(e) => setName(e.target.value)}  />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" className="form-control" id="age" defaultValue={editingPatient.age} 
                    onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Blood Group</label>
                    <input type="text" className="form-control" id="blood_group" defaultValue={editingPatient.blood_group} 
                    onChange={(e) => setBloodGroup(e.target.value)} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleCancelEditBtn}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    )
}

export default EditPatient