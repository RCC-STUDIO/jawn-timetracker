import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
    {
        first_shift_id: String,
        second_shift_id: String,
        next_employee_id: String,
        department_id: String,
        status: String
    },
    { 
        timestamps: true 
    }
);

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

export default Request;