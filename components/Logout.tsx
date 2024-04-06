'use client'

import React from "react"
import { useSession } from "next-auth/react"

const logOutHandler = () => {

}

export default function LogOut() {
    return (
        <button onClick={logOutHandler}>

        </button>
    )
}