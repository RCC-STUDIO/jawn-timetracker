'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getEmployees } from "@/libs/dbAccess";

interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    isManager: boolean;
}

export default function AsyncManagerLink() {
    const { status, data: session } = useSession();
    const userEmail = session?.user?.email;
    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const employees = await getEmployees();
                const employee = employees.find((employee: Employee) => employee.email === userEmail);
                if (employee?.isManager) {
                    setIsManager(true);
                } else {
                    setIsManager(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmployees();
    }, [userEmail]);


    return (
        status === "authenticated" && isManager && (
            <div className="m-5">
                <a href="/management"className="w-2/5 flex items-end justify-center border rounded-md text-xl border-blue-50 bg-blue-50 text-blue-950 p-5 px-2">
                    Management
                </a>
            </div>
        )
    );
}
