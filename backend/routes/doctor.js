import express from "express";

const doctorRouter = express.Router();
import {getDoctors, createDoctor, deleteDoctor, editDoctor, getOneDoctor, getAllDoctors} from "../controller/doctor.js";

doctorRouter.get("/", async (req, res) => {
    const result = await getDoctors()
    res.status(200).json({success: true, doctors: result});
})

doctorRouter.post("/one", async (req, res) => {
    const result = await getOneDoctor(req.body.doctorID)
    res.status(200).json({success: true, doctors: result});
})

doctorRouter.get("/all", async (req, res) => {
    const result = await getAllDoctors()
    p
    res.status(200).json({success: true, doctors: result});
})

doctorRouter.post('/create', async (req, res) => {
    const {name, mobile, speciality, available} = req.body;

    if (!name || !mobile) {
        return res.status(400).json({success: false, message: "Name and mobile are required."});
    }

    try {
        const newDoctor = {name, mobile, speciality, available};
        const doctorCreated = await createDoctor(newDoctor);

        if (doctorCreated) {
            return res.status(201).json({success: true, message: "Doctor created successfully."});
        } else {
            return res.status(500).json({success: false, message: "Error creating doctor."});
        }
    } catch (error) {
        console.error("Error creating doctor:", error);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

doctorRouter.post('/edit', async (req, res) => {
    const {id, name, mobile, speciality, available} = req.body;

    if (!id) {
        return res.status(400).json({success: false, message: "Doctor ID is required."});
    }

    try {
        const updatedDoctor = {id, name, mobile, speciality, available};
        const doctorEdited = await editDoctor(updatedDoctor);

        if (doctorEdited) {
            return res.status(200).json({success: true, message: "Doctor edited successfully."});
        } else {
            return res.status(500).json({success: false, message: "Error editing doctor."});
        }
    } catch (error) {
        console.error("Error editing doctor:", error);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

doctorRouter.post('/delete', async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({success: false, message: "Doctor ID is required."});
    }

    try {
        const doctorDeleted = await deleteDoctor(id);

        if (doctorDeleted) {
            return res.status(200).json({success: true, message: "Doctor deleted successfully."});
        } else {
            return res.status(500).json({success: false, message: "Error deleting doctor."});
        }
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
});

export default doctorRouter;
