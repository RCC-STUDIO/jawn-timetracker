'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ShiftList from '@/components/ShiftsList';
import { set } from 'mongoose';
import { getShifts } from '@/libs/dbAccess';

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email;
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);

  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/api/auth/signin`);
  } else {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-10 px-5">
        <h1 className="p-5 font-bold text-2xl">My Shifts</h1>
        <div className="flex flex-col items-center bg-blue-950 w-full p-5 rounded-lg">
          <ShiftList email={userEmail}/>
        </div>
        
      </main>
    );
  }
}
