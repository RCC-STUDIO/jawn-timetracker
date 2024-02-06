import NavBar from "@/components/NavBar"
import Modal from 'react-modal';
export default function Home() {

  const openModal = () => {

  }
  
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
    
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="p-5">My Shifts</h1>
      <div className="flex flex-col items-center bg-slate-800 border-w w-1/2 p-5 rounded-lg">
        {shifts.map((shift) => (
          <div className="flex flex-row border-2 rounded-lg w-full text-left p-4 m-2" key={shift.id}>
            <div className="flex flex-col w-3/4"
            onChange={() => openModal()}>
              <h2>Type: {shift.shiftType}</h2>
              <p>Day Of Week: {shift.dayOfWeek}</p>
              <p>Department: {shift.department}</p>
            </div>
            <Modal>
              <div>
                <p>
                  testing
                </p>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </main>
  )
}
