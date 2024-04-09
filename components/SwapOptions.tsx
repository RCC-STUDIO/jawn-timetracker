import React, { useState } from 'react';

const buttonStyle = 'bg-blue-950 text-blue-100 border rounded-md hover:bg-blue-950 hover:text-blue-100 p-3 mx-5 w-1/2';

// This is where the secondary employee will Approve or Deny the first employee's request to swap shifts.
const SwapOptions = () => {
  const [message, setMessage] = useState("")

  return (
    <div className="modal-overlay flex flex-col bg-blue-100 items-center mb-4">
      <h2 className="p-3 text-blue-950 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={() => setMessage("Request has been sent!")} className={buttonStyle}>Accept</button>
        <button className={buttonStyle}>Deny</button>
      </div>
      {message && (<p className='pt-4 text-lg text-blue-950 font-bold'>{message}</p>)}
    </div>
  );
};

export default SwapOptions;
