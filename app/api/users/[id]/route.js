import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    let { newUsername: username, newPassword: password, newEmail: email, newEmployee_id: employee_id } = await request.json();
    password = await hashPassword(password); // hash the password
    await connectMongoDB();
    await User.findByIdAndUpdate(id, { username, password, email, employee_id });
    return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user })
}