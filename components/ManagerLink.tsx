import React from "react";

export default function ManagerLink() {
    const tempState = false;

    return (
        tempState && (
            <div className="m-5">
                <a href="/management"className="w-2/5 flex items-end justify-center border rounded-md text-xl border-blue-50 bg-blue-50 text-blue-950 p-5 px-2">
                    Management
                </a>
            </div>
        )
    );
}
