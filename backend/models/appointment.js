import mongoose from "mongoose";

const {Schema} = mongoose;

// Regex to validate the time format HH:MM where HH is from 09 to 20 and MM is either 00 or 30.
const timeRegex = /^(0[9]|1[0-9]|20):(00|30)$/;

const appointmentSchema = new Schema({
    patient: {type: Schema.Types.ObjectId, ref: 'Patient', required: true},
    doctor: {type: Schema.Types.ObjectId, ref: 'Doctor', required: true},
    date: {type: Date, required: true},
    time: {type: String, match: timeRegex, required: true},
    status: {type: String, enum: ['upcoming', 'over', 'canceled'], default: 'upcoming'},
    emergency: {type: Boolean, default: false},
    description: {type: String, default: ""}
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
