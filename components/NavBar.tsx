'use client'
import React from "react"

//Styles Variables
const buttonStyle = "bg-slate-600 hover:bg-slate-700 text-white py-4 px-1 w-full text-center"


export default function NavBar() {
    return (
        <footer>
            <div className="bg-purple-600 text-white flex flex-row">
                <div className={buttonStyle}>
                    <a href="/calendar">Calendar</a>
                </div>
                <div className={buttonStyle}>
                    <a href="/">Home</a>
                </div>
                <div className={buttonStyle}>
                    <a href="/profile">Profile</a>
                </div>
                <div className={buttonStyle}>
                    <a href="/management">Managers</a>
                </div>

            </div>
        </footer>
    )
}