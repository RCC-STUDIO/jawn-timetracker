import React, { useState } from "react";
import ManagerOptions from "./ManagerOptions";
export default function Carousel() {
    const [modalState, setModalState] = useState(-1); // Initialize modal state with -1
    
    // STYLE CONSTANTS
    const requestStyles = "bg-blue-100 p-4 w-full items-center rounded-md text-black";
    const requestContentStyles = "flex flex-row justify-between font-bold"
    const buttonStyles = "bg-blue-100 text-black border rounded-md border-blue-100 p-4"

    // FOR TESTING PURPOSES
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
      
    const fakeSwapRequests = [
        ["Cyril", "Ryan", "April 1st", "April 2nd"],
        ["Cyril", "Ryan", "April 1st", "April 2nd"],
        ["Cyril", "Ryan", "April 1st", "April 2nd"],
        ["Cyril", "Ryan", "April 1st", "April 2nd"],
        ["Cyril", "Ryan", "April 1st", "April 2nd"],
        ["Cyril", "Ryan", "April 1st", "April 2nd"],
    ];

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
                            {fakeDropsRequests.map((index, key) => (
                            <div className="bg-blue-100 border rounded-md my-3">
                                <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
                                    <div className="">
                                        <div className={requestContentStyles}>
                                            <p>Name:</p>
                                            <p className="">{index[0]}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift Date:</p>
                                            <p>{index[1]}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift Time:</p>
                                            <p>{index[2]}</p>
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
                        {fakeSwapRequests.map((index, key) => (
                            <div className="bg-blue-100 border rounded-md my-3">
                                <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
                                    <div className="">
                                        <div className={requestContentStyles}>
                                            <p>Employee 1:</p>
                                            <p>{index[0]}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Employee 2:</p>
                                            <p>{index[1]}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift Date 1:</p>
                                            <p>{index[2]}</p>
                                        </div>
                                        <div className={requestContentStyles}>
                                            <p>Shift Date 2:</p>
                                            <p>{index[3]}</p>
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
