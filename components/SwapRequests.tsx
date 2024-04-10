import React from "react";
import { useState, useEffect } from "react";
import SwapOptions from "./SwapOptions";
import { getRequest } from "@/libs/dbAccess";
import { setRequestMeta } from "next/dist/server/request-meta";

interface Request {
  firstShift_id: string;
  secondShift_id: string;
  requester_id: string;
  requestee_id: string;
  department_id: string;
  status: string;
}

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
  const [requests, setRequests] = useState<Request[]>([]);
  const toggleModal = (shiftId: number) => {
    // Toggle the modal state for the clicked shift
    setModalState((previous) => (previous === shiftId ? -1 : shiftId));
  };

  useEffect(() => {
    async function fetchShifts() {
      try {
        const shiftsData = await getRequest();
        // the user "65fb91a6733b75969216cb2d" is being used for testing purposes
        const userRequests = shiftsData.filter((request: Request) => request.requestee_id === "65fb91a6733b75969216cb2d");

        setRequests(userRequests);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchShifts();
  }, []);

  return (
    <div className="w-full bg-blue-950 p-5 mt-7 border rounded-md border-blue-950">
      <h2 className="text-center font-bold">SWAP REQUESTS</h2>
      {requests.map((request, key) => (
        <div className="bg-blue-100 border rounded-md m-3">
        <div onClick={() => toggleModal(key)} key={key} className={requestStyles}>
          <div className="">
            <div className={requestContentStyles}>
              <p>Employee:</p>
              <p>{request.requester_id}</p>
            </div>
            <div className={requestContentStyles}>
              <p>Theirs:</p>
              <div className="flex flex-col text-right">
                <p>{request.firstShift_id}</p>
                <p>TIME NOT FOUND</p>
              </div>
            </div>
            <div className={requestContentStyles}>
              <p>Yours:</p>
              <div className="flex flex-col text-right">
                <p>{request.secondShift_id}</p>
                <p>TIME NOT FOUND</p>
              </div>
            </div>
          </div>
        </div>
        {modalState === key && <SwapOptions shiftId={request.secondShift_id} />} {/* Render modal if modalState matches shift key */}
        </div>
      ))}
    </div>
  );
}
