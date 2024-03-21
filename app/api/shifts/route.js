import connectMongoDB from "@/libs/mongodb";
import Shift from "@/models/shift";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { startDate, endDate, employee_id, department_id, status } = await request.json();
    await connectMongoDB();
    await Shift.create({ startDate, endDate, employee_id, department_id, status });
    return NextResponse.json({ message: "Shift created"}, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const shifts = await Shift.find();
    return NextResponse.json( shifts );
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Shift.findByIdAndDelete(id);
    return NextResponse.json({ message: "Shift deleted" }, { status: 200 });
}