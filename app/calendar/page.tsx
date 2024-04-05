'use client'

import React, { useState, useEffect } from 'react';
import { getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat", "Sun"];

const CalendarPage: React.FC = () => {
  const [selectedShift, setSelectedShift] = useState<{employeeId: number | string; dayOfWeek: number} | null>(null);
  const [schedule, setSchedule] = useState<Record<string, Record<number, { name: string; time: string }[]>>>({});

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempSchedule: Record<string, Record<number, { name: string; time: string }[]>> = {};

        shiftsData.forEach((shift: { startDate: string | number | Date; endDate: string | number | Date; employee_id: any; employee_name: any; }) => {
          const startDate = new Date(shift.startDate);
          const endDate = new Date(shift.endDate);
          const dayOfWeek = startDate.getDay(); 
          const time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
          const employeeId = shift.employee_id;

          if (!tempSchedule[employeeId]) {
            tempSchedule[employeeId] = {};
          }
          if (!tempSchedule[employeeId][dayOfWeek]) {
            tempSchedule[employeeId][dayOfWeek] = [];
          }
          tempSchedule[employeeId][dayOfWeek].push({ name: shift.employee_name, time });
        });

        setSchedule(tempSchedule);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);

  const renderDayDetails = (employeeId: string | number, dayOfWeek: number) => {
    const shifts = schedule[employeeId]?.[dayOfWeek];
    if (!shifts) return <div>No shifts for this day.</div>;
    return (
      <ul>
        {shifts.map((entry, index) => (
          <li key={index}>{entry.time}</li>
        ))}
      </ul>
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
        <h1 className="text-xl font-semibold mb-4 text-center">Weekly Calendar</h1>
        {Object.entries(schedule).map(([employeeId, days]) => (
          <div key={employeeId} className="w-full max-w-md mx-auto mb-4">
            <div className="font-bold">{days[parseInt(Object.keys(days)[0])][0].name}</div>
            <div className="flex justify-between">
              {weekDays.map((_, dayIndex) => {
                const isActiveDay = days[dayIndex] !== undefined;
                return (
                  <div key={dayIndex} className={`py-4 px-6 text-center cursor-pointer ${isActiveDay ? "text-blue-500" : "text-gray-500"}`} onClick={() => isActiveDay && setSelectedShift({employeeId, dayOfWeek: dayIndex})}>
                    {isActiveDay ? "🟢" : "⚪️"}
                  </div>
                );
              })}
            </div>
            {selectedShift && selectedShift.employeeId === employeeId && renderDayDetails(employeeId, selectedShift.dayOfWeek)}
          </div>
        ))}
      </main>
    );
  }
};

export default CalendarPage;