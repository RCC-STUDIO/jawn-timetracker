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
  const [employeeShiftDetails, setEmployeeShiftDetails] = useState<Record<string, { name: string; time: string }[]>>({});
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempEmployeesSchedule: Record<string, boolean[]> = {};
        const tempEmployeeShiftDetails: Record<string, { name: string; time: string }[]> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; employeeName: string }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfWeek = startDate.getDay();
          const { employeeName } = shift; 

          if (!tempEmployeesSchedule[employeeName]) {
            tempEmployeesSchedule[employeeName] = new Array(7).fill(false);
          }
          tempEmployeesSchedule[employeeName][dayOfWeek] = true;

          const shiftKey = `${employeeName}-${dayOfWeek}`;
          if (!tempEmployeeShiftDetails[shiftKey]) {
            tempEmployeeShiftDetails[shiftKey] = [];
          }
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
          tempEmployeeShiftDetails[shiftKey].push({ name: employeeName, time });
        });

        setEmployeesSchedule(tempEmployeesSchedule);
        setEmployeeShiftDetails(tempEmployeeShiftDetails);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }

    fetchShifts();
  }, []);

  const handleDayClick = (employee: string, dayIndex: number) => {
    const employeeShiftKey = `${employee}-${dayIndex}`;
    const dailySchedule = employeeShiftDetails[employeeShiftKey] || [];
    setEmployeeShiftDetails({ ...employeeShiftDetails, [employeeShiftKey]: dailySchedule });
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
                <React.Fragment key={name}>
                  <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-4 px-6">{name}</td>
                    {daysWorking.map((working, dayIndex) => (
                      <td key={dayIndex} className="py-4 px-6 text-center cursor-pointer" onClick={() => handleDayClick(name, dayIndex)}>
                        {working ? '👤' : ''}
                      </td>
                    ))}
                  </tr>
                  {}
                  {daysWorking.map((working, dayIndex) => (
                    working ? (
                      <tr key={`${name}-${dayIndex}-details`} className="border-b dark:bg-gray-700 dark:border-gray-700">
                        <td className="py-4 px-6 text-center" colSpan={8}>
                          <ul>
                            {(employeeShiftDetails[`${name}-${dayIndex}`] || []).map((entry, index) => (
                              <li key={index}>{entry.name}: {entry.time}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ) : null
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default CalendarPage;