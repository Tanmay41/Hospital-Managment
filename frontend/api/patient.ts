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