import connectMongoDB from "@/libs/mongodb";
import Request from "@/models/request";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newFirst_shift_id: first_shift_id, newSecond_shift_id: second_shift_id, newRequesterEmployee_id: requester_employee_id, newRequesteeEmployee_id: requestee_employee_id, newDepartment_id: department_id, newStatus: status } = await request.json();
    await connectMongoDB();
    await Request.findByIdAndUpdate(id, { first_shift_id, second_shift_id, requester_employee_id, requestee_employee_id, department_id, status });
    return NextResponse.json({ message: "Shift updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    request = await Request.findOne({ _id: id });
    return NextResponse.json({ request })
}