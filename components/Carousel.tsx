import React, { useState } from "react";

export default function Carousel() {
    // STYLE CONSTANTS
    const requestStyles = "bg-blue-100 p-5 my-5 w-full items-center rounded-md text-black";
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
                            <div key={key} className={requestStyles}>
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
                        ))}
                        
                    </div>
                )}
                {showSwapRequests && (
                    <div className="w-full bg-blue-950 p-5 border rounded-md border-blue-950">
                        <h2 className="text-center font-bold">SWAP REQUESTS</h2>
                        {fakeSwapRequests.map((index, key) => (
                            <div key={key} className={requestStyles}>
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
