import axios from "axios";

export async function getAppointments() {
    try {
        const response = await axios.get("http://localhost:9000/appointment");
        return response?.data?.appointments?.appointments;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getOneAppointment(id: string) {
    try {
        const response = await axios.post("http://localhost:9000/appointment/one", {appointmentID: id}, {headers: {'Content-Type': 'application/json'}});
        return response?.data?.appointments?.appointment;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createAppointment(data: object) {
    try {
        const response = await axios.post("http://localhost:9000/appointment" + "/create", data, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function editAppointment(data: object) {
    try {
        const response = await axios.post("http://localhost:9000/appointment" + "/edit", data, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteAppointment(id: string) {
    try {
        const response = await axios.post("http://localhost:9000/appointment" + "/delete", {appointmentID: id}, {headers: {'Content-Type': 'application/json'}});
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
