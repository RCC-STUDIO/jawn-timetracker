'use client'
import React from "react";
import { useState, useEffect} from "react";
import ShiftDataModal from "@/components/ShiftDataModal";
import { getShifts, getDepartments, getEmployees } from "@/libs/dbAccess";
import { useSession } from "next-auth/react";
import Employee from "@/models/employee";

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
  // MODAL RELATED
  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState<Shift>()
  const [employeeName, setEmployeeName] = useState("")
  const [department, setDepartment] = useState("")

  // DATABASE RELATED
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentName, setDepartmentName] = useState("");
  
  const weekDays = ["Sun. 31", "Mon. 1", "Tue. 2", "Wed. 3", "Thu. 4", "Fri. 5", "Sat. 6"]
  const userEmail = session?.user?.email;

  const emptyShift: Shift = {
    startDate: new Date(),
    endDate: new Date(),
    employee_id: "",
    department_id: "",
    status: "",
    _id: ""
  };

  useEffect(() => {
    async function fetchShifts() {
      try {
        // get all shifts
        const shiftsData = await getShifts();
        const employees = await getEmployees();
        const departments = await getDepartments();

        let department_id = "";
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email === userEmail) {
            department_id = employees[i].department_id;
          }
        }
        
        for (let i = 0; i < departments.length; i++) {
          if (departments[i]._id === department_id) {
            setDepartmentName(departments[i].department);
          }
        }
        setShifts(shiftsData);
        setEmployees(employees);     
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail, session?.user?.email]);

  const modalDisplay = (shift: Shift, dept: string, employee: string) => {
    setModal(true)
    setModalData(shift)
    setDepartment(dept)
    setEmployeeName(employee)
    
  }

  return (
  <main className="min-h-screen w-full">
    <div className="text-white">
    <div className="overflow-auto">
      <table className="border border-white">
        <tbody className="border border-white m-4">
          <tr>
          <td className="border border-white text-center bg-blue-950 font-bold py-2 px-3"></td>
            {weekDays.map((day, index) => (
              <td key={index} className="border border-white text-center bg-blue-950 font-bold py-2 px-3">{day}</td>
            ))}
          </tr>
          {employees.map((employee, index) => (
            <tr key={index} className="border border-white">
              <td key={index} className="border border-white p-1 bg-blue-950">{employee.firstName} {employee.lastName}</td>
              {weekDays.map((day, index) => {
                const userShifts = shifts.filter((shift) => shift.employee_id === employee._id)
                const weekdayShifts = userShifts.filter((shift) => new Date(shift.startDate).getDay() === index)
                if (weekdayShifts.length > 0) {
                  return (
                    <td key={index} onClick={() => modalDisplay(weekdayShifts[0], departmentName, employee.firstName + " " + employee.lastName)} className="border border-blue-950 p-1 bg-blue-50 text-black text-center px-5">{weekdayShifts[0]._id ? "🟢" : ""}</td>
                  )
                } else {
                  return (
                    <td key={index} className="border border-blue-950 p-1 bg-blue-50 text-black text-center px-5"></td>
                  )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {modal === true && (
      <div className="bg-red-500">
        <ShiftDataModal shiftData={modalData ? modalData : emptyShift} deptName={department} employeeName={employeeName}/>
      </div>
      )}
      </div>
  </main>
  )
}