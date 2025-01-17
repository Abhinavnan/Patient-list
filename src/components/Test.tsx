// ts-nockeck
import React, { useState } from 'react';
import { editPatient } from '../services/ApiService';

const PatientList = ({ patients }) => {
    const [editingPatientId, setEditingPatientId] = useState(null);
    const [updatedPatient, setUpdatedPatient] = useState({});
    const [patientList, setPatientList] = useState(patients);

    const handleEditBtn = (patient) => {
        setEditingPatientId(patient.patient_id);
        setUpdatedPatient(patient);
    };

    const handleCancelEditBtn = () => {
        setEditingPatientId(null);
        setUpdatedPatient({});
    };

    const handleSaveBtn = async (patientId) => {
        // Call the API to update the patient
        await editPatient(patientId, updatedPatient);
        // Update the patient list state
        setPatientList(patientList.map(patient => 
            patient.patient_id === patientId ? updatedPatient : patient
        ));
        setEditingPatientId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPatient({ ...updatedPatient, [name]: value });
    };

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
                    {patientList.map((patient) => (
                        <tr key={patient.patient_id}>
                            <td>{patient.patient_id}</td>
                            <td>
                                {editingPatientId === patient.patient_id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedPatient.name}
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
                                        value={updatedPatient.age}
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
                                        value={updatedPatient.blood_group}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    patient.blood_group
                                )}
                            </td>
                            <td>
                                {editingPatientId === patient.patient_id ? (
                                    <>
                                        <button className="btn btn-primary m-2" onClick={() => handleSaveBtn(patient.patient_id)}>Save</button>
                                        <button className="btn btn-secondary" onClick={handleCancelEditBtn}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary m-2" onClick={() => handleEditBtn(patient)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteBtn(patient.patient_id)}>Delete</button>
                                    </>
                                )}
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
    );
};

export default PatientList;