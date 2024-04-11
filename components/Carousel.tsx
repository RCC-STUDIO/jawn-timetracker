import React, { useEffect, useState } from "react";
import { getRequests, getEmployees, getShifts } from "@/libs/dbAccess";
import ManagerOptions from "./ManagerOptions";
import { request } from "http";


export default function Carousel({ employeeId, departmentId }: { employeeId: string, departmentId: string }) {
    const [modalState, setModalState] = useState(-1); // Initialize modal state with -1
    const [dropRequests, setDropRequests] = useState<Request[]>([])
    const [swapRequests, setSwapRequests] = useState<Request[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])
    const [shifts, setShifts] = useState<Shift[]>([])


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

    interface Shift {
        startDate: Date,
        endDate: Date,
        employee_id: string,
        department_id: string,
        status: string,
        _id: string
    }

    useEffect(() => {
        async function fetchEmployees() {
          try {
            const employeesData = await getEmployees();
            setEmployees(employeesData);
          } catch (error) {
            console.error("Error fetching employees:", error);
          }
        }
        fetchEmployees();
        async function fetchShifts() {
          try {
            const shiftsData = await getShifts();
            setShifts(shiftsData);
          } catch (error) {
            console.error("Error fetching shifts:", error);
          }
        }
        fetchShifts();
        async function fetchRequests() {
          try {
            const requestData = await getRequests();
            // divi-up the requests based on the requestee id
            requestData.filter((request: Request) => request.department_id == departmentId);
            let dropRequests = requestData.filter((request: Request) => request.second_shift_id == null);
            let swapRequests = requestData.filter((request: Request) => request.second_shift_id != null);
            swapRequests = swapRequests.filter((request: Request) => request.status == "requested");
            setDropRequests(dropRequests);
            setSwapRequests(swapRequests);
          } catch (error) {
            console.error("Error fetching shifts:", error);
          }
        }
        fetchRequests();
      }, []);

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

    // STYLE CONSTANTS
    const requestStyles = "bg-blue-100 p-4 w-full items-center rounded-md text-black";
    const requestContentStyles = "flex flex-row justify-between font-bold"
    const buttonStyles = "bg-blue-100 text-black border rounded-md border-blue-100 p-4"
  
    // TOGGLE CONTROLS
    const [showDropRequests, setShowDropRequests] = useState(true);
    const [showSwapRequests, setShowSwapRequests] = useState(false);

    const toggleModal = (shiftId: number) => {
        // Toggle the modal state for the clicked shift
        setModalState((previous) => (previous === shiftId ? -1 : shiftId));
      };

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                <div className="my-5">
                    <button className={buttonStyles} onClick={() => { setShowDropRequests(true); setShowSwapRequests(false); }}>Drop Requests</button>
                    <button className={buttonStyles} onClick={() => { setShowDropRequests(false); setShowSwapRequests(true); }}>Swap Requests</button>
                </div>
                {showDropRequests && (
                    <div className="w-full bg-blue-950 p-5 border rounded-md border-blue-950">
                            <h2 className="text-center font-bold">DROP REQUESTS</h2>
                            {dropRequests.map((index, key) => (
                            <div key={key} className="bg-blue-100 border rounded-md my-3">
                                <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
                                    <div className="">
                                        <div className={requestContentStyles}>
                                            <p>Requester:</p>
                                            <p className="">{getEmployeeName(index.requester_employee_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Start Date:</p>
                                            <p>{getShiftStartDate(index.first_shift_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>End Date:</p>
                                            <p>{getShiftEndDate(index.first_shift_id)}</p>
                                        </div>
                                    </div>
                                </div>
                                {modalState === key && <ManagerOptions/>} {/* Render modal if modalState matches shift key */}
                            </div>
                            
                        ))}
                    </div>
                )}
                {showSwapRequests && (
                    <div className="w-full bg-blue-950 p-5 border rounded-md border-blue-950">
                        <h2 className="text-center font-bold">SWAP REQUESTS</h2>
                        {swapRequests.map((request, key) => (
                            <div key={key} className="bg-blue-100 border rounded-md my-3">
                                <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
                                    <div className="">
                                        <div className={requestContentStyles}>
                                            <p>Requester:</p>
                                            <p>{getEmployeeName(request.requester_employee_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Requestee:</p>
                                            <p>{getEmployeeName(request.requestee_employee_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Primary Shift:<br/></p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Start:</p>
                                            <p>{getShiftStartDate(request.first_shift_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>End:</p>
                                            <p>{getShiftEndDate(request.first_shift_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Secondary Shift:<br/></p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Start:</p>
                                            <p>{getShiftStartDate(request.second_shift_id)}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>End:</p>
                                            <p>{getShiftEndDate(request.second_shift_id)}</p>
                                        </div>
                                    </div>
                                </div>
                                {modalState === key && <ManagerOptions/>} {/* Render modal if modalState matches shift key */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
