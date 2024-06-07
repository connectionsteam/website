"use client"
import React, { createContext, useState, useEffect, PropsWithChildren, ReactNode } from "react";
import { UserContextProps, UserStructure } from "@/types";

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserStructure | null>(null);

    useEffect(() => {
        setUser({
            avatar: "4007e7943493138d10aeb5d6e64e481c",
            id: "955095844275781693",
            username: "Spyei"
        });
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};