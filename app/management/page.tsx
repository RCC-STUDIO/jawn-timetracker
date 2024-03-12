"use client";

import ChangeEvent from "react";
import { useState } from "react";

const fakeDropsRequests = [
  ["Matthew", "March 30th", "Close"],
  ["Gabriel", "April 1st", "Open"],
  // ["Ben", "April 2nd", "Midday"],
];

const fakeSwapRequest = [
  "Cyril",
  "Ryan",
  "April 1st",
  "April 2nd",
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
      </div>

      <div className="flex flex-col items-center bg-blue-950 overflow-y-auto rounded-md p-2 h-50">
        <h2 className="">Drop Requests</h2>
        <div className="">
          {fakeDropsRequests.map((index, key) => (
            <div key={key} className="flex flex-row w-full">
              <div className="bg-blue-300 p-4 m-2 w-full rounded-md">
                <div className="flex flex-row p-4 justify-between">
                  <p>Name:</p>
                  <p>{index[0]}</p>
                </div>
                <div className="flex flex-row p-4 justify-between">
                  <p>Shift Date:</p>
                  <p>{index[1]}</p>
                </div>
                <div className="flex flex-row p-4 justify-between">
                  <p>Shift Time:</p>
                  <p>{index[2]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>Swap Requests</h2>
      <div></div>
    </main>
  );
}
