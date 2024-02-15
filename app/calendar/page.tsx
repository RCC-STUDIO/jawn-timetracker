

const fakeSchedule = [
    ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ["Ryan C.", "", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", ""],
    ["Matthew S.", "", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", ""],
    ["Ben R.", "", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "", "", ""],
    ["Cyril D.", "", "1:00 PM - 9:00 PM", "", "", "", "", ""],
    ["Gabriel L.", "", "12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", "", "", "", ""]
]

export default function CalendarPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-col">
                <h1 className=" text-3xl underline p-10 text-center">Calendar</h1>
                <table className="table-auto overflow-scroll w-full p-1">
                    <tbody className="">
                        <tr className="">
                            {fakeSchedule[0].map((jndex) => {
                                return (
                                    <td className="border border-white text-xs p-1">{jndex}</td>
                                )
                            })}
                        </tr>
                        {fakeSchedule.map((index) => {
                            return (
                                index.map((jndex) => {
                                    <tr>
                                        
                                    </tr>
                                })
                            )
                        })}
                            
                    </tbody>
                </table>
            </div>
        </main>
    );
}