import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js"; // Ensure you have imported the Patient model

export async function getAppointments({all}) {
    try {
        const appointments = all ? await Appointment.find({}).populate("patient").populate("doctor").sort("time") : await Appointment.find({status: "upcoming"}).populate("patient").populate("doctor").sort("time")
        return {success: true, appointments};
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        return {success: false, message: "Error retrieving appointments."};
    }
}

export async function getOneAppointment({appointmentID}) {
    try {
        const appointment = await Appointment.findById(appointmentID).populate("patient").populate("doctor");

        if (!appointment) {
            return {success: false, message: "Appointment not found."};
        }

        return {success: true, appointment};
    } catch (error) {
        console.error("Error retrieving appointment:", error);
        return {success: false, message: "Error retrieving appointment."};
    }
}

export async function createAppointment({doctorID, patientID, description, emergency, date, time, status}) {
    try {
        const doctor = await Doctor.findById(doctorID);
        const patient = await Patient.findById(patientID);

        if (!doctor || !patient) {
            return {success: false, message: "Doctor or Patient not found."};
        }

        const appointment = new Appointment({
            doctor: doctor._id,
            patient: patient._id,
            description,
            emergency,
            date,
            time,
            status
        });

        const appointmentSaved = await appointment.save();
        return {success: true, appointment: appointmentSaved};
    } catch (error) {
        console.error("Error creating appointment:", error);
        return {success: false, message: "Error creating appointment."};
    }
}

export async function updateAppointment(appointmentID, {
    doctorID,
    patientID,
    description,
    emergency,
    date,
    time,
    status
}) {
    try {
        const doctor = await Doctor.findById(doctorID);
        const patient = await Patient.findById(patientID);

        if (!doctor || !patient) {
            return {success: false, message: "Doctor or Patient not found."};
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentID,
            {
                doctor: doctor._id,
                patient: patient._id,
                description,
                emergency,
                date,
                time,
                status
            },
            {new: true}
        );

        if (!updatedAppointment) {
            return {success: false, message: "Appointment not found."};
        }

        return {success: true, appointment: updatedAppointment};
    } catch (error) {
        console.error("Error updating appointment:", error);
        return {success: false, message: "Error updating appointment."};
    }
}

export async function deleteAppointment(appointmentID) {
    try {
        const appointmentDeleted = await Appointment.findByIdAndDelete(appointmentID);

        if (!appointmentDeleted) {
            return {success: false, message: "Appointment not found."};
        }

        console.log("Appointment deleted successfully");
        return {success: true, message: "Appointment deleted successfully."};
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return {success: false, message: "Error deleting appointment."};
    }
}
