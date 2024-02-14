import NavBar from "@/components/NavBar"
import Modal from 'react-modal';
export default function Home() {
  
  const shiftStyle = "flex flex row justify-between";
  type Shift = {
    id: number,
    shiftType: string,
    dayOfWeek: string,
    department: string,
  }

  const shifts: Shift[] = [
    {
      id: 1,
      shiftType: "Close",
      dayOfWeek: "Monday",
      department: "Produce"
    },
    {
      id: 2,
      shiftType: "Midday",
      dayOfWeek: "Thursday",
      department: "Produce"
    },
    {
      id: 3,
      shiftType: "Open",
      dayOfWeek: "Saturday",
      department: "Produce"
    }
  ]

  return (
    
    <main className="flex flex-col items-center justify-between py-24 px-5">
      <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
      <div className="flex flex-col items-center bg-purple-950 w-full p-5 rounded-lg">
        {shifts.map((shift) => (
          <div className="flex flex-row border-2 rounded-lg w-full text-left p-4 m-2" key={shift.id}>
            <div className="flex flex-col w-full">
              <div className={shiftStyle}>
                  <h2>Type:</h2>
                  <p>{shift.shiftType}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Day Of Week:</h2>
                <p>{shift.dayOfWeek}</p>
              </div>
              <div className={shiftStyle}>
                <h2>Department:</h2>
                <p>{shift.department}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
