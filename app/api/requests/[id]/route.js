import connectMongoDB from "@/libs/mongodb";
import Request from "@/models/request";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newStartDate: startDate, newEndDate: endDate, newEmployee: employee, newDepartment: department, newStatus: status } = await request.json();
    await connectMongoDB();
    await Request.findByIdAndUpdate(id, { startDate, endDate, employee, department, status });
    return NextResponse.json({ message: "Shift updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const request = await Request.findOne({ _id: id });
    return NextResponse.json({ request })
}