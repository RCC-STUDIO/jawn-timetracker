import React, { useEffect, useState } from "react";
import { getRequests } from "@/libs/dbAccess";
import ManagerOptions from "./ManagerOptions";
export default function Carousel() {
    const [modalState, setModalState] = useState(-1); // Initialize modal state with -1
    const [dropRequests, setDropRequests] = useState<Request[]>([])
    const [swapRequests, setSwapRequests] = useState<Request[]>([])


    interface Request {
        first_shift_id: string,
        second_shift_id: string,
        requester_employee_id: string,
        requestee_employee_id: string, // can be null
        department_id: string,
        status: string
    }

    useEffect(() => {
        async function fetchRequests() {
          try {
            const shiftsData = await getRequests();
            // divi-up the requests based on the requestee id
            const dropRequests = shiftsData.filter((request: Request) => request.requestee_employee_id === null);
            const swapRequests = shiftsData.filter((request: Request) => request.requestee_employee_id !== null);
            setDropRequests(dropRequests);
            setSwapRequests(swapRequests);
          } catch (error) {
            console.error("Error fetching shifts:", error);
          }
        }
        fetchRequests();
      }, []);

    // STYLE CONSTANTS
    const requestStyles = "bg-blue-100 p-4 w-full items-center rounded-md text-black";
    const requestContentStyles = "flex flex-row justify-between font-bold"
    const buttonStyles = "bg-blue-100 text-black border rounded-md border-blue-100 p-4"
  
    // TOGGLE CONTROLS
    const [showDropRequests, setShowDropRequests] = useState(true);
    const [showSwapRequests, setShowSwapRequests] = useState(false);

    const toggleModal = (shiftId: number) => {
        // Toggle the modal state for the clicked shift
        setModalState((previous) => (previous === shiftId ? -1 : shiftId));
      };

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                <div className="my-5">
                    <button className={buttonStyles} onClick={() => { setShowDropRequests(true); setShowSwapRequests(false); }}>Drop Requests</button>
                    <button className={buttonStyles} onClick={() => { setShowDropRequests(false); setShowSwapRequests(true); }}>Swap Requests</button>
                </div>
                {showDropRequests && (
                    <div className="w-full bg-blue-950 p-5 border rounded-md border-blue-950">
                            <h2 className="text-center font-bold">DROP REQUESTS</h2>
                            {dropRequests.map((index, key) => (
                            <div key={key} className="bg-blue-100 border rounded-md my-3">
                                <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
                                    <div className="">
                                        <div className={requestContentStyles}>
                                            <p>Requester ID:</p>
                                            <p className="">{index.requester_employee_id}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift Date:</p>
                                            <p>{index.first_shift_id}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift Time:</p>
                                            <p>NO TIME STAMPED</p>
                                        </div>
                                    </div>
                                </div>
                                {modalState === key && <ManagerOptions/>} {/* Render modal if modalState matches shift key */}
                            </div>
                            
                        ))}
                    </div>
                )}
                {showSwapRequests && (
                    <div className="w-full bg-blue-950 p-5 border rounded-md border-blue-950">
                        <h2 className="text-center font-bold">SWAP REQUESTS</h2>
                        {swapRequests.map((request, key) => (
                            <div key={key} className="bg-blue-100 border rounded-md my-3">
                                <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
                                    <div className="">
                                        <div className={requestContentStyles}>
                                            <p>Requester:</p>
                                            <p>{request.requester_employee_id}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Requestee:</p>
                                            <p>{request.requestee_employee_id}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift ID 1:</p>
                                            <p>{request.first_shift_id}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift ID 2:</p>
                                            <p>{request.second_shift_id}</p>
                                        </div>
                                    </div>
                                </div>
                                {modalState === key && <ManagerOptions/>} {/* Render modal if modalState matches shift key */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
