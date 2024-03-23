'use client'
import SwapRequests from "@/components/SwapRequests";
export default function App() {
    return (
              <main className="min-h-screen justify-between p-5">
                <div className="flex flex-col justify-center text-center p-7">
                  <div className='flex flex-col rounded-md shadow-inner bg-blue-950 w-full'>
                  <h1 className="text-3xl py-5 font-semibold">Username</h1>
                    <div className="flex justify-center px-16">
                      <img className="rounded-full" src="images/profile_icon.jpg" alt="Image" width={450} height={450}/>
                    </div>
                      <div className="mt-3 p-4">
                        <p className="text-m p-2">Department Name</p>
                        <p className="text-m p-2">User ID</p>
                        <p className=' text-sm p-2'>email@address.com</p>
                      </div>
                  </div>
                  <SwapRequests/>
                </div>
              </main>
            );
          }
    