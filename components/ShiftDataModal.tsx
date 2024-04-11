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


export default function ShiftDataModal({shiftData, deptName, employeeName}: { shiftData: Shift, deptName: string, employeeName: string }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950 bg-opacity-50">
        <h1 className="text-lg font-bold underline">DATE: {new Date(shiftData.startDate).toLocaleDateString()}</h1>
            <p>{new Date(shiftData.startDate).toLocaleTimeString()} - {new Date(shiftData.endDate).toLocaleTimeString()}</p>
            <p>Department: {deptName}</p>
            <p>Employee: {employeeName}</p>
        </div>
    )
}