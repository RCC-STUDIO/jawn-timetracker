'use client'
import React from "react"
import { useSession } from "next-auth/react"

//Styles Variables
const buttonStyle = "bg-blue-950 hover:bg-blue-700 hover:text-blue-950 text-white p-5 w-full text-center"
let loggedIn = false

export default function NavBar() {
    const checkUser = () => {
        const { status } = useSession({
            required: true,
            onUnauthenticated() {
              // The user is not authenticated, handle it here.
            },
          })
          if (status === "loading") {
            loggedIn = true
            return "Loading or not authenticated..."
          }
    }
    return (
        loggedIn && (<footer className="">
            <div className="flex flex-row text-xl text-white absolute bottom-0 left-0 w-full">
                <div className={buttonStyle}>
                    <a href="/calendar">Calendar</a>
                </div>
                <div className={buttonStyle}>
                    <a href="/">Home</a>
                </div>
                <div className={buttonStyle}>
                    <a href="/profile">Profile</a>
                </div>
            </div>
        </footer>)
    )
}