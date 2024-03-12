'use client'

import React from "react"

const buttonStyle = "bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 p-3 mx-5"

export default function ShiftRequest() {
    return (
        <div className="flex flex-col bg-blue-950 p-4 border border-blue-950 rounded-md w-full items-center">
            <button className="bg-red-500 p-2 justify-end">Cancel</button>
            <h2 className="">Shift Options</h2>
            <div className="flex flex-row w-full">
                <button className={buttonStyle}>
                    Drop
                </button>
                <button className={buttonStyle}>
                    Swap
                </button>
            </div>
        </div>
    )
}