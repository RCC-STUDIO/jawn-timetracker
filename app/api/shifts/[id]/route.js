import connectMongoDB from "@/libs/mongodb";
import Shift from "@/models/shift";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { NewStartDate: startDate, NewEndDate: endDate, NewEmployee: employee, NewDepartment: department } = await request.json();
    await connectMongoDB();
    await Shift.findByIdAndUpdate(id, { startDate, endDate, employee, department });
    return NextResponse.json({ message: "Shift updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const shift = await Shift.findOne({ _id: id });
    return NextResponse.json({ shift }, )
}