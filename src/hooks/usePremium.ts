import { useState, useEffect } from "react";
import { GuildPayload, Premium as PremiumStructure, PremiumType } from "../types";

const Limits = {
    [PremiumType.Normal]: {
        Connections: 25,
        Threads: 5,
        Mods: 10,
    },
    [PremiumType.Vip]: {
        Connections: 50,
        Threads: 15,
        Mods: 10,
    },
    [PremiumType.None]: {
        Connections: 5,
        Threads: 0,
        Mods: 5,
    },
};

export default function usePremium(guild: GuildPayload | undefined) {
    const [premium, setPremium] = useState<PremiumStructure>();

    useEffect(() => {
        if (!guild) return;

        const premiumType = guild.premium?.type || PremiumType.None;
        const limits = Limits[premiumType];

        setPremium({
            isPremium: premiumType !== PremiumType.None,
            maxMods: limits.Mods,
            maxConnections: limits.Connections,
            maxThreads: limits.Threads,
            premiumType
        });
    }, [guild]);

    return {
        premium,
        setPremium
    };
}