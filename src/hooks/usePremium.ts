import { GuildPayload, Premium as PremiumStructure, PremiumType } from "@/types";
import { useState } from "react";

export default function usePremium(guild: GuildPayload) {
    const [premium, setPremium] = useState<PremiumStructure>(() => {
        if (!guild.premium) {
            return {
                isPremium: false,
                maxMods: 5,
                maxConnections: 5,
                maxThreads: 0,
                premiumType: PremiumType.None
            };
        }

        const premiumType = guild.premium.type;
        const maxMods = 10;
        const maxConnections = premiumType === PremiumType.Normal ? 25
            : premiumType === PremiumType.Vip ? 50 : 5;
        const maxThreads = premiumType === PremiumType.Normal ? 5
            : premiumType === PremiumType.Vip ? 15 : 0;

        return {
            isPremium: true,
            maxMods,
            maxConnections,
            maxThreads,
            premiumType
        };
    });

    return {
        premium,
        setPremium
    };
}