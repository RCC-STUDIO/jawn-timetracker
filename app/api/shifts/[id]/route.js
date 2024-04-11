import connectMongoDB from "@/libs/mongodb";
import Shift from "@/models/shift";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newStartDate: startDate, newEndDate: endDate, newEmployee_id: employee_id, newDepartment: department_id, newStatus: status } = await request.json();
    await connectMongoDB();
    await Shift.findByIdAndUpdate(id, { startDate, endDate, employee_id, department_id, status });
    return NextResponse.json({ message: "Shift updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const shift = await Shift.findOne({ _id: id });
    return NextResponse.json( shift )
}