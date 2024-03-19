import mongoose, { Schema } from "mongoose";

const shiftSchema = new Schema(
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

const Shift = mongoose.models.Shift || mongoose.model('Shift', shiftSchema);

export default Shift;