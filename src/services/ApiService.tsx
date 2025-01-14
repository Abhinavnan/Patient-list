import axios from "axios";

export function getPatient() {
  return axios.get("http://127.0.0.1:8000/patients/")  // make a GET request to the server
    .then(response => response.data)  // get data from response
}

export function deletePatient(id) {
  return axios.delete('http://127.0.0.1:8000/patients/' + id + '/')  // make a DELETE request to the server
    .then(response => response.data)  // get data from response
}

export function editPatient(id, data) { // make a PUT request to the server
  return axios.put('http://127.0.0.1:8000/patients/' + id + '/', data)  // make a PUT request to the server
    }