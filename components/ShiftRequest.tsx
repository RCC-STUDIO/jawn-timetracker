import React, { useState } from 'react';

const buttonStyle = 'bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 px-6 py-3 mx-5';

const ShiftRequest = () => {
  const [message, setMessage] = useState("")

  return (
    <div className="modal-overlay flex flex-col bg-blue-950 items-center mb-4">
      <h2 className="p-3 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={() => setMessage("Drop request has been sent!")} className={buttonStyle}>Drop</button>
        <a href="/allshifts" className={buttonStyle}>Swap</a>
      </div>
      {message && (<p className='pt-4 text-lg'>{message}</p>)}
    </div>
  );
};

export default ShiftRequest;
