import express from "express";
import {
    createAppointment,
    deleteAppointment,
    getAppointments,
    getOneAppointment,
    updateAppointment
} from "../controller/appointment.js";

const appointmentRouter = express.Router();

appointmentRouter.get('/', async (req, res) => {
    try {
        const result = await getAppointments({});
        res.status(200).json({success: true, appointments: result});
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to retrieve appointments", error: error.message});
    }
});

appointmentRouter.get('/all', async (req, res) => {
    try {
        const result = await getAppointments({all: true});
        res.status(200).json({success: true, appointments: result});
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to retrieve appointments", error: error.message});
    }
});

appointmentRouter.post('/one', async (req, res) => {
    try {
        const {appointmentID} = req.body;
        const result = await getOneAppointment({appointmentID});
        res.status(200).json({success: true, appointments: result});
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to retrieve appointments", error: error.message});
    }
});

appointmentRouter.post("/create", async (req, res) => {
    const {doctorID, patientID, description, emergency, date, time, status} = req.body
    if (!doctorID || !patientID || !date || !time) {
        return res.status(400).json({success: false, message: "Missing required fields"});
    }

    const appointment = await createAppointment({doctorID, patientID, description, emergency, date, time, status})

    if (appointment.success) {
        res.status(201).json({success: true, message: "Appointment created successfully", appointment});
    } else {
        res.status(500).json({success: false, message: appointment.message});
    }
})

appointmentRouter.post("/edit", async (req, res) => {
    const {appointmentID, doctorID, patientID, description, emergency, date, time, status} = req.body
    if (!appointmentID || !doctorID || !patientID) {
        return res.status(400).json({success: false, message: "Missing required fields"});
    }

    const updatedAppointment = await updateAppointment(appointmentID, {
        doctorID,
        patientID,
        description,
        emergency,
        date,
        time,
        status
    })

    if (updatedAppointment.success) {
        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            appointment: updatedAppointment.appointment
        });
    } else {
        res.status(500).json({success: false, message: updatedAppointment.message});
    }
})

appointmentRouter.post("/delete", async (req, res) => {
    const {appointmentID} = req.body
    if (!appointmentID) {
        return res.status(400).json({success: false, message: "Missing required field"});
    }

    const deletedAppointment = await deleteAppointment(appointmentID)

    if (deletedAppointment.success) {
        res.status(200).json({success: true, message: "Appointment deleted successfully"});
    } else {
        res.status(500).json({success: false, message: deletedAppointment.message});
    }
})

export default appointmentRouter;
