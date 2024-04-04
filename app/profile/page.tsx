'use client'
import SwapRequests from "@/components/SwapRequests";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { statfsSync } from "fs";
export default function App() {
  const router = useRouter();
  const { status, data: session } = useSession();

  // If the user is not authenticated get routed to main home page
  if (status === "unauthenticated"){
    router.push(`/login`);
  } else {
    return (
              <main className="min-h-screen justify-between p-5">
                <div className="flex flex-col justify-center text-center p-7">
                  <div className='flex flex-col rounded-md shadow-inner bg-blue-950 w-full'>
                  <h1 className="text-3xl py-5 font-semibold">{session?.user?.name}</h1>
                    <div className="flex justify-center px-16">
                      <img className="rounded-full" src={session?.user?.image ?? "../public/images/profile_icon.jpg"} alt={session?.user?.name + "'s Profile Photo"} width={450} height={450}/>
                    </div>
                      <div className="mt-3 p-4">
                        <p className="text-m p-2">Department Name</p>
                        <p className="text-m p-2">User ID</p>
                        <p className=' text-sm p-2'>{session?.user?.email}</p>
                      </div>
                  </div>
                  <SwapRequests/>
                </div>
              </main>
            );
  }
          }
    