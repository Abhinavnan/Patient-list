import { useEffect, useState } from "react";  
import { getPatient, deletePatient } from "../services/ApiService";
import AddPatient from "./AddPatient";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [showAddPatient, setShowAddPatient] = useState(false);
    useEffect(() => {
        let mount = true    //mounting the component else useStates will be lost
        getPatient().then(data => {
            setPatients(data)
            return () => mount = false //unmounting
        }) //imported getPatient from ApiService.tsx
            
    }, [])
    const handleDeleteBtn = (id) => {
        deletePatient(id)
            .then(() => setPatients(patients.filter(patient => patient.patient_id !== id)))
    }  
    const handleCancelBtn = () => {
        setShowAddPatient(false);
        getPatient().then(data => {
            console.log("handleCancelBtn: ",data)
            setPatients(data)
        })
    }
    console.log(patients)
    return (
        <div className="container">
        <h1>Patient List</h1>
        <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((patient) => (
                    <tr key={patient.patient_id}>
                        <td>{patient.patient_id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.blood_group}</td>
                        <td>
                            <button className="btn btn-primary m-2">Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteBtn(patient.patient_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <br/>
        <button className="btn btn-success" onClick={() => setShowAddPatient(true)}>Add Patient</button>
        <br />
        <br />
        {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn} />}
        </div>
    )
}

export default PatientList