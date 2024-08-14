import mongoose from "mongoose";

export default function connectToDB(){
    try {
        mongoose.connect(process.env.MONGODB_URI);
    }catch (e) {
        console.log("error while connecting to DB: " + e)
    }
}