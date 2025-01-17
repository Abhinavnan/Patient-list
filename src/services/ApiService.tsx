// @ts-nocheck
import axios from "axios";

const Local_URL = "http://127.0.0.1:8000/patients/"  
const Prod_URL = "https://patientlist.duckdns.org:8000/patients/"
//const BASE_URL = process.env.NODE_ENV === 'development' ? Prod_URL : Local_URL;
let BASE_URL  = null; // Default to Prod_URL
const setBaseUrl = async () => {
  try {
    // Perform a lightweight GET request to Prod_URL
    const response = await axios.get(Prod_URL, {
      timeout: 500,
      params: { check: true }, // Optional: Add a harmless query parameter
    });
    if (response.status === 200) {
      BASE_URL = Prod_URL; // Use Prod_URL if available
      console.log("Prod_URL is reachable. Setting BASE_URL to Prod_URL.");
    }
  } catch (error) {
    console.error("Error accessing Prod_URL. Falling back to Local_URL:", error.message);
    BASE_URL = Local_URL; // Fallback to Local_URL
  }
};

// Immediately set BASE_URL when the module is imported
setBaseUrl().then(() => {
  console.log("BASE_URL set to:", BASE_URL);
});

export async function getPatient() { 
  await setBaseUrl();
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