import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newFirstName: firstName, newLastName: lastName, newDepartment: department, newIsManager: isManager } = await request.json();
    await connectMongoDB();
    await Employee.findByIdAndUpdate(id, { firstName, lastName, department, isManager });
    return NextResponse.json({ message: "Employee updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const Employee = await Employee.findOne({ _id: id });
    return NextResponse.json({ employee })
}