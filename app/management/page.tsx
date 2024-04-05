"use client";
import React from "react";
import Carousel from "@/components/Carousel";
import ChangeEvent from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
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
  const { status, data: session } = useSession();
  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // push this file content to the database
  };

  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/login`);
  } else {
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
}
