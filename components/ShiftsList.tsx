'use client'
import { getShifts } from "@/libs/dbAccess";
import { useState, useEffect } from "react";
import ShiftRequest from "./ShiftRequest";

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}




export default function ShiftList() {
  const shiftStyle = "flex flex row justify-between";
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [modalState, setModalState] = useState(-1);

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        // the user "65fb91a6733b75969216cb2d" is being used for testing purposes
        const userShifts = shiftsData.filter((shift: Shift) => shift.employee_id === "65fb91a6733b75969216cb2d");

        setShifts(userShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);

  const toggleModal = (key: number) => {
    setModalState((previous) => (previous === key ? -1 : key));
  };

  return (
    <>
      {shifts.map((shift, key) => (
        <div className="flex flex-row border-2 rounded-lg w-full text-left p-4 m-2" key={shift._id}>
          <div>
            <div onClick={() => toggleModal(key)} className="flex flex-col w-full">
              <div className={shiftStyle}>
                <h2>Start Date:</h2>
                <p>{shift.startDate}</p>
              </div>
              <div className={shiftStyle}>
                <h2>End Date:</h2>
                <p>{shift.endDate}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Employee:</h2>
                <p>{shift.employee_id}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Department:</h2>
                <p>{shift.department_id}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Status:</h2>
                <p>{shift.status}</p>
              </div>
            </div>
            {modalState === key && <ShiftRequest shiftId={shift._id}/>}
          </div>
        </div>
      ))}
    </>
  );
}
