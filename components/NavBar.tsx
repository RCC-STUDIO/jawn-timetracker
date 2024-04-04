'use client'
import React from "react"
import { useSession } from "next-auth/react"

//Styles Variables
const buttonStyle = "bg-blue-950 hover:bg-blue-700 hover:text-blue-950 text-white p-5 w-full text-center"
const imageStyles = "w-10 h-10 m-auto"
let loggedIn = true

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
        loggedIn && (<nav className="flex flex-row text-xl text-white w-full justify-center items-center text-center">
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
                        <img className={imageStyles} src="\images\profile_icon.jpg" alt="Profile"/>
                    </a>
                </div>
            
        </nav>)
    )
}