'use client'
import React from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"

//Styles Variables
const buttonStyle = "bg-blue-950 hover:bg-blue-700 hover:text-blue-950 text-white p-5 w-full text-center"
const imageStyles = "w-10 h-10 m-auto rounded-full"


export default function NavBar() {
    const { status, data: session } = useSession();
 
    return (
        status === "authenticated" && 
        (<nav className="flex flex-row text-xl text-white w-full items-center text-center fixed bottom-0">
                <div className={buttonStyle}>
                    <a href="/calendar">
                        <Image className={imageStyles} src="\images\schedule.svg" alt="Calendar"/>
                    </a>
                </div>
                <div className={buttonStyle}>
                    <a href="/">
                        <Image className={imageStyles} src="\images\home.svg" alt="Home"/>
                    </a>
                </div>
                <div className={buttonStyle}>
                    <a href="/profile">
                        <Image className={imageStyles} src={session?.user?.image ?? "../public/images/profile_icon.jpg"} alt="Profile"/>
                    </a>
                </div>
            
        </nav>)
    )
}