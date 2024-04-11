"use client";

import Shift from "@/models/shift";
import React from "react";

interface Shift {
  startDate: Date;
  endDate: Date;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

export default function ShiftDataModal({
  shiftData,
  deptName,
  employeeName,
}: {
  shiftData: Shift;
  deptName: string;
  employeeName: string;
}) {
  return (
      <div className=" rounded-md flex flex-col text-white bg-blue-950 py-5 px-9 text-2xl">
        <h1 className="font-bold underline mb-3">
          DATE: {new Date(shiftData.startDate).toLocaleDateString()}
        </h1>
        <p>
          {new Date(shiftData.startDate).toLocaleTimeString()} - {new Date(shiftData.endDate).toLocaleTimeString()}
        </p>
        <p>Department: {deptName}</p>
        <p>Employee: {employeeName}</p>
      </div>
  );
}
