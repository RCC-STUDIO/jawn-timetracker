'use client'

import React, { useState, useEffect } from 'react';
import { getEmployees, getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fakeSchedule: ScheduleEntry[] = [
  { name: "Ryan C.", days: [null, "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", null] },
  { name: "Matthew S.", days: [null, "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", null] },
  { name: "Ben R.", days: [null, "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", null, null, null] },
  { name: "Cyril D.", days: [null, "1:00 PM - 9:00 PM", null, null, null, null, null] },
  { name: "Gabriel L.", days: ["12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", null, null, null, null] },
];

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

const CalendarPage: React.FC = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([])
  const [departmentId, setDepartmentId] = useState<string>("");


  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const employees = await getEmployees();
        let department_id = "";
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email == session?.user?.email) {
            department_id = employees[i].department_id;
          }
        }

        let departmentShifts = shiftsData.filter((shift: Shift) => shift.department_id == department_id);

        setDepartmentId(department_id);
        setEmployees(employees);
        setShifts(departmentShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail, departmentId]);

  function getEmployeeName(employee_id: string) {
    let employeeName = "";
    for (let i = 0; i < employees.length; i++) {
      if (employees[i]._id == employee_id) {
        employeeName = employees[i].firstName + " " + employees[i].lastName;
      }
    }
    return employeeName;
  }

  const renderDayDetails = (dayIndex: number) => {
    return (
      <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
        <h2 className="font-bold text-lg">Schedule for {weekDays[dayIndex]}:</h2>
        <ul>
          {shifts.map((shift, index) => {
            const startDate = new Date(shift.startDate);
            const endDate = new Date(shift.endDate);
            const shiftDay = startDate.getDate();
            if (shiftDay === dayIndex + 1) {
              return (
                <li key={index}>{getEmployeeName(shift.employee_id) }: {startDate.toLocaleTimeString()} - {endDate.toLocaleTimeString()}</li>
              );
            }
            return null;
          })}

        </ul>
      </div>
    );
  };


  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/login`);
  } else {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-5">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">Monthly Calendar</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {weekDays.map((day) => (
                  <th key={day} scope="col" className="py-3 px-1 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {}
              {Array.from({ length: 4 }).map((_, weekIndex) => (
                <tr key={weekIndex} className="bg-black border-b dark:bg-gray-800 dark:border-gray-700">
                  {weekDays.map((_, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-6 text-center cursor-pointer" onClick={() => setSelectedDay(dayIndex)}>
                      {}
                      {weekIndex * 7 + dayIndex + 1 <= 30 ? weekIndex * 7 + dayIndex + 1 : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedDay !== null && renderDayDetails(selectedDay)}
      </div>
    </main>
  );
                  }
};

export default CalendarPage;
