'use client'

import React, { useState, useEffect } from 'react';
import { getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarPage: React.FC = () => {
  const [employeeWorkDays, setEmployeeWorkDays] = useState<Record<string, boolean[]>>({});
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts(); 
        const tempEmployeeWorkDays: Record<string, boolean[]> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; }) => {
          const dayOfWeek = new Date(shift.startDate).getDay(); 
          const employeeName = "Employee Name"; 

          if (!tempEmployeeWorkDays[employeeName]) {
            tempEmployeeWorkDays[employeeName] = new Array(7).fill(false); 
          }
          tempEmployeeWorkDays[employeeName][dayOfWeek] = true; 
        });

        setEmployeeWorkDays(tempEmployeeWorkDays);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }

    fetchShifts();
  }, []);

  if (status === "unauthenticated") {
    router.push('/login');
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-5">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">Weekly Calendar</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Employee</th>
                {weekDays.map((day) => (
                  <th key={day} className="py-3 px-6 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(employeeWorkDays).map(([name, daysWorking], i) => (
                <tr key={name} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b dark:bg-gray-800 dark:border-gray-700`}>
                  <td className="py-4 px-6">{name}</td>
                  {daysWorking.map((working, index) => (
                    <td key={index} className="py-4 px-6 text-center">
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