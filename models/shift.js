import mongoose, { Schema } from "mongoose";

const shiftSchema = new Schema(
    {
        startDate: String, // Format: "YYYY-MM-DD-HH-MM"
        endDate: String, // Format: "YYYY-MM-DD-HH-MM"
        employee_id: String,
        department_id: String,
        status: String
    },
    { 
        timestamps: true 
    }
);

const Shift = mongoose.models.Shift || mongoose.model('Shift', shiftSchema);

export default Shift;