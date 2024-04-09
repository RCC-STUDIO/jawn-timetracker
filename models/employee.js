import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        department_id: String,
        isManager: Boolean,
    },
    { 
        timestamps: true 
    }
);

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;