import express from "express";
import {getPatients, createPatient, deletePatient, editPatient, getOnePatient} from "../controller/patient.js";

const patientRouter = express.Router();

patientRouter.get('/', async (req, res) => {
    const result = await getPatients()
    res.status(200).json({success: true, patients: result});
})

patientRouter.post('/one', async (req, res) => {
    const result = await getOnePatient(req.body.id)
    res.status(200).json({success: true, patients: result});
})

patientRouter.post("/create", async (req, res) => {
    const {name, mobile, address, age, gender} = req.body;

    if (!name || !mobile) {
        return res.status(400).json({success: false, message: "Name and mobile are required."});
    }

    try {
        const newPatient = {name, mobile, address, age, gender};
        const result = await createPatient(newPatient);

        if (result.success) {
            console.log("Patient created successfully");
            res.status(201).json({success: true, message: "Patient created successfully", patient: result.patient});
        } else {
            res.status(500).json({success: false, message: result.message});
        }
    } catch (error) {
        console.error("Error creating patient:", error);
        res.status(500).json({success: false, message: error.message || "Internal server error."});
    }
});

patientRouter.post("/edit", async (req, res) => {
    const {id, name, mobile, address, age, gender} = req.body;

    if (!id) {
        return res.status(400).json({success: false, message: "ID is required."});
    }

    try {
        const updatedPatient = {id, name, mobile, address, age, gender};
        const result = await editPatient(updatedPatient);

        if (result.success) {
            console.log("Patient edited successfully");
            res.status(200).json({success: true, message: "Patient edited successfully", patient: result.patient});
        } else {
            res.status(500).json({success: false, message: result.message});
        }
    } catch (error) {
        console.error("Error editing patient:", error);
        res.status(500).json({success: false, message: error.message || "Internal server error."});
    }
});

patientRouter.post('/delete', async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({success: false, message: "ID is required."});
    }

    try {
        const result = await deletePatient(id);

        if (result.success) {
            console.log("Patient deleted successfully");
            res.status(200).json({success: true, message: "Patient deleted successfully"});
        } else {
            res.status(500).json({success: false, message: result.message});
        }
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({success: false, message: error.message || "Internal server error."});
    }
});

export default patientRouter;
