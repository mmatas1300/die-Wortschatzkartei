'use client'
import { AlertMessageContextProvider } from "@/contexts/AlertMessageContext";
import { SessionProvider } from "next-auth/react";

function Providers({ children }) {
    return (
        <SessionProvider>
            <AlertMessageContextProvider>
                {children}
            </AlertMessageContextProvider>
        </SessionProvider>
    )
}

export default Providers;