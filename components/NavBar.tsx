'use client'
import React from "react"

//Styles Variables
const buttonStyle = "bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-4 w-1/3 text-center"


export default function NavBar() {
    return (
        <footer>
            <div className="bg-slate-600 text-white flex flex-row">
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
        </footer>
    )
}