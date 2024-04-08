'use client'
import React from "react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

//Styles Variables
const buttonStyle = "bg-blue-950 hover:bg-blue-700 hover:text-blue-950 text-white p-5 w-full text-center"
const imageStyles = "w-10 h-10 m-auto rounded-full"


export default function NavBar() {
    const router = useRouter();
    const { status, data: session } = useSession();
 
    return (
        status === "authenticated" && 
        (<nav className="flex flex-row text-xl text-white w-full items-center text-center fixed bottom-0">
                <div className={buttonStyle}>
                    <a href="/calendar">
                        <img className={imageStyles} src="\images\calendar-button.png" alt="Calendar"/>
                    </a>
                </div>
                <div className={buttonStyle}>
                    <a href="/">
                        <img className={imageStyles} src="\images\home-button.png" alt="Home"/>
                    </a>
                </div>
                <div className={buttonStyle}>
                    <a href="/profile">
                        <img className={imageStyles} src={session?.user?.image ?? "../public/images/profile_icon.jpg"} alt="Profile"/>
                    </a>
                </div>
            
        </nav>)
    )
}