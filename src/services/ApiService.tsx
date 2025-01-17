// @ts-nocheck
import axios from "axios";

const Local_URL = "http://127.0.0.1:8000/patients/"  
const Prod_URL = "http://3.110.176.180:8000/patients/"
//const BASE_URL = process.env.NODE_ENV === 'development' ? Prod_URL : Local_URL;
let BASE_URL = Local_URL;
/*
const validateUrl = async (remoteUrl, localUrl) => {
  try {
    const response = await fetch(remoteUrl, { method: "HEAD" });
    if (response.ok) {
      return remoteUrl; // Remote URL is valid
    }
  } catch (error) {
    console.error("Error validating remote URL:", error);
  }
  return localUrl; // Fallback to local URL
};
*/
export function getPatient() { //BASE_URL = validateUrl(Prod_URL, Local_URL);
  return axios.get(BASE_URL)  // make a GET request to the server
    .then(response => response.data)  // get data from response
    .catch(error => {
      console.error("Error fetching patients:", error);
      throw error;  // Re-throw the error for further handling
    });
}

export function addPatient(data) {
  return axios.post(BASE_URL, data)  // make a POST request to the server
    .then(response => response.data)  // get data from response
    .catch(error => {
      console.error("Error adding patient:", error);
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