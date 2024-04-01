import React from "react";
import { useState } from "react";
import SwapOptions from "./SwapOptions";
// STYLE CONSTANTS
const requestStyles =
  "bg-blue-100 p-3 w-full items-center rounded-md text-black";
const requestContentStyles = "flex flex-row justify-between font-bold";

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
      {fakeSwapRequests.map((index, key) => (
        <div className="bg-blue-100 border rounded-md m-3">
        <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
          <div className="">
            <div className={requestContentStyles}>
              <p>Employee:</p>
              <p>{index[0]}</p>
            </div>
            <div className={requestContentStyles}>
              <p>Theirs:</p>
              <div className="flex flex-col text-right">
                <p>{index[1]}</p>
                <p>{index[2]}</p>
              </div>
            </div>
            <div className={requestContentStyles}>
              <p>Yours:</p>
              <div className="flex flex-col text-right">
                <p>{index[3]}</p>
                <p>{index[4]}</p>
              </div>
            </div>
          </div>
        </div>
        {modalState === key && <SwapOptions/>} {/* Render modal if modalState matches shift key */}
        </div>
      ))}
    </div>
  );
}
