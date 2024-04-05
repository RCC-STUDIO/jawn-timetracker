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

const employeeNames = {
  // "employee_id": "Employee Name",,
};

const CalendarPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<Record<number, { name: string; time: string }[]>>({});

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempSchedule: Record<number, { name: string; time: string }[]> = {};

        const employeeNames: { [key: string]: string } = {
          // "employee_id": "Employee Name",
        };

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; employee_id: string | number; }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfWeek = startDate.getDay(); // Use getDay() to determine the day of week
          const employeeName = employeeNames[shift.employee_id] || 'Unknown'; 
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;

          if (!tempSchedule[dayOfWeek]) {
            tempSchedule[dayOfWeek] = [];
          }
          tempSchedule[dayOfWeek].push({ name: employeeName, time });
        });

        setSchedule(tempSchedule);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);

  const renderDayDetails = (dayOfWeek: number) => {
    return (
      <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
        <h2 className="font-bold text-lg">Schedule for {weekDays[dayOfWeek]}:</h2>
        <ul>
          {schedule[dayOfWeek + 1]?.map((entry, index) => (
            <li key={index}>{entry.name}: {entry.time}</li>
          )) || <li>No one is scheduled to work this day.</li>}
        </ul>
      </div>
    );
  };

  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push(`/login`);
    return null;
  } else {
    return (
      <main className="flex flex-col min-h-screen items-center justify-between p-5">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-xl font-semibold mb-4 text-center">Weekly Calendar</h1>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {weekDays.map((day, index) => (
                    <th key={day} scope="col" className="py-3 px-1 text-center">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-black border-b dark:bg-gray-800 dark:border-gray-700">
                  {weekDays.map((_, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-6 text-center cursor-pointer" onClick={() => setSelectedDay(dayIndex)}>
                      {dayIndex + 1}
                    </td>
                  ))}
                </tr>
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





