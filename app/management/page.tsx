"use client"; // This line is unnecessary and can be removed

import React, { ChangeEvent, useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrected import for useRouter
import Papa from "papaparse";
import { getEmployee, getDepartments } from "@/libs/dbAccess";
import { createShift } from "@/libs/dbAccess";

interface Employee {
  firstName: String,
  lastName: String,
  email: String,
  department_id: String,
  isManager: Boolean,
  _id: String
}

interface Shift {
  startDate: Date,
  endDate: Date,
  employee_id: String,
  department_id: String,
  status: String
}

interface Department {
  department: string,
  _id: String
}

export default function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const prepareSchedule = (parsedData: Array<String>) => {
    const parsedArray = parsedData.map((row: any) => {
      return Array.isArray(row) ? row.map(String) : [String(row)];
    });

    for (let index = 1; index < parsedArray.length; index++) {
      for (let jndex = 1; jndex < parsedArray.length; jndex + 2) { // thit takes care of the date
        let startDateValue = new Date(parsedArray[0][jndex] + parsedArray[index][jndex])
        let endDateValue = new Date(parsedArray[0][jndex] + parsedArray[index][jndex + 1])

        const shift: Shift = {
          startDate: startDateValue,
          endDate: endDateValue,
          employee_id: "",
          department_id: "",
          status: "working"
        }

        createShift(shift)
        // this should work?
      }
    }
  }

  const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event?.target?.files?.[0];
      if (!file) {
        throw new Error("No file selected");
      }
      else {
        const parsedResult = await new Promise<any>((resolve, reject) => {
          Papa.parse(file, {
            header: false,
            complete: (result) => resolve(result),
            error: (error) => reject(error),
          });
        });

        const parsedData = parsedResult?.data || []; // Get parsed data or empty array if not available

        prepareSchedule(parsedData)
        console.log("Parsed result:", parsedResult);
      }
      
    } catch (error) {
      console.error("Error parsing file:", error);
      setErrorMessage("Error parsing file. Please try again.");
    }
  };
  

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
  if (status === "unauthenticated") {
    router.push(`/login`);
    return null; // Return null here to avoid rendering anything else when redirecting
  } else {

    return (
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col items-center p-10">
          <h1 className="p-4 text-2xl font-bold underline">MANAGEMENT</h1>
          <form className="bg-blue-950 p-4 w-full rounded-md">
            <h1>Import Schedule</h1>
            <input
              onChange={fileHandler} // Corrected the event to onChange
              title="file"
              type="file"
              className=""
              accept=".csv" // Corrected accept attribute to specify the file type
            />
          </form>
          <Carousel />
          {errorMessage && <p className="text-white">{errorMessage}</p>} {/* Display error message if exists */}
        </div>
      </main>
    );
  }
}
