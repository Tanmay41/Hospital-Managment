import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectToDB from './db/connectToDB.js';
import cors from "cors"

dotenv.config();

const app = express();

(async () => {
    try {
        await connectToDB();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
})();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

import doctorRouter from './routes/doctor.js';
import patientRouter from './routes/patient.js';
import appointmentRouter from './routes/appointment.js'

app.get('/', (req, res) => {
    res.status(200).json({success: true, message: "Welcome to the API"});
})

app.use('/doctor/', doctorRouter);
app.use('/patient/', patientRouter);
app.use('/appointment/', appointmentRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(9000, () => {
    console.log("Listening on http://localhost:9000");
})

export default app;
