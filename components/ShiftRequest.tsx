import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as requestUtils from '../libs/dbAccess';
import { useEffect } from 'react';

const buttonStyle = 'bg-blue-100 text-blue-950 border rounded-md hover:bg-blue-950 hover:text-blue-100 px-6 py-3 mx-5';

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


//Creating a Shift Request - Ben
const ShiftRequest = ({shiftId}: { shiftId: string }) => {
  const [message, setMessage] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState("")
  const [department_id, setDepartmentId] = useState("")
  const [shift, setShift] = useState<Shift>()

  useEffect(() => {
    async function fetchEmployees() {
      try {
        let employees = await requestUtils.getEmployees();
        setEmployees(employees);
        let shift = await requestUtils.getShift({shiftId});
        let employeeId = shift.employee_id;
        let department_id = shift.department_id;
        setEmployeeId(employeeId);
        setDepartmentId(department_id);
        setShift(shift);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    }
    fetchEmployees();
  }, []);

  //Use Params to send the shiftId to allshifts/page.tsx
  const router = useRouter();
  //Method for routing to allshifts page - Ryan
  const navigateTo = () => {
    // this will be used for the swap request logic later - Matt
    
    const path:string = `/allshifts:${shiftId}`;
    router.push(path);
  }

  //Method for dropping a shift
  const dropShift = async () => {
    try {
      let datEmployeeId = shift.employee_id;
      // Prepare the request data
      const requestShiftId = {
        first_shift_id: shiftId,
        second_shift_id: null,
        requester_employee_id: datEmployeeId, // Fetch this from your state or props
        requestee_employee_id: null,
        department_id: department_id, // Fetch this from your state or props
        status: 'pending',
      };
      // Call the createRequest function
      await requestUtils.createRequest(requestShiftId);

      // Handle the response
      setMessage('Shift request has been sent!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit shift request');
    }
  }

//Method for employee one sending a request to swap a shift with employee two.
  const swapShift = async () => {
    try {
      // Prepare the request data
      const requestShiftId = {
        newFirstShiftId: shiftId,
        newSecondShiftId: null,
        newRequesterEmployeeId: 'employee_id', // Fetch this from your state or props
        newRequesteeEmployeeId: null,
        newDepartmentId: 'department_id', // Fetch this from your state or props
        status: 'pending',
      };
      // Call the createRequest function
      await requestUtils.createRequest(requestShiftId);

      // Handle the response
      setMessage('Shift request has been sent!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit shift request');
    }
  };

  return (
    <div className="modal-overlay flex flex-col bg-blue-950 items-center mb-4">
      <h2 className="p-3 text-lg font-bold">Shift Options</h2>
      <div className="flex flex-row justify-center w-full">
        <button onClick={dropShift} className={buttonStyle}>Drop</button>
        <button onClick={navigateTo} className={buttonStyle}>Swap</button>
      </div>
      {message && (<p className='pt-4 text-lg'>{message}</p>)}
    </div>
  );
};

export default ShiftRequest;

//href="/allshifts"