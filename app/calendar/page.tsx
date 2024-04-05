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
  const [schedule, setSchedule] = useState<Record<string, boolean[]>>({});

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const tempSchedule: Record<string, boolean[]> = {};

        shiftsData.forEach((shift: { startDate: string; endDate: string; employee_id: string; }) => {
          const startDate = new Date(shift.startDate);
          const dayOfWeek = startDate.getDay() - 1; // Adjust for weekDays array indexing (Mon = 0)
          const employeeName = shift.employee_id; // Assume this is name for simplicity, replace with actual name mapping logic

          if (!tempSchedule[employeeName]) {
            tempSchedule[employeeName] = new Array(7).fill(false); // Initialize all days to false (not working)
          }
          tempSchedule[employeeName][dayOfWeek] = true; // Set true for the days employee is working
        });

        setSchedule(tempSchedule);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);

  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push(`/login`);
    return null;
  } else {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center p-5">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold mb-4 text-center">Weekly Calendar</h1>
          <div className="overflow-x-auto">
            <table className="table-fixed w-full text-sm text-left text-gray-500">
              <thead>
                <tr>
                  <th className="w-1/4 px-4 py-2">Employee</th>
                  {weekDays.map(day => (
                    <th key={day} className="px-4 py-2 text-center">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(schedule).map(([employeeName, days]) => (
                  <tr key={employeeName}>
                    <td className="border px-4 py-2">{employeeName}</td>
                    {days.map((working, index) => (
                      <td key={index} className="border px-4 py-2 text-center">
                        {working ? '🗓️' : ''}
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
  }
};

export default CalendarPage;





