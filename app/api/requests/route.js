import connectMongoDB from "@/libs/mongodb";
import Request from "@/models/request";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { startDate, endDate, employee, department, status } = await request.json();
    await connectMongoDB();
    await Request.create({ startDate, endDate, employee, department, status });
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