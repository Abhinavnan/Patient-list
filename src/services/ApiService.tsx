// @ts-nocheck
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/patients/";
export function getPatient() {
  return axios.get(BASE_URL)  // make a GET request to the server
    .then(response => response.data)  // get data from response
    .catch(error => {
      console.error("Error fetching patients:", error);
      throw error;  // Re-throw the error for further handling
    });
}

export function deletePatient(id) {
  return axios.delete(BASE_URL + id + '/')  // make a DELETE request to the server
    .then(response => response.data)  // get data from response
    .catch(error => {
      console.error(`Error deleting patient with ID ${id}:`, error);
      throw error;  // Re-throw the error for further handling
    });
}

export function editPatient(id, data) { // make a PUT request to the server
  return axios.put(BASE_URL + id + '/', data)  // make a PUT request to the server
    .then(response => response.data)  // get data from response 
    .catch(error => {
      console.error(`Error updating patient with ID ${id}:`, error);
      throw error;  // Re-throw the error for further handling
    });
    }