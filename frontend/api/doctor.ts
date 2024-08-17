import axios from "axios";

export async function getDoctors() {
    try {
        const response = await axios.get("http://localhost:9000/doctor");
        return response?.data?.doctors?.doctors;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllDoctors() {
    try {
        const response = await axios.get("http://localhost:9000/doctor/all");
        return response?.data?.doctors?.doctors;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getOneDoctor(id: string) {
    try {
        const response = await axios.post("http://localhost:9000/doctor/one", {doctorID: id}, {headers: {'Content-Type': 'application/json'}});
        return response?.data?.doctors?.doctors;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createDoctor(data: any) {
    try {
        const response = await axios.post("http://localhost:9000/doctor/create", data, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function editDoctor(data: any) {
    try {
        const response = await axios.post("http://localhost:9000/doctor/edit", data, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteDoctor(data: any) {
    try {
        const response = await axios.post("http://localhost:9000/doctor/delete", data, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}