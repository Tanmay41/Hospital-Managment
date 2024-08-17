import mongoose from "mongoose";

const {Schema} = mongoose;

const patientSchema = new Schema({
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    address: {type: String},
    age: {type: Number},
    gender: {type: Boolean, required: true}
})

const Patient = mongoose.model('Patient', patientSchema);


export default Patient;
