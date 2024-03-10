import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { NewFirstName: firstName, NewLastName: lastName, NewDepartment: department } = await request.json();
    await connectMongoDB();
    await Employee.findByIdAndUpdate(id, { firstName, lastName, department });
    return NextResponse.json({ message: "Employee updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const shift = await Employee.findOne({ _id: id });
    return NextResponse.json({ shift }, )
}