'use client'
import { useSession } from 'next-auth/react'
import React from 'react';
import { useRouter } from 'next/navigation';
import ShiftList from '@/components/ShiftsList';

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email;
  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/api/auth/signin`);
  } else {
    return (
      <main className="flex flex-col items-center py-10 px-5 max-h-screen">
        <h1 className="p-5 font-bold text-2xl text-white">My Shifts</h1>
        <div className="justify-between flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
          <ShiftList email={userEmail}/>
        </div>
        
      </main>
    );
  }
}
