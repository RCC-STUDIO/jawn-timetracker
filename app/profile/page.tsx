'use client'
import SwapRequests from "@/components/SwapRequests";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getDepartments, getEmployees } from "@/libs/dbAccess";

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

export default function App() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [department, setDepartment] = useState("");
  const [employee_id, setEmployee_id] = useState("");

  useEffect(() => {
    async function fetchShifts() {
      try {
        let employee_id = "";
        let department_name = "";
        // get all employees and departments
        let employees = await getEmployees();
        setEmployees(employees);
        let departments = await getDepartments();
        // find employee by matching the email
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email == userEmail) {
            employee_id = employees[i]._id;
            // find department by matching the department_id
            for (let j = 0; j < departments.length; j++) {
              if (departments[j]._id == employees[i].department_id) {
                department_name = departments[j].department;
                setDepartment(department_name);
              }
            }
          }
        }
        setEmployee_id(employee_id);
        setDepartment(department_name);
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
              <main className="min-h-screen justify-between p-5">
                <div className="flex flex-col justify-center text-center p-7">
                  <div className='flex flex-col rounded-md shadow-inner bg-blue-950 w-full'>
                  <h1 className="text-3xl py-5 font-semibold">{session?.user?.name}</h1>
                    <div className="flex justify-center px-16">
                      <img className="rounded-full" src={session?.user?.image ?? "../public/images/profile_icon.jpg"} alt={session?.user?.name + "'s Profile Photo"} width={450} height={450}/>
                    </div>
                      <div className="mt-3 p-4">
                        <p className="text-m p-2">Department: {department}</p>
                        <p className="text-m p-2">Employee ID: {employee_id}</p>
                        <p className=' text-sm p-2'>Email: {session?.user?.email}</p>
                      </div>
                  </div>
                  <SwapRequests/>
                </div>
              </main>
            );
  }
          }
    