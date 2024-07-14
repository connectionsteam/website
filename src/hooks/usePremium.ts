import { useState, useEffect } from "react";
import { GuildPayload, Premium as PremiumStructure, PremiumType } from "@/types";

export default function usePremium(guild: GuildPayload | undefined) {
    const [premium, setPremium] = useState<PremiumStructure>();

    useEffect(() => {
        if (!guild) return;

        const premiumType = guild.premium?.type || PremiumType.None;
        const maxMods = premiumType === PremiumType.None ? 5 : 10;
        const maxConnections = premiumType === PremiumType.Normal ? 25
            : premiumType === PremiumType.Vip ? 50 : 5;
        const maxThreads = premiumType === PremiumType.Normal ? 5
            : premiumType === PremiumType.Vip ? 15 : 0;

        setPremium({
            isPremium: premiumType !== PremiumType.None,
            maxMods,
            maxConnections,
            maxThreads,
            premiumType
        });
    }, [guild]);

    return {
        premium,
        setPremium
    };
}