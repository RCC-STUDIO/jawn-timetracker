import ShiftRequest from "./modals/ShiftRequest";

const getShifts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/shifts', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export default async function ShiftList() {
    const shifts = await getShifts();
    const shiftStyle = "flex flex row justify-between";
    
    return (
      <main className="flex flex-col items-center justify-between py-10 px-5">
        <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
        <div className="flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
          {shifts.map((shift: any) => (
            <div className="flex flex-row border-2 rounded-lg w-full text-left p-4 m-2 hover:bg-white hover:border-blue-950 hover:text-blue-950" key={shift.id}>
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
                  <p>{shift.employee}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Department:</h2>
                  <p>{shift.department}</p>
                </div>
              </div>
            </div>
             
          ))}
        </div>
  
        {/* {modalState && (
          <div className="modal-overlay flex flex-col bg-blue-950 p-4 border border-blue-950 rounded-md w-full items-center m-2">
            <div className="flex justify-end w-full mb-2">
              <button onClick={() => setModalState(false)} className="bg-red-500 p-2 border rounded-lg border-red-500">Cancel</button>
            </div>
          <ShiftRequest/>
        </div> )
        } */}
      </main>
    )
  }
  