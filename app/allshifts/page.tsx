"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getShifts } from "@/libs/dbAccess";
import ShiftRequest from "@/components/ShiftRequest";

/*const fakeSchedule = [
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
];*/

// STYLE CONSTANTS
const shiftStyle = "flex flex row justify-between";

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

export default function AllShifts() {
  const [modalState, setModalState] = useState(-1);
  const [shifts, setShifts] = useState<Shift[]>([]);

  const toggleModal = (key: number) => {
    setModalState((previous) => (previous === key ? -1 : key));
  };
  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        setShifts(shiftsData);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);
  return (
    <div className=" items-center text-center">
      <h1 className="text-2xl font-bold p-4">SELECT SHIFT TO SWAP</h1>
      <div className="border rounded-md bg-blue-950 p-4 m-4 border-blue-950">
        {shifts.map((shift, key) => (
          <div key={shift._id}>
            <div className="flex flex-col border-2 rounded-lg text-left p-4 my-4">
              <div
                onClick={() => toggleModal(key)}
                className="flex flex-col w-full"
              >
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
              {modalState === key && <ShiftRequest />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
