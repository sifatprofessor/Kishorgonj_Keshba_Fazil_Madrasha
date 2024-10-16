'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { FC } from 'react'

const Logout: FC = () => {
    return (
        <button
            onClick={() => signOut()}
            className="text-black text-sm mt-1 font-bold transition-all duration-500 ease-in-out hover:bg-gray-400 py-1 px-2 rounded-xl"
        >
            <Link href="/">
                <p>Logout</p>
            </Link>
        </button>
    )
}

export default Logout
