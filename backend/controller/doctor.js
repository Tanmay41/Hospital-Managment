import Doctor from "../models/doctor.js";

export async function getDoctors() {
    try {
        const doctors = await Doctor.find({available: true});
        return {success: true, doctors};
    } catch (e) {
        console.error("Error getting doctors:", e);
        return {success: false, message: e.message || "Error getting doctors."};
    }
}

export async function getOneDoctor(id) {
    try {
        const doctors = await Doctor.findById(id);
        return {success: true, doctors};
    } catch (e) {
        console.error("Error getting doctors:", e);
        return {success: false, message: e.message || "Error getting doctors."};
    }
}

export async function getAllDoctors() {
    try {
        const doctors = await Doctor.find({});
        return {success: true, doctors};
    } catch (e) {
        console.error("Error getting doctors:", e);
        return {success: false, message: e.message || "Error getting doctors."};
    }
}

// Create a new doctor
export async function createDoctor({name, mobile, speciality, available}) {
    const doctor = new Doctor({name, mobile, speciality, available});

    try {
        const savedDoctor = await doctor.save(); // Wait for save to complete
        console.log("Doctor created successfully");
        return {success: true, doctor: savedDoctor};
    } catch (e) {
        console.error("Error creating doctor:", e);
        return {success: false, message: "Error creating doctor."};
    }
}

// Edit an existing doctor
export async function editDoctor({id, name, mobile, speciality, available}) {
    const data = {name, mobile, speciality, available};

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, data, {new: true});
        if (!updatedDoctor) {
            return {success: false, message: "Doctor not found."};
        }
        console.log("Doctor edited successfully");
        return {success: true, doctor: updatedDoctor};
    } catch (e) {
        console.error("Error editing doctor:", e);
        return {success: false, message: "Error editing doctor."};
    }
}

// Delete a doctor
export async function deleteDoctor(id) {
    try {
        const result = await Doctor.findByIdAndDelete(id);
        if (!result) {
            return {success: false, message: "Doctor not found."};
        }
        console.log("Doctor deleted successfully");
        return {success: true, message: "Doctor deleted successfully."};
    } catch (e) {
        console.error("Error deleting doctor:", e);
        return {success: false, message: "Error deleting doctor."};
    }
}
