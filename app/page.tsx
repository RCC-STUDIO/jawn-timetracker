'use client'
import NavBar from "@/components/NavBar"
import ShiftRequest from "@/components/modals/ShiftRequest";
import { useState } from "react";

export default function Home() {
    const [modalState, setModalState] = useState(false);
  
  const shiftStyle = "flex flex row justify-between";
  type Shift = {
    id: number,
    shiftType: string,
    dayOfWeek: string,
    department: string,
  }

  const shifts: Shift[] = [
    {
      id: 1,
      shiftType: "Close",
      dayOfWeek: "Monday",
      department: "Produce"
    },
    {
      id: 2,
      shiftType: "Midday",
      dayOfWeek: "Thursday",
      department: "Produce"
    },
    {
      id: 3,
      shiftType: "Open",
      dayOfWeek: "Saturday",
      department: "Produce"
    },
  ];
  
  // Now 'shifts' array contains 7 shifts for the "Produce" department
  

  return (
    
    <main className="flex flex-col items-center justify-between py-10 px-5">
      <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
      <div onClick={() => setModalState(true)} className="flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
        {shifts.map((shift) => (
          <div className="flex flex-row border-2 rounded-lg w-full text-left p-4 m-2 hover:bg-white hover:border-blue-950 hover:text-blue-950" key={shift.id}>
            <div className="flex flex-col w-full">
              <div className={shiftStyle}>
                  <h2>Type:</h2>
                  <p>{shift.shiftType}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Day Of Week:</h2>
                <p>{shift.dayOfWeek}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Department:</h2>
                <p>{shift.department}</p>
              </div>
            </div>
          </div>
           
        ))}
      </div>

      {modalState && (
        <div className="modal-overlay flex flex-col bg-blue-950 p-4 border border-blue-950 rounded-md w-full items-center m-2">
          <div className="flex justify-end w-full mb-2">
            <button onClick={() => setModalState(false)} className="bg-red-500 p-2 border rounded-lg border-red-500">Cancel</button>
          </div>
        <ShiftRequest/>
      </div> )
      }
    </main>
  )
}
