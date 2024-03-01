'use client'

import ChangeEvent from "react";
import { useState } from "react";

export default function App() {
  const [fileContent, setFileContent] = useState<string[][]>([])

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center p-10">
        <h1 className="p-4 text-2xl font-bold underline">MANAGEMENT</h1>
        <form className="bg-blue-950 p-4 w-5/8 rounded-md">
          <h1>Import Schedule</h1>
          <input type="file" className="" accept="csv"></input>
        </form>
      </div>
    </main>
  );
}
