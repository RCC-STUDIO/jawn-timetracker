'use client'
import { getEmployees, getShifts, getDepartments } from "@/libs/dbAccess";
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

export default function ShiftList(params: { email: any }) {
  const shiftStyle = "flex flex row justify-between";
  const [modalState, setModalState] = useState(-1);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

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
          if (employees[i].email == params.email) {
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
  }, [params.email]);

  const toggleModal = (key: number) => {
    setModalState((previous) => (previous === key ? -1 : key));
  };

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
            {modalState === key && <ShiftRequest shiftId={shift._id}/>}
          </div>
        </div>
      ))}
    </>
  );
}
