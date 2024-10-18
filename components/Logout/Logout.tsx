'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { FC } from 'react'

const Logout: FC = () => {
    return (
        <button
            onClick={() => signOut()}
            className="text-gray-800 text-sm  font-semibold transition-all duration-500 ease-in-out hover:bg-gray-100 py-2 px-4 rounded-lg"
        >
            <Link href="/">
                <p>Logout</p>
            </Link>
        </button>
    )
}

export default Logout
