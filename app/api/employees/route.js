import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { firstName, lastName, department_id, isManager } = await request.json();
    await connectMongoDB();
    await Employee.create({ firstName, lastName, department_id, isManager });
    return NextResponse.json({ message: "Employee created"}, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const employees = await Employee.find();
    return NextResponse.json( employees );
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Employee.findByIdAndDelete(id);
    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
}