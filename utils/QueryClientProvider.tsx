"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { createContext, useState, ReactNode } from "react"

// Create a client
const queryClient = new QueryClient()

interface QueryContextProps {
    cart: any[];
    setCart: React.Dispatch<React.SetStateAction<any[]>>;
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
}

export const queryContext = createContext<QueryContextProps | undefined>(undefined);

interface QueryProviderProps {
    children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
    const [cart, setCart] = useState<unknown[]>([])
    const [price, setPrice] = useState<number>(0)
    return (
        <QueryClientProvider client={queryClient}>
            <queryContext.Provider value={{ cart, setCart, price, setPrice }}>
                {children}
            </queryContext.Provider>
        </QueryClientProvider>
    )
}
