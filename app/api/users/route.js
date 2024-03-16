import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(request) {
    const { username, password, email, employee_id } = await request.json();
    await connectMongoDB();
    await User.create({ username, password, email, employee_id });
    return NextResponse.json({ message: "User created"}, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json( users );
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}