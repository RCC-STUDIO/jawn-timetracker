import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const buttonStyle = 'bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 px-6 py-3 mx-5';

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}


const ShiftRequest = ({ shiftId}: { shiftId: string }) => {
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
    setMessage("Drop request has been sent!")
    // push the request using the shiftId that comes from the prop
    /*
      POST() {
        newFirst_shift_id: shiftID (from props), 
        newSecond_shift_id: null, 
        newRequesterEmployee_id: check note, 
        newRequesteeEmployee_id: null, 
        newDepartment_id: check note, 
        newStatus: check note
      }
      and submit this to the requests

      NOTE: do we want to just submit the shift id? that way we are passing as little information
      as possible so that way can we just have the useEffect over in the drop requests over in 
      the manager page and then have it load the rest of the information based on that shift id
    */
  }
  return (
    <div className="modal-overlay flex flex-col bg-blue-950 items-center mb-4">
      <h2 className="p-3 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={() => dropShift} className={buttonStyle}>Drop</button>
        <button onClick={navigateTo} className={buttonStyle}>Swap</button>
      </div>
      {message && (<p className='pt-4 text-lg'>{message}</p>)}
    </div>
  );
};

export default ShiftRequest;

//href="/allshifts"