import axios from "axios";

export async function getPatients() {
    try {
        const response = await axios.get("http://localhost:9000/patient");
        return response?.data?.patients?.patients;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getOnePatient(id: string) {
    try {
        const response = await axios.post("http://localhost:9000/patient/one", {id}, { headers: { 'Content-Type': 'application/json'}});
        return response?.data?.patients?.patient;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

interface Patient {
    _id: string;
    name: string;
    mobile: string;
    address: string;
    age: number;
    gender: boolean;
}

export async function createPatient(data: Patient) {
    try {
        const response = await axios.post("http://localhost:9000/patient/create", data, { headers: { 'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function editPatient(data: Patient) {
    try {
        const response = await axios.post("http://localhost:9000/patient/edit", data, { headers: { 'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deletePatient(id: string) {
    try {
        const response = await axios.post("http://localhost:9000/patient/delete", {id}, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}