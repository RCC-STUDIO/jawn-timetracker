'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRequest, getEmployees, getShift, getShifts } from '@/libs/dbAccess';

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


export default function CompleteSwap({ firstShiftId, secondShiftId, departmentId, requester_id, requestee_id }: { firstShiftId: string, secondShiftId: string, departmentId: string, requester_id: string, requestee_id: string })  {
  const [message, setMessage] = useState("")

  //Use Params to send the shiftId to allshifts/page.tsx
  const router = useRouter();
  //Method for routing to allshifts page - Ryan
  const returnToMain = () => {
    const path:string = `/`;
    router.push(path);
  }

  // - Matt
  const confirmSwap = async () => {   
    const request = {
      first_shift_id: firstShiftId.slice(11),
      second_shift_id: secondShiftId,
      requester_employee_id: requester_id,
      requestee_employee_id: requestee_id,
      department_id: departmentId,
      status: "pending"
    }
    createRequest(request)
    setMessage("Swap request has been sent!")
    returnToMain();
  }
  return (
    <div className="modal-overlay flex flex-col bg-blue-950 items-center mb-4">
        <div className="flex flex-row justify-center w-full">
        <button onClick={confirmSwap} className='bg-blue-100 w-2/5 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 px-6 py-3 mt-5  '>Confirm</button>
      </div>
      {message && (<p className='pt-4 text-lg'>{message}</p>)}
    </div>
  );
};