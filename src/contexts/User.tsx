"use client"
import React, { createContext, useState, useEffect, PropsWithChildren, ReactNode } from "react";
import { UserContextProps, UserStructure } from "@/types";

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserStructure | null>(null);

    // const getUserData = async () => {
    //     const { data } = await api.getUserData();
        
    //     if (data) {
    //         setUser(data);
    //     } else {
    //         setUser(null);
    //     }
    // };

    // useEffect(() => {
    //     getUserData();
    // }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};