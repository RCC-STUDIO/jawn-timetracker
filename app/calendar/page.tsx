'use client'

import React, { useState, useEffect } from 'react';
import { getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarPage: React.FC = () => {
  const [shiftsByEmployee, setShiftsByEmployee] = useState<Record<string, { [key: number]: string[] }>>({});
  const [selectedShift, setSelectedShift] = useState<{ employee: string; day: number } | null>(null);
  const { status } = useSession();

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempShifts: Record<string, { [key: number]: string[] }> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; employeeName: string }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfWeek = startDate.getDay();
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;

          tempShifts[shift.employeeName] = tempShifts[shift.employeeName] || {};
          tempShifts[shift.employeeName][dayOfWeek] = tempShifts[shift.employeeName][dayOfWeek] || [];
          tempShifts[shift.employeeName][dayOfWeek].push(time);
        });

        setShiftsByEmployee(tempShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }

    fetchShifts();
  }, []);

  const handleDayClick = (employee: string, day: number) => {
    setSelectedShift({ employee, day });
  };

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-5">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">Employee Weekly Schedule</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Employee</th>
                {weekDays.map(day => (
                  <th key={day} className="py-3 px-6 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(shiftsByEmployee).map(([employeeName, days]) => (
                <tr key={employeeName}>
                  <td className="py-4 px-6">{employeeName}</td>
                  {weekDays.map((_, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-6 text-center">
                      {days[dayIndex] ? (
                        <button onClick={() => handleDayClick(employeeName, dayIndex)}>{}👤</button>
                      ) : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedShift && shiftsByEmployee[selectedShift.employee][selectedShift.day] && (
          <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
            <h2 className="font-bold text-lg">Shifts for {selectedShift.employee} on {weekDays[selectedShift.day]}:</h2>
            <ul>
              {shiftsByEmployee[selectedShift.employee][selectedShift.day].map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default CalendarPage;