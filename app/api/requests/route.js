import connectMongoDB from "@/libs/mongodb";
import Request from "@/models/request";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { first_shift_id, second_shift_id, requester_employee_id, requestee_employee_id, department_id, status } = await request.json();
    await connectMongoDB();
    await Request.create({ first_shift_id, second_shift_id, requester_employee_id, requestee_employee_id, department_id, status });
    return NextResponse.json({ message: "Request created"}, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const requests = await Request.find();
    return NextResponse.json( requests );
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Request.findByIdAndDelete(id);
    return NextResponse.json({ message: "Request deleted" }, { status: 200 });
}