import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        department: String,
    },
    { 
        timestamps: true 
    }
);

const Employee = mongoose.models.employee || mongoose.model('Employee', employeeSchema);

export default Employee;