'use client';

import React from 'react';

const buttonStyle = 'bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 p-3 mx-5 w-1/2';

const ShiftRequest = () => {
  return (
    <div className="modal-overlay flex flex-col bg-blue-950 items-center">
      <h2 className="p-3 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button className={buttonStyle}>Drop</button>
        <button className={buttonStyle}>Swap</button>
      </div>
    </div>
  );
};

export default ShiftRequest;
