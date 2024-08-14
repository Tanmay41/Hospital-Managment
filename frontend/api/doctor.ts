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