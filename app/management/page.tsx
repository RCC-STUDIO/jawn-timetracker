"use client";
import React from "react";
import Carousel from "@/components/Carousel";
import { useSession } from "next-auth/react";
import router from "next/router";


export default function App() {
  const { status, data: session } = useSession();

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
          <input title="file" type="file" className="" accept="csv"></input>
        </form>
        <Carousel/>
      </div>
      
    </main>
  );
  }
}
