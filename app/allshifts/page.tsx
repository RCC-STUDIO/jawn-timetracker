'use client'

import React from "react"
const fakeSchedule = [
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
    ["Matthew", "Monday the 15th", "4pm - 10pm"],
];

// STYLE CONSTANTS
const requestStyles = "bg-blue-100 p-4 w-full items-center rounded-md text-black";
const requestContentStyles = "flex flex-row justify-between font-bold"

export default function AllShifts() {
    return (
        <div className=" items-center text-center">
            <h1 className="text-2xl font-bold p-4">SELECT SHIFT TO SWAP</h1>
        <div className="border rounded-md bg-blue-950 p-4 m-4 border-blue-950">
            
            {fakeSchedule.map((index, key) => (
                <div className="bg-blue-100 border rounded-md my-3">
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
            </div>
            ))}
        </div>
        </div>
    )
}