import { getShifts, updateRequest, updateShift } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

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


const SwapOptions = ({ request }: { request: Request}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleAccept = async () => {
    // CHANGE THE STATUS OF THE REQUEST TO ACCEPTED
    const newRequest = {
      newStatus: "requested"
    }
    updateRequest(request._id, newRequest);
    setMessage("Request has been sent!")
    returnToMain()
  }

  const handleDeny = () => {
    const newRequest = {
      newStatus: "denied"
    }
    updateRequest(request._id, newRequest);
    setMessage("Request has been denied!")
    returnToMain()
  }

  const returnToMain = () => {
    const path:string = `/profile`;
    router.push(path);
  }

  return (
    <div className="modal-overlay flex flex-col bg-blue-100 items-center mb-4">
      <h2 className="p-3 text-blue-950 text-lg font-bold">Request Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={handleAccept} className={buttonStyle}>Accept</button>
        <button onClick={handleDeny} className={buttonStyle}>Deny</button>
      </div>
      {message && (<p className='pt-4 text-lg text-blue-950 font-bold'>{message}</p>)}
    </div>
  );
};

export default SwapOptions;
