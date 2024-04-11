import React from "react";
import { useState, useEffect } from "react";
import SwapOptions from "./SwapOptions";
import { getEmployees, getRequests, getShifts } from "@/libs/dbAccess";
import { set } from "mongoose";

interface Request {
  first_shift_id: string,
  second_shift_id: string,
  requester_employee_id: string,
  requestee_employee_id: string, // can be null
  department_id: string,
  status: string
}

interface Employee {
  firstName: string,
  lastName: string,
  email: string,
  department_id: string,
  isManager: boolean,
  _id: string
}

// STYLE CONSTANTS
const requestStyles =
  "bg-blue-100 p-3 w-full items-center rounded-md text-black";
const requestContentStyles = "flex flex-row justify-between font-bold";

const fakeSwapRequests = [
  ["Ryan", "Monday the 15th", "4pm - 10pm", "Tuesday the 16th", "9am - 3pm"],
  ["Ryan", "Monday the 15th", "4pm - 10pm", "Tuesday the 16th", "9am - 3pm"],
];

export default function SwapRequests({ employeeId }: { employeeId: string}) {
  const [modalState, setModalState] = useState(-1);
  const [requests, setRequests] = useState<Request[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState([]);
  const toggleModal = (shiftId: number) => {
    // Toggle the modal state for the clicked shift
    setModalState((previous) => (previous === shiftId ? -1 : shiftId));
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        const requestData = await getRequests();
        const employeeData = await getEmployees();
        const shiftData = await getShifts();
        const employeeRequests = requestData.filter((request: Request) => request.requestee_employee_id == employeeId); 
        setRequests(employeeRequests);
        setEmployees(employeeData);
        setShifts(shiftData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    }
    fetchRequests();
  }, [employeeId]);

  function getEmployeeName(employee_id: string) {
    let employeeName = "";
    for (let i = 0; i < employees.length; i++) {
    if (employees[i]._id == employee_id) {
        employeeName = employees[i].firstName + " " + employees[i].lastName;
    }
    }
    return employeeName;
  }

  function getShiftStartDate(shift_id: string) {
    let shiftDate = "";
    for (let i = 0; i < shifts.length; i++) {
    if (shifts[i]._id == shift_id) {
        let startDate = new Date(shifts[i].startDate).toLocaleString()
        shiftDate = startDate;
    }
    }
    return shiftDate;
  }

  function getShiftEndDate(shift_id: string) {
    let shiftDate = "";
    for (let i = 0; i < shifts.length; i++) {
    if (shifts[i]._id == shift_id) {
        let endDate = new Date(shifts[i].endDate).toLocaleString();
        shiftDate = endDate;
    }
    }
    return shiftDate;
}

  return (
    <div className="w-full bg-blue-950 p-5 mt-7 border rounded-md border-blue-950">
      <h2 className="text-center font-bold">SWAP REQUESTS</h2>
      {requests.map((request, key) => (
        <div key={key} className="bg-blue-100 border rounded-md m-3">
        <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
          <div className="">
            <div className={requestContentStyles}>
              <p>Employee:</p>
              <p>{getEmployeeName(request.requester_employee_id)}</p>
            </div>
            <div className={requestContentStyles}>
              <p>Their Shift:</p>
            </div>
            <div className={requestContentStyles}>
              <p>Start:</p>
              <div className="flex flex-col text-right">
                <p>{getShiftStartDate(request.first_shift_id)}</p>
              </div>
            </div>
            <div className={requestContentStyles}>
              <p>End:</p>
              <div className="flex flex-col text-right">
                <p>{getShiftEndDate(request.first_shift_id)}</p>
              </div>
            </div>
            <div className={requestContentStyles}>
              <p>Your Shift:</p>
            </div>
            <div className={requestContentStyles}>
              <p>Start:</p>
              <div className="flex flex-col text-right">
                <p>{getShiftStartDate(request.second_shift_id)}</p>
              </div>
            </div>
            <div className={requestContentStyles}>
              <p>End:</p>
              <div className="flex flex-col text-right">
                <p>{getShiftEndDate(request.second_shift_id)}</p>
              </div>
            </div>
          </div>
        </div>
        {modalState === key && <SwapOptions/>} {/* Render modal if modalState matches shift key */}
        </div>
      ))}
    </div>
  );
}
