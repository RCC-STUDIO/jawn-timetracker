'use client'
import React from "react"

//Styles Variables
const buttonStyle = "bg-blue-950 hover:bg-blue-700 hover:text-blue-950 text-white p-5 w-full text-center"


export default function NavBar() {
    return (
        <footer className="">
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
        </footer>
    )
}