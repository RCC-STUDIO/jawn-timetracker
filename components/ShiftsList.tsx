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
                  <p>{shift.employee}</p>
                </div>
                <div className={shiftStyle}>
                  <h2>Department:</h2>
                  <p>{shift.department}</p>
                </div>
              </div>
            </div>
          ))
        ))}
      </>
    )
  }
  