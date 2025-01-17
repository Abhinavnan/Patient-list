// @ts-nocheck
import axios from "axios";

const Local_URL = "http://127.0.0.1:8000/patients/"  
const Prod_URL = "http://3.110.176.180:8000/patients/"
//const BASE_URL = process.env.NODE_ENV === 'development' ? Prod_URL : Local_URL;
let BASE_URL  = Local_URL

const setBaseUrl = async () => {
  try {
    const response = await axios.head(Prod_URL, { timeout: 5000 }); // Check Prod_URL availability
    if (response.status === 200) {
      BASE_URL = Prod_URL; // Use Prod_URL if available
    }
  } catch (error) {
    console.error("Prod_URL unavailable, using Local_URL:", error.message);
    BASE_URL = Local_URL; // Fallback to Local_URL
  }
};

// Immediately set BASE_URL when the module is imported
setBaseUrl().then(() => {
  console.log("BASE_URL set to:", BASE_URL);
});

export function getPatient() {
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