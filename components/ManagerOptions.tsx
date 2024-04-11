import { getShifts, updateRequest, updateShift } from '@/libs/dbAccess';
import React from 'react';

const buttonStyle = 'bg-blue-950 text-blue-100 border rounded-md hover:bg-blue-950 hover:text-blue-100 p-3 mx-5 w-1/2';

interface Request {
  first_shift_id: string,
  second_shift_id: string,
  requester_employee_id: string,
  requestee_employee_id: string, // can be null
  department_id: string,
  status: string,
  _id: string
}

interface Shift {
  startDate: Date;
  endDate: Date;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

const ManagerOptions = ({ request }: { request: Request}) => {
  const handleAccept = async () => {
    // CHANGE THE STATUS OF THE REQUEST TO ACCEPTED
    const newRequest = {
      newFirst_shift_id: request.first_shift_id,
      newSecond_shift_id: request.second_shift_id,
      newRequester_employee_id: request.requester_employee_id,
      newRequestee_employee_id: request.requestee_employee_id,
      newDepartment_id: request.department_id,
      newStatus: "swapped"
    }
    updateRequest(request._id, newRequest);
    
    const shifts = await getShifts();
    const firstShift = shifts.find((shift: Shift) => shift._id == request.first_shift_id);
    const secondShift = shifts.find((shift: Shift) => shift._id == request.second_shift_id);
    // change the employee_id of the first shift to the requestee_employee_id
    const newFirstShift = {
      newEmployee_id: request.requestee_employee_id,
      newStatus: "filled"
    }
    // change the employee_id of the second shift to the requester_employee_id
    const newSecondShift = {
      newEmployee_id: request.requester_employee_id,
      newStatus: "filled"
    }
    updateShift(request.first_shift_id, newFirstShift);
    updateShift(request.second_shift_id, newSecondShift);
  }

  const handleDeny = () => {
    const newRequest = {
      newStatus: "denied"
    }
    updateRequest(request._id, newRequest);
  }

  return (
    <div className="modal-overlay flex flex-col bg-blue-100 items-center mb-4">
      <h2 className="p-3 text-blue-950 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={handleAccept} className={buttonStyle}>Approve</button>
        <button onClick={handleDeny} className={buttonStyle}>Deny</button>
      </div>
    </div>
  );
};

export default ManagerOptions;
