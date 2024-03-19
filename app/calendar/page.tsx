'use client'

import React, { useState } from 'react';

interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fakeSchedule: ScheduleEntry[] = [
  { name: "Ryan C.", days: [null, "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", null] },
  { name: "Matthew S.", days: [null, "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", null] },
  { name: "Ben R.", days: [null, "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", null, null, null] },
  { name: "Cyril D.", days: [null, "1:00 PM - 9:00 PM", null, null, null, null, null] },
  { name: "Gabriel L.", days: ["12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", null, null, null, null] },
];

const CalendarPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const renderDayDetails = (dayIndex: number) => {
    return (
      <div className="mt-4 bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold text-lg">Schedule for {weekDays[dayIndex]}:</h2>
        <ul>
          {fakeSchedule.map((entry, index) => (
            entry.days[dayIndex] ? <li key={index}>{entry.name}: {entry.days[dayIndex]}</li> : null
          ))}
        </ul>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-between p-5">
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
                <tr key={weekIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
};

export default CalendarPage;
