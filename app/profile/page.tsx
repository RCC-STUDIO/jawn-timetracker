export default function App() {
    return (

              <main className="flex min-h-screen flex-col items-center justify-between p-5">
                <div className="flex flex-col justify-center align-center px-10 pt-5 w-11/12 text-center">
                  <div className='flex flex-col p-5 my-5 rounded-md shadow-inner bg-slate-700 w-1/2'>
                  <h1 className="text-4xl font-semibold">Profile</h1>
                    <div className="flex justify-center px-10 pt-10">
                      <img className="rounded-full" src="images/profile_icon.jpg" alt="Image" width={500} height={500}/>
                    </div>
                    <div className="mt-3 p-4">
                      <p className='text-2xl p-2 font-semibold'>Totaly Real Name</p>
                      <p className="text-xl p-2">Department Name</p>
                      <p className='text-xl p-2'>realemail@totalyrealmail.ca</p>
                    </div>
                    <div>
                      {/* User Information Stored in Data Base goes here */}
                    </div>
                  </div>
                </div>
              </main>
            );
          }
    