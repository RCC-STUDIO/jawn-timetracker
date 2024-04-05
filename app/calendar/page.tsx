'use client'

import React, { useState, useEffect } from 'react';
import { getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];


const CalendarPage: React.FC = () => {
  const [schedule, setSchedule] = useState<Record<string, boolean[]>>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dailySchedule, setDailySchedule] = useState<{ name: string; time: string }[]>([]);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts(); 
        const employeeSchedule: Record<string, boolean[]> = {};
        const tempDailySchedule: Record<number, { name: string; time: string }[]> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfWeek = startDate.getDay();
          const employeeName = "Employee Name"; 
          
          if (!employeeSchedule[employeeName]) {
            employeeSchedule[employeeName] = new Array(7).fill(false);
          }
          employeeSchedule[employeeName][dayOfWeek] = true;

          if (!tempDailySchedule[dayOfWeek]) {
            tempDailySchedule[dayOfWeek] = [];
          }
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
          tempDailySchedule[dayOfWeek].push({ name: employeeName, time });
        });

        setSchedule(employeeSchedule);
        setDailySchedule(Object.entries(tempDailySchedule).reduce((acc, [key, value]) => {
          if (selectedDay === parseInt(key)) {
            return value;
          }
          return acc;
        }, [] as { name: string; time: string }[]));
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }

    fetchShifts();
  }, [selectedDay]);

  const handleDayClick = (dayIndex: number) => {
    setSelectedDay(dayIndex);
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
                {weekDays.map((day, index) => (
                  <th key={day} className="py-3 px-6 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(schedule).map(([name, daysWorking], i) => (
                <tr key={name} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b dark:bg-gray-800 dark:border-gray-700`}>
                  <td className="py-4 px-6">{name}</td>
                  {daysWorking.map((working, dayIndex) => (
                    <td key={dayIndex} className="py-4 px-6 text-center cursor-pointer" onClick={() => handleDayClick(dayIndex)}>
                      {working ? '👤' : ''} {}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedDay !== null && (
          <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
            <h2 className="font-bold text-lg">Schedule for {weekDays[selectedDay]}:</h2>
            <ul>
              {dailySchedule.map((entry, index) => (
                <li key={index}>{entry.name}: {entry.time}</li>
              )) || <li>No one is scheduled to work this day.</li>}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default CalendarPage;