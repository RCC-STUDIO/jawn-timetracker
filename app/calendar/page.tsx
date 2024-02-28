const week = [
  "",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const fakeSchedule = [
  [
    "Ryan C.",
    "",
    "8:00 AM - 4:00 PM",
    "8:00 AM - 4:00 PM",
    "8:00 AM - 4:00 PM",
    "8:00 AM - 4:00 PM",
    "8:00 AM - 4:00 PM",
    "",
  ],
  [
    "Matthew S.",
    "",
    "9:00 AM - 5:00 PM",
    "9:00 AM - 5:00 PM",
    "9:00 AM - 5:00 PM",
    "9:00 AM - 5:00 PM",
    "9:00 AM - 5:00 PM",
    "",
  ],
  [
    "Ben R.",
    "",
    "10:00 AM - 6:00 PM",
    "10:00 AM - 6:00 PM",
    "10:00 AM - 6:00 PM",
    "",
    "",
    "",
  ],
  ["Cyril D.", "", "1:00 PM - 9:00 PM", "", "", "", "", ""],
  [
    "Gabriel L.",
    "12:00 PM - 8:00 PM",
    "12:00 PM - 8:00 PM",
    "12:00 PM - 8:00 PM",
    "",
    "",
    "",
    "",
  ],
];

export default function CalendarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col">
        <h1 className=" text-3xl underline p-10 text-center">Calendar</h1>
        <table className="bg-black table-auto overflow-scroll w-full p-1">
          <tbody className="">
            <tr className="">
              {week.map((index) => {
                return (
                  <td className="border font-bold text-center border-white text-xs p-1 px-2">
                    {index}
                  </td>
                );
              })}
            </tr>
            {fakeSchedule.map((jndex) => {
              return (
                <tr>
                  {jndex.map((kndex) => {
                    return (
                      <td className="border border-white text-xs p-1">
                        {kndex}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
