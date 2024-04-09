'use client'
import React from 'react';
import link from 'next/link';
import {SessionProvider} from 'next-auth/react'

const AuthProvider = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default AuthProvider;