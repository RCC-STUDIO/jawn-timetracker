'use client'
import { useState } from "react";
import NavBar from "@/components/NavBar";
import ShiftRequest from "@/components/modals/ShiftRequest";

export default function Home() {
  const [modalState, setModalState] = useState(-1); // Initialize modal state with -1

  const shiftStyle = "flex flex-row justify-between";
  type Shift = {
    id: number;
    shiftType: string;
    dayOfWeek: string;
    department: string;
  };

  const shifts: Shift[] = [
    {
      id: 1,
      shiftType: "Close",
      dayOfWeek: "Monday",
      department: "Produce",
    },
    {
      id: 2,
      shiftType: "Midday",
      dayOfWeek: "Thursday",
      department: "Produce",
    },
    {
      id: 3,
      shiftType: "Open",
      dayOfWeek: "Saturday",
      department: "Produce",
    },
  ];

  const toggleModal = (shiftId: number) => {
    // Toggle the modal state for the clicked shift
    setModalState((previous) => (previous === shiftId ? -1 : shiftId));
  };

  return (
    <main className="flex flex-col items-center justify-between py-10 px-5">
      <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
      <div className="flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="flex flex-col items-center bg-blue-950 w-full rounded-lg border-2 m-2"
          >
            <div
              onClick={() => toggleModal(shift.id)} // Call toggleModal with shift.id
              className="flex flex-row w-full text-left p-4 m-2 cursor-pointer"
            >
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
            {modalState === shift.id && <ShiftRequest/>} {/* Render modal if modalState matches shift.id */}

          </div>
        ))}
      </div>
    </main>
  );
}
