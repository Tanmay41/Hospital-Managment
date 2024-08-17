import Patient from "../models/patient.js";

export async function getPatients() {
    try {
        const patients = await Patient.find({});
        return {success: true, patients};
    } catch (e) {
        console.error("Error getting patients:", e);
        return {success: false, message: e.message || "Error getting patients."};
    }
}

export async function getOnePatient(id) {
    try {
        const patient = await Patient.findById(id);
        return {success: true, patient};
    } catch (e) {
        console.error("Error getting patients:", e);
        return {success: false, message: e.message || "Error getting patients."};
    }
}

export async function createPatient(data) {
    const patient = new Patient(data);

    try {
        const savedPatient = await patient.save();
        console.log("Patient created successfully");
        return {success: true, patient: savedPatient};
    } catch (e) {
        console.error("Error creating patient:", e);
        return {success: false, message: e.message || "Error creating patient."};
    }
}

export async function editPatient(data) {
    const {id, name, address, mobile, age, gender} = data;
    const patientUpdatedData = {name, address, mobile, age, gender};

    try {
        const patientEdited = await Patient.findByIdAndUpdate(id, patientUpdatedData, {new: true});

        if (patientEdited) {
            console.log("Patient edited successfully");
            return {success: true, patient: patientEdited};
        }
        return {success: false, message: "Patient not found."};
    } catch (e) {
        console.error("Error editing patient:", e);
        return {success: false, message: e.message || "Error editing patient."};
    }
}

export async function deletePatient(id) {
    try {
        const patientDeleted = await Patient.findByIdAndDelete(id);

        if (!patientDeleted) {
            return {success: false, message: "Patient not found."};
        }
        console.log("Patient deleted successfully");
        return {success: true, message: "Patient deleted successfully"};
    } catch (e) {
        console.error("Error deleting patient:", e);
        return {success: false, message: e.message || "Error deleting patient."};
    }
}
