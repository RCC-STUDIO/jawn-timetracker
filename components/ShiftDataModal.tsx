'use client'

import React from "react"

export default function ShiftDataModal({shiftData}: { shiftData: string }) {
    return (
        <div className="p-4 m-2 border border-blue-950 rounded-md bg-blue-950">
        <p>{shiftData}'s data</p>
    </div>
    )
}