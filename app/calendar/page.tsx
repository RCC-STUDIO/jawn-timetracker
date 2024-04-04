'use client'

import React, { useState, useEffect } from 'react';
import { getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

interface EmployeeNames {
  [key: string]: string;
}

const employeeNames: EmployeeNames = {
  // "employee_id": "Employee Name",
};

const CalendarPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<Record<number, { name: string; time: string }[]>>({});

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempSchedule: Record<number, { name: string; time: string }[]> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; employee_id: string | number; }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfMonth = startDate.getDate();
          const employeeName = employeeNames[shift.employee_id] || 'Unknown'; 
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;

          if (!tempSchedule[dayOfMonth]) {
            tempSchedule[dayOfMonth] = [];
          }
          tempSchedule[dayOfMonth].push({ name: employeeName, time });
        });

        setSchedule(tempSchedule);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);

  const renderDayDetails = (dayOfMonth: number) => {
    const date = new Date();
    const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dayIndex = (dayOfMonth + firstDayOfWeek - 1) % 7;

    return (
      <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
        <h2 className="font-bold text-lg">Schedule for {weekDays[dayIndex]} the {dayOfMonth}:</h2>
        <ul>
          {schedule[dayOfMonth]?.map((entry, index) => (
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
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

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





