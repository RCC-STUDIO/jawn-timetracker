import connectMongoDB from "@/libs/mongodb";
import Department from "@/models/department";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newDepartment: department } = await request.json();
    await connectMongoDB();
    await Department.findByIdAndUpdate(id, { department });
    return NextResponse.json({ message: "Department updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const department = await Department.findOne({ _id: id });
    return NextResponse.json( department )
}