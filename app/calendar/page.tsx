'use client'
import React from "react";
import { useState, useEffect} from "react";
import ShiftDataModal from "@/components/ShiftDataModal";
import { getShifts, getDepartments, getEmployees } from "@/libs/dbAccess";
import { useSession } from "next-auth/react";
import Employee from "@/models/employee";

// this was used for visuals only, feel free to delete once database is hooked up
const fakeSchedule = [
  ["", 'Shift 1', 'Shift 2', 'Shift 3', 'Shift 4', 'Shift 5', ""], // 0th index (first row)
  ['Shift 6', 'Shift 7', 'Shift 8', 'Shift 9', "", "", ""], // 1st index (second row)
  ["", "", 'Shift 10', 'Shift 11', 'Shift 12', 'Shift 13', 'Shift 14'], // 2nd index (third row)
  ['Shift 15', "", "", "", 'Shift 16', "", ""], // 3rd index (fourth row)
  ['Shift 17', 'Shift 18', "", "", 'Shift 19', "", "Shift 20"], // 4th index (fifth row)
];

interface Shift {
  startDate: Date;
  endDate: Date;
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

export default function Calendar() {
  const { status, data: session } = useSession();
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState<Shift>()
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const weekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]
  const userEmail = session?.user?.email;

  useEffect(() => {
    async function fetchShifts() {
      try {
        let employee_id = "";
        const shiftsData = await getShifts();
        // get all employees and departments
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

        const userShifts = shiftsData.filter((shift: Shift) => shift.employee_id == employee_id);

        setShifts(userShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail]);

  const modalDisplay = (shift: Shift) => {
    setModal(true)
    setModalData(shift)
    
  }

  return (
  <main className="min-h-screen w-full">
    <div className="">
    <div className="overflow-auto">
      <table className="border border-white">
        <tbody className="border border-white m-4">
          <tr>
          <td className="border border-white text-center bg-blue-950 font-bold py-2 px-3"></td>
            {weekDays.map((day, index) => (
              <td className="border border-white text-center bg-blue-950 font-bold py-2 px-3">{day} {index + 10}</td>
            ))}
          </tr>
          {fakeSchedule.map((shift, index) => (
            <tr className="border border-white">
              <td className="border border-white p-1 bg-blue-950">employee name</td> 
              {shifts.map((data, index) => (
                <td onClick={() => modalDisplay(data)} className="border border-blue-950 p-1 bg-blue-50 text-black text-center px-5">{data ? "🟢" : ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {modal === true && (
        <ShiftDataModal shiftData={modalData}/>
      )}
      </div>
  </main>
  )
}