"use client";
import SwapRequests from "@/components/SwapRequests";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getDepartments, getEmployees, getRequests } from "@/libs/dbAccess";
import Image from "next/image";

interface Employee {
  firstName: String;
  lastName: String;
  email: String;
  department_id: String;
  isManager: Boolean;
  _id: String;
}

interface Request {
  firstShift_id: String;
  secondShift_id: String;
  requester_id: String;
  requestee_id: String;
  department_id: String;
  status: String;
}

export default function App() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    async function fetchShifts() {
      try {
        let employee_id = "";
        let employee_name = "";
        let department_name = "";
        // get all employees and departments
        let employees = await getEmployees();
        setEmployees(employees);
        let departments = await getDepartments();
        let requests = await getRequests();
        // find employee by matching the email
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email == userEmail) {
            employee_id = employees[i]._id;
            employee_name =
              employees[i].firstName + " " + employees[i].lastName;
            // find department by matching the department_id
            for (let j = 0; j < departments.length; j++) {
              if (departments[j]._id == employees[i].department_id) {
                department_name = departments[j].department;
                setDepartment(department_name);
              }
            }
          }
        }
        setRequests(requests);
        setEmployeeId(employee_id);
        setEmployeeName(employee_name);
        setDepartment(department_name);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail, employeeId]);

  const navigateToSignOut = () => {
    //Route to SignOut Page
    router.push(`/api/auth/signout`);
  };
  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated") {
    router.push(`/login`);
  } else {
    return (
      <main className="min-h-screen justify-between p-5 text-white">
        <div className="flex flex-col justify-center text-center p-7">
          <div className="flex flex-col rounded-md shadow-inner bg-blue-950 w-full">
            <h1 className="text-3xl py-5 font-semibold">{employeeName}</h1>
            <div className="flex justify-center px-16 pt-5">
              {session?.user?.image && (
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  alt="User Profile Image"
                  width={500}
                  height={500}
                  quality={100}
                />
              )}{" "}
            </div>
            <div className="mt-3 p-4">
              <p className="text-m p-2">Department: {department}</p>
              <p className="text-m p-2">Employee ID: {employeeId}</p>
              <p className=" text-sm p-2">Email: {session?.user?.email}</p>
              <button
                className="bg-blue-50 text-blue-950 mt-3 p-3 rounded-md w-full"
                onClick={navigateToSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
          <SwapRequests employeeId={employeeId}/>
        </div>
      </main>
    );
  }
}
