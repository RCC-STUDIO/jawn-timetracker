import { getShifts } from "@/libs/dbAccess";

export default async function ShiftList() {
    const shiftStyle = "flex flex row justify-between";
    
    return (
      <>
        {await getShifts().then(shifts => (
          shifts.map((shift: any) => (
            <div className="flex flex-row border-2 rounded-lg w-full text-left p-4 m-2 hover:bg-white hover:border-blue-950 hover:text-blue-950" key={shift._id}>
              <div className="flex flex-col w-full">
                <div className={shiftStyle}>
                  <h2>Start Date:</h2>
                  <p>{shift.startDate}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>End Date:</h2>
                  <p>{shift.endDate}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Employee:</h2>
                  <p>{shift.employee_id}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Department:</h2>
                  <p>{shift.department_id}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Status:</h2>
                  <p>{shift.status}</p>
                </div>
              </div>
            </div>
          ))
        ))}
      </>
    )
  }
  