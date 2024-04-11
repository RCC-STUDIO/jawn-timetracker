"use client";
import React, { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { useSession } from "next-auth/react";
import router from "next/router";
import { getDepartments, getEmployees } from "@/libs/dbAccess";


export default function App() {
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email;
  const [employeeId, setEmployeeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    async function fetchShifts() {
      try {
        let employee_id = "";
        let department_id = "";
        // get all employees
        let employeeData = await getEmployees();
        setEmployees(employeeData);
        // find employee by matching the email
        for (let i = 0; i < employeeData.length; i++) {
          if (employeeData[i].email == userEmail) {
            employee_id = employeeData[i]._id;
            department_id = employeeData[i].department_id;
          }
        }
        setDepartmentId(department_id);
        setEmployeeId(employee_id);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail]);

  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/login`);
  } else {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center p-10">
        <h1 className="p-4 text-2xl font-bold underline">MANAGEMENT</h1>
        <form className="bg-blue-950 p-4 w-full rounded-md">
          <h1>Import Schedule</h1>
          <input title="file" type="file" className="" accept="csv"></input>
        </form>
        <Carousel employeeId={employeeId} departmentId={departmentId}/>
      </div>
      
    </main>
  );
  }
}
