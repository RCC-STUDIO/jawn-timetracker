import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
    {
        first_shift_id: String,
        second_shift_id: String,
        requester_employee_id: String,
        requestee_employee_id: String,
        department_id: String,
        status: String // pending, requested, dropped, swapped, completed
        /*
        * pending: the request has been sent to the second employee
        * requested: the request has been sent to management
        * working: the request has been complete
        * 
        * Shift swaps:
        * 1. First employee sends request to second employee (pending) [requestee_employee_id]
        * 2. Second employee [requester_employee_id] 
        *    a) accepts the request: the request is sent to management. (requested)
        *    b) declines the request: the request is declined and employee is notified. (completed)
        * 3. Management
        *    a) accepts the request: the request is complete and employees are notified. (swapped)
        *    b) declines the request: the request is declined and employees are notified. (completed)
        * 
        * Shift drops:
        * 1. Employee sends request to management (requested)
        * 2. Management
        *    a) accepts the request: the request is complete and employee is notified. (dropped)
        *    b) declines the request: the request is declined and employee is notified. (completed)
        */
    },
    { 
        timestamps: true 
    }
);

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

export default Request;