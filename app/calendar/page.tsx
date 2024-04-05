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
  const [employeesSchedule, setEmployeesSchedule] = useState<Record<string, boolean[]>>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [dailySchedule, setDailySchedule] = useState<{ name: string; time: string }[]>([]);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempEmployeesSchedule: Record<string, boolean[]> = {};
        const tempDailySchedule: Record<string, { name: string; time: string }[]> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfWeek = startDate.getDay();
          const employeeName = "Employee Name"; 

          if (!tempEmployeesSchedule[employeeName]) {
            tempEmployeesSchedule[employeeName] = new Array(7).fill(false);
          }
          tempEmployeesSchedule[employeeName][dayOfWeek] = true;

          const shiftKey = `${employeeName}-${dayOfWeek}`;
          if (!tempDailySchedule[shiftKey]) {
            tempDailySchedule[shiftKey] = [];
          }
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
          tempDailySchedule[shiftKey].push({ name: employeeName, time });
        });

        setEmployeesSchedule(tempEmployeesSchedule);

        if (selectedDay !== null && selectedEmployee) {
          const employeeShiftKey = `${selectedEmployee}-${selectedDay}`;
          setDailySchedule(tempDailySchedule[employeeShiftKey] || []);
        }
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }

    fetchShifts();
  }, [selectedDay, selectedEmployee]);

  const handleDayEmployeeClick = (employee: string, dayIndex: number) => {
    setSelectedDay(dayIndex);
    setSelectedEmployee(employee);
  };

  if (status === "unauthenticated") {
    router.push('/login');
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
              {Object.entries(employeesSchedule).map(([name, daysWorking]) => (
                <tr key={name} className="border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">{name}</td>
                  {daysWorking.map((working, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-6 text-center cursor-pointer" onClick={() => handleDayEmployeeClick(name, dayIndex)}>
                      {working ? '👤' : ''} {}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedDay !== null && selectedEmployee && (
          <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
            <h2 className="font-bold text-lg">Schedule for {selectedEmployee} on {weekDays[selectedDay]}:</h2>
            <ul>
              {dailySchedule.length > 0 ? (
                dailySchedule.map((entry, index) => (
                  <li key={index}>{entry.name}: {entry.time}</li>
                ))
              ) : (
                <li>No shifts for this day.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default CalendarPage;