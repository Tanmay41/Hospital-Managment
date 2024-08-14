import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema ({
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    speciality: {type: String},
    available: {type: Boolean, required: true, default: true}
})

const Doctor = mongoose.model('Doctor', doctorSchema);


export default Doctor;
