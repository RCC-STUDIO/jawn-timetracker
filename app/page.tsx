import ShiftList from '@/components/ShiftsList';

export default function Home() {  
  
  return (
    <main className="flex flex-col items-center justify-between py-10 px-5">
        <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
        <div className="flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
          <ShiftList />
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
