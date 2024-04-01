"use client";

import Carousel from "@/components/Carousel";
import ChangeEvent from "react";
import { useState } from "react";

const fakeDropsRequests = [
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
  ["Matthew", "Monday the 15th", "4pm - 10pm"],
];

const fakeSwapRequest = [
  ["Cyril", "Ryan", "April 1st", "April 2nd"],
  ["Cyril", "Ryan", "April 1st", "April 2nd"],
  ["Cyril", "Ryan", "April 1st", "April 2nd"],
  ["Cyril", "Ryan", "April 1st", "April 2nd"],
  ["Cyril", "Ryan", "April 1st", "April 2nd"],
  ["Cyril", "Ryan", "April 1st", "April 2nd"],


];

export default function App() {
  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // push this file content to the database
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center p-10">
        <h1 className="p-4 text-2xl font-bold underline">MANAGEMENT</h1>
        <form className="bg-blue-950 p-4 w-full rounded-md">
          <h1>Import Schedule</h1>
          <input type="file" className="" accept="csv"></input>
        </form>
        <Carousel/>
      </div>
      
    </main>
  );
}
