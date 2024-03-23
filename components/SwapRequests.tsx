import React from "react";
import { useState } from "react";
import ShiftRequest from "./ShiftRequest";
// STYLE CONSTANTS
const requestStyles =
  "bg-blue-100 p-5 my-5 w-full items-center rounded-md text-black";
const requestContentStyles = "flex flex-row justify-between font-bold";
const buttonStyles =
  "bg-blue-100 text-black border rounded-md border-blue-100 p-4";

const fakeSwapRequests = [
  ["Ryan", "Monday the 15th", "4pm - 10pm", "Tuesday the 16th", "9am - 3pm"],
  ["Ryan", "Monday the 15th", "4pm - 10pm", "Tuesday the 16th", "9am - 3pm"],
];

export default function SwapRequests() {
  const [modalState, setModalState] = useState(-1);
  const toggleModal = (shiftId: number) => {
    // Toggle the modal state for the clicked shift
    setModalState((previous) => (previous === shiftId ? -1 : shiftId));
  };

  return (
    <div className="w-full bg-blue-950 p-5 mt-7 border rounded-md border-blue-950">
      <h2 className="text-center font-bold">SWAP REQUESTS</h2>
            {/*the swap requests are going to go here. I haven't brought the code over yet*/}
    </div>
  );
}
