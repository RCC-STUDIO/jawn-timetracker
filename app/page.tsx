import ShiftList from "@/components/ShiftsList";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-10 px-5">
      <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
      <div className="flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
        <ShiftList/>
      </div>
    </main>
  );
}
