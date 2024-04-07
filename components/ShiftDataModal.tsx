'use client'

import Shift from "@/models/shift";
import React from "react"
interface Shift {
    startDate: Date;
    endDate: Date;
    employee_id: string;
    department_id: string;
    status: string;
    _id: string;
  }



export default function ShiftDataModal({shiftData}: { shiftData: Shift }) {
    return (
        <div className="p-4 m-2 border border-blue-950 rounded-md bg-blue-950">
            <p>ID: {shiftData._id}</p>
            <p>Shift: {new Date(shiftData.startDate).toLocaleString()} - {new Date(shiftData.endDate).toLocaleString()}</p>
            <p>Department: {shiftData.department_id}</p>
            {/*this should be the name, if u can could u please fix this? */}
        </div>
    )
}