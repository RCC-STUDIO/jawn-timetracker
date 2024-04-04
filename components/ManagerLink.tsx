'use client'
import React from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ManagerLink() {
    const router = useRouter();
    const { status, data: session } = useSession();


    return (
        status === "authenticated" && (
            <div className="m-5">
                <a href="/management"className="w-2/5 flex items-end justify-center border rounded-md text-xl border-blue-50 bg-blue-50 text-blue-950 p-5 px-2">
                    Management
                </a>
            </div>
        )
    );
}
