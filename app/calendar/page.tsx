'use client'
import React from "react";
import { useState } from "react";
import ShiftDataModal from "@/components/ShiftDataModal";
const employees = [
  "Ryan",
  "Matthew",
  "Gabriel",
  "Cyril",
  "Benjamin"
]
// this was used for visuals only, feel free to delete once database is hooked up
const fakeSchedule = [
  ["", 'Shift 1', 'Shift 2', 'Shift 3', 'Shift 4', 'Shift 5', ""], // 0th index (first row)
  ['Shift 6', 'Shift 7', 'Shift 8', 'Shift 9', "", "", ""], // 1st index (second row)
  ["", "", 'Shift 10', 'Shift 11', 'Shift 12', 'Shift 13', 'Shift 14'], // 2nd index (third row)
  ['Shift 15', "", "", "", 'Shift 16', "", ""], // 3rd index (fourth row)
  ['Shift 17', 'Shift 18', "", "", 'Shift 19', "", "Shift 20"], // 4th index (fifth row)
];

const weekDays = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]
export default function Calendar() {

  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState("")

  const modalDisplay = (shift: string) => {
    setModal(true)
    if (shift === "") {
      setModalData("no shift available")
    }
    else {
      setModalData(shift)
    }
  }
=======

import React, { useState, useEffect } from 'react';
import { getEmployees, getShifts } from '@/libs/dbAccess';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ScheduleEntry {
  name: string;
  days: (string | null)[];
}

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fakeSchedule: ScheduleEntry[] = [
  { name: "Ryan C.", days: [null, "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", "8:00 AM - 4:00 PM", null] },
  { name: "Matthew S.", days: [null, "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", "9:00 AM - 5:00 PM", null] },
  { name: "Ben R.", days: [null, "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", "10:00 AM - 6:00 PM", null, null, null] },
  { name: "Cyril D.", days: [null, "1:00 PM - 9:00 PM", null, null, null, null, null] },
  { name: "Gabriel L.", days: ["12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", "12:00 PM - 8:00 PM", null, null, null, null] },
];

interface Shift {
  startDate: string;
  endDate: string;
  employee_id: string;
  department_id: string;
  status: string;
  _id: string;
}

interface Employee {
  firstName: String,
  lastName: String,
  email: String,
  department_id: String,
  isManager: Boolean,
  _id: String
}

const CalendarPage: React.FC = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const userEmail = session?.user?.email
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([])
  const [departmentId, setDepartmentId] = useState<string>("");


  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getShifts();
        const employees = await getEmployees();
        let department_id = "";
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email == session?.user?.email) {
            department_id = employees[i].department_id;
          }
        }

        let departmentShifts = shiftsData.filter((shift: Shift) => shift.department_id == department_id);

        setDepartmentId(department_id);
        setEmployees(employees);
        setShifts(departmentShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, [userEmail, departmentId]);

  function getEmployeeName(employee_id: string) {
    let employeeName = "";
    for (let i = 0; i < employees.length; i++) {
      if (employees[i]._id == employee_id) {
        employeeName = employees[i].firstName + " " + employees[i].lastName;
      }
    }
    return employeeName;
  }

  const renderDayDetails = (dayIndex: number) => {
    return (
      <div className="mt-4 bg-blue-950 shadow-md rounded-lg p-4">
        <h2 className="font-bold text-lg">Schedule for {weekDays[dayIndex]}:</h2>
        <ul>
          {shifts.map((shift, index) => {
            const startDate = new Date(shift.startDate);
            const endDate = new Date(shift.endDate);
            const shiftDay = startDate.getDate();
            if (shiftDay === dayIndex + 1) {
              return (
                <li key={index}>{getEmployeeName(shift.employee_id) }: {startDate.toLocaleTimeString()} - {endDate.toLocaleTimeString()}</li>
              );
            }
            return null;
          })}

        </ul>
      </div>
    );
  };

