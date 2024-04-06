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

  return (
  <main className="min-h-screen w-full">
    <div className="">
    <div className="overflow-auto">
      <table className="border border-white">
        <tbody className="border border-white m-4">
          <tr>
          <td className="border border-white text-center bg-blue-950 font-bold py-2 px-3"></td>
            {weekDays.map((day, index) => (
              <td className="border border-white text-center bg-blue-950 font-bold py-2 px-3">{day} {index + 10}</td>
            ))}
          </tr>
          {fakeSchedule.map((shift, index) => (
            <tr className="border border-white">
              <td className="border border-white p-1 bg-blue-950">{employees[index]}</td> 
              {shift.map((data, index) => (
                <td onClick={() => modalDisplay(data)} className="border border-blue-950 p-1 bg-blue-50 text-black text-center px-5">{data ? "🟢" : ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {modal === true && (
        <ShiftDataModal shiftData={modalData}/>
      )}
      </div>
  </main>
  )
}