import React from 'react';

const week = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fakeSchedule = [
  ["Ryan C.", "", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", ""],
  ["Matthew S.", "", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", ""],
  ["Ben R.", "", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "", "", ""],
  ["Cyril D.", "", "1:00 PM - 9:00 PM", "", "", "", "", ""],
  ["Gabriel L.", "12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", "", "", "", ""],
];

const CalendarPage = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl underline p-10 text-center">Calendar</h1>
        <div className="overflow-x-auto overflow-y-auto m-5">
          <table className="w-full bg-blue-950">
            <tbody>
              <tr>
                {week.map((day, index) => (
                  <td key={index} className="border font-bold text-center border-white text-xs p-3 px-11">
                    <p>{day}</p>
                  </td>
                ))}
              </tr>
              {fakeSchedule.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border border-white text-xs p-3">
                      {cell}
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
