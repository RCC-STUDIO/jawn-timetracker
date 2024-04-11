import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRequest, getEmployee } from '@/libs/dbAccess';
import { set } from 'mongoose';
import { get } from 'http';

const buttonStyle = 'bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 px-6 py-3 mx-5';

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

interface Employee {
  firstName: String,
  lastName: String,
  email: String,
  department_id: String,
  isManager: Boolean,
  _id: String
}


const ShiftRequest = ({ shiftId, employeeId, departmentId, employees}: { shiftId: string, employeeId: string, departmentId: string, employees: Employee[] }) => {
  console.log(shiftId)
  console.log(employeeId)
  const [message, setMessage] = useState("")
  const [shift, setShift] = useState<Shift[]>([])

  //Use Params to send the shiftId to allshifts/page.tsx
  const router = useRouter();
  //Method for routing to allshifts page - Ryan
  const navigateTo = () => {
    // this will be used for the swap request logic later - Matt
    
    const path:string = `/allshifts:${shiftId}`;
    router.push(path);
  }

  // - Matt
  const dropShift = () => {
    const request = {
      first_shift_id: shiftId,
      second_shift_id: null,
      requester_employee_id: employeeId,
      requestee_employee_id: null,
      department_id: departmentId,
      status: "requested"
    }
    createRequest(request)
  }

  return (
    <div className="modal-overlay flex flex-col bg-blue-950 items-center mb-4">
      <h2 className="p-3 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={dropShift} className={buttonStyle}>Drop</button>
        <button onClick={navigateTo} className={buttonStyle}>Swap</button>
      </div>
      {message && (<p className='pt-4 text-lg'>{message}</p>)}
    </div>
  );
};


export default ShiftRequest;

//href="/allshifts"