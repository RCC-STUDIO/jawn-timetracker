import React, { useState } from 'react';
import * as requestUtils from '../libs/dbAccess';

const buttonStyle = 'bg-blue-950 text-blue-100 border rounded-md hover:bg-blue-950 hover:text-blue-100 p-3 mx-5 w-1/2';

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

const ManagerOptions = ({shiftId}: {shiftId : string}) => {
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState<Shift[]>([])

  const handleRequest = async (decision : string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision }),
    };

    //Fetch all shift data from 'getRequests' function
    await requestUtils.getRequests();
  
    //Handle the response
    //If the decision is approve, update the status of the shift to 'approved'
    //If the decision is deny, update the status of the shift to 'denied'
    //Call the 'updateShift' function to update the status of the shift
    try {
      await requestUtils.updateShift(shiftId, requestOptions);
      setMessage('Shift request has been ' + decision + 'ed');
    } catch (error) {
      console.error(error);
      setMessage('Failed to ' + decision + ' shift request');
    }


  };
  return (
    <div className="modal-overlay flex flex-col bg-blue-100 items-center mb-4">
      <h2 className="p-3 text-blue-950 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={() => handleRequest('approve')} className={buttonStyle}>Approve</button>
        <button onClick={() => handleRequest('deny')} className={buttonStyle}>Deny</button>
      </div>
    </div>
  );
};

export default ManagerOptions;
