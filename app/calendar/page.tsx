'use client'

import React, { useState, useEffect } from 'react';
import { getShifts as fetchShifts } from '@/libs/dbAccess'; 
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 

const employeeNames = {
  // "employee_id": "Employee Name",,
};


async function getShifts() {
  return [
    { startDate: new Date('2024-04-03T09:00:00'), endDate: new Date('2024-04-03T17:00:00'), employee_id: '1' },
  ];
}

const CalendarPage: React.FC = () => {
  const [employeeSchedule, setEmployeeSchedule] = useState<Record<string, boolean[]>>({});
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    async function fetchShifts() {
      try {
        const employeeNames: Record<string, string> = {
          // "employee_id": "Employee Name",
        };

        const shiftsData = await getShifts();
        const tempEmployeeSchedule: Record<string, boolean[]> = {};

        shiftsData.forEach(({ startDate, employee_id }) => {
          const dayOfWeek = new Date(startDate).getDay(); 
          const employeeName = employeeNames[employee_id] || `Employee ${employee_id}`; 

          if (!tempEmployeeSchedule[employeeName]) {
            tempEmployeeSchedule[employeeName] = Array(7).fill(false); 
          }

          tempEmployeeSchedule[employeeName][dayOfWeek] = true;
        });

        setEmployeeSchedule(tempEmployeeSchedule);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    
    fetchShifts();
  }, []);

  if (status === "unauthenticated") {
    router.push(`/login`);
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-5">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">Employee Weekly Schedule</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">Employee</th>
                {weekDays.map(day => (
                  <th key={day} scope="col" className="py-3 px-1 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(employeeSchedule).map(([name, days], index) => (
                <tr key={name} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b dark:bg-gray-800 dark:border-gray-700`}>
                  <td className="py-4 px-6">{name}</td>
                  {days.map((working, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-6 text-center">
                      {working ? '👤' : ''} {}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default CalendarPage;
