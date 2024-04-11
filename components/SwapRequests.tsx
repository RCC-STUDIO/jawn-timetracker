import React from "react";
import { useState, useEffect } from "react";
import SwapOptions from "./SwapOptions";
import { getRequests } from "@/libs/dbAccess";

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

export default function SwapRequests({ employeeId, requestData }: { employeeId: string, requestData: Request[]}) {
  const [modalState, setModalState] = useState(-1);
  const [requests, setRequests] = useState<Request[]>([]);
  const toggleModal = (shiftId: number) => {
    // Toggle the modal state for the clicked shift
    setModalState((previous) => (previous === shiftId ? -1 : shiftId));
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        const requests = requestData;
        // the user "65fb91a6733b75969216cb2d" is being used for testing purposes
        const userRequests = requests.filter((request: Request) => request.requestee_id === employeeId);

        setRequests(userRequests);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchRequests();
  }, []);

  return (
    <div className="w-full bg-blue-950 p-5 mt-7 border rounded-md border-blue-950">
      <h2 className="text-center font-bold">SWAP REQUESTS</h2>
      {requests.map((request, key) => (
        <div key={key} className="bg-blue-100 border rounded-md m-3">
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
        {modalState === key && <SwapOptions/>} {/* Render modal if modalState matches shift key */}
        </div>
      ))}
    </div>
  );
}
