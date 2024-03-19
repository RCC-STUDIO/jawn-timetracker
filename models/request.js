import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
    {
        startDate: String,
        endDate: String,
        employee: String,
        department: String,
        status: String
    },
    { 
        timestamps: true 
    }
);

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

export default Request;