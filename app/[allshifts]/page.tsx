"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getShifts } from "@/libs/dbAccess";
import CompleteSwap from "@/components/CompleteSwap";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getEmployees, getDepartments } from "@/libs/dbAccess";
import { usePathname } from "next/navigation";

// STYLE CONSTANTS
const shiftStyle = "flex flex row justify-between";
const buttonStyle = 'bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 px-6 py-3 mx-5';


interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

interface Employee {
  firstName: String,
  lastName: String,
  email: String,
  department_id: String,
  isManager: Boolean,
  _id: String
}

interface Department {
  department: string,
  _id: String
}

export default function AllShifts() {
  const router = useRouter();
  const shiftId = usePathname();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email;
  const [modalState, setModalState] = useState(-1);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [requester_id, setRequesterId] = useState("");

  const toggleModal = (key: number) => {
    setModalState((previous) => (previous === key ? -1 : key));
  };
  
  useEffect(() => {
    async function fetchShifts() {
      try {
        let employee_id = "";
        const shiftsData = await getShifts();
        // get all employee and departments
        let employees = await getEmployees();
        setEmployees(employees);
        let departments = await getDepartments();
        setDepartments(departments);
        // find employee by matching the email
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email == userEmail) {
              employee_id = employees[i]._id;
          }
        }

        const availableShifts = shiftsData.filter((shift: Shift) => shift.employee_id != employee_id);
        setRequesterId(employee_id);
        setShifts(availableShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail]);

  function getEmployeeName(employee_id: string) {
    let employeeName = "";
    for (let i = 0; i < employees.length; i++) {
      if (employees[i]._id == employee_id) {
        employeeName = employees[i].firstName + " " + employees[i].lastName;
      }
    }
    return employeeName;
  }

  function getDepartmentName(department_id: string) {
    let departmentName = "";
    for (let i = 0; i < departments.length; i++) {
      if (departments[i]._id == department_id) {
        departmentName = departments[i].department;
      }
    }
    return departmentName;
  }

  const returnToMain = () => {
    const path:string = `/`;
    router.push(path);
  }
  
  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/api/auth/signin`);
  } else {
  return (
    <div className=" items-center text-center">
      <h1 className="text-2xl font-bold p-4">SELECT SHIFT TO SWAP</h1>
      <button onClick={returnToMain} className={buttonStyle}>Cancel</button>
      <div className="border rounded-md bg-blue-950 p-4 m-4 border-blue-950">
        {shifts.map((shift, key) => {
          const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const shiftDay = startDate.getDate();
          const shiftMonth = startDate.getMonth();
          const shiftYear = startDate.getFullYear();
          return (
          <div key={shift._id}>
            <div className="flex flex-col border-2 rounded-lg text-left p-4 my-4">
              <div
                onClick={() => toggleModal(key)}
                className="flex flex-col w-full">
                <div className={shiftStyle}>
                  <h2>Day:</h2>
                  <p>{allMonths[shiftMonth]} {shiftDay}, {shiftYear}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Start Date:</h2>
                  <p>{startDate.toLocaleTimeString()}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>End Date:</h2>
                  <p>{endDate.toLocaleTimeString()}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Employee:</h2>
                  <p>{getEmployeeName(shift.employee_id)}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Department:</h2>
                  <p>{getDepartmentName(shift.department_id)}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Status:</h2>
                  <p>{shift.status}</p>
                </div>
              </div>
              {modalState === key && <CompleteSwap firstShiftId={shiftId} secondShiftId={shift._id} departmentId={shift.department_id} requester_id={requester_id} requestee_id={shift.employee_id}/>}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
        }
}

function shiftIdCheck() {

  //Check if shiftId is valid (If Not Done, Server Side Request Forgery Happens)

  //If not, redirect to home page

}
