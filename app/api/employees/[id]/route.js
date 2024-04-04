import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newFirstName: firstName, newLastName: lastName, newEmail: email, newDepartment_id: department_id, newIsManager: isManager } = await request.json();
    await connectMongoDB();
    await Employee.findByIdAndUpdate(id, { firstName, lastName, email, department_id, isManager });
    return NextResponse.json({ message: "Employee updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const employee = await Employee.findOne({ _id: id });
    return NextResponse.json( employee )
}