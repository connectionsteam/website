"use client"
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { UserContextProps, UserStructure } from "../types";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserStructure | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("/api/auth/user", { 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${Cookies.get("discordUser")}`
                }
            });

            const data = await res.data;

            setUser(data);
        };

        if (Cookies.get("discord_user")) {
            fetchUser();
        }
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};