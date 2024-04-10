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

// This is where the secondary employee will Approve or Deny the first employee's request to swap shifts.
const SwapOptions = ({shiftId}: {shiftId : string}) => {
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState<Shift[]>([])

  const handleSwapRequest = async (decision : string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision }),
    };

    //Fetch the shift request data from 'getRequest' function based off shiftId
    await requestUtils.getRequest(shiftId);

    //Handle the response
    //If the decision is approve, send request to ManagerOptions for approval
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
        <button onClick={() => handleSwapRequest ("Request has been sent!")} className={buttonStyle}>Accept</button>
        <button className={buttonStyle}>Deny</button>
      </div>
      {message && (<p className='pt-4 text-lg text-blue-950 font-bold'>{message}</p>)}
    </div>
  );
};

export default SwapOptions;
