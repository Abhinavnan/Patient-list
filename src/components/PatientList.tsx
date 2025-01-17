// @ts-nocheck
import { useEffect, useState } from "react";  
import { getPatient, deletePatient, editPatient } from "../services/ApiService";
import AddPatient from "./AddPatient";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [showAddPatient, setShowAddPatient] = useState(false);
    const [editingPatientId, setEditingPatientId] = useState(null);
    const [updatedPatient, setUpdatedPatient] = useState({});

    // Fetch patients on component mount
    useEffect(() => {
        let isMounted = true; // Track whether the component is mounted
        getPatient().then((data) => {
            if (isMounted) setPatients(data);
        });
        return () => {
            isMounted = false; // Cleanup on component unmount
        };
    }, []);

    // Handle input change for edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPatient((prev) => ({ ...prev, [name]: value }));
    };

    // Handle save button click for editing
    const handleSaveBtn = async (patientId) => {
        try {
            await editPatient(patientId, updatedPatient);
            setPatients((prevPatients) =>
                prevPatients.map((patient) =>
                    patient.patient_id === patientId ? updatedPatient : patient
                )
            );
            setEditingPatientId(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating patient:", error);
        }
    };

    // Handle cancel button in edit mode
    const handleCancelEditBtn = () => {
        setEditingPatientId(null);
        setUpdatedPatient({});
    };

    // Handle delete button
    const handleDeleteBtn = (id) => {
        deletePatient(id)
            .then(() =>
                setPatients((prevPatients) =>
                    prevPatients.filter((patient) => patient.patient_id !== id)
                )
            )
            .catch((error) => console.error("Error deleting patient:", error));
    };

    // Handle adding a patient
    const handleCancelBtn = () => {
        setShowAddPatient(false);
        getPatient().then((data) => setPatients(data));
    };
    addEventListener("submit", () => {getPatient().then(data => {setPatients(data); setShowAddPatient(false)}) });
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
                            <td>
                                {editingPatientId === patient.patient_id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedPatient.name || ""}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    patient.name
                                )}
                            </td>
                            <td>
                                {editingPatientId === patient.patient_id ? (
                                    <input
                                        type="number"
                                        name="age"
                                        value={updatedPatient.age || ""}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    patient.age
                                )}
                            </td>
                            <td>
                                {editingPatientId === patient.patient_id ? (
                                    <input
                                        type="text"
                                        name="blood_group"
                                        value={updatedPatient.blood_group || ""}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    patient.blood_group
                                )}
                            </td>
                            <td>
                                {editingPatientId === patient.patient_id ? (
                                    <>
                                        <button
                                            className="btn btn-primary m-2"
                                            onClick={() => handleSaveBtn(patient.patient_id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handleCancelEditBtn}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary m-2"
                                            onClick={() => {
                                                setEditingPatientId(patient.patient_id);
                                                setUpdatedPatient(patient);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteBtn(patient.patient_id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="btn btn-success" onClick={() => setShowAddPatient(true)}> Add Patient </button>
            <br />
            <br />
            {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn} />}
        </div>
    );
};

export default PatientList;
