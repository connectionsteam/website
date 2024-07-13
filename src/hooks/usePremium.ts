import { GuildPayload, PremiumType } from "@/types";

export default function usePremium(guild: GuildPayload) {
    const isPremium = "premium" in guild;
    const premiumType = PremiumType[guild.premium!.type];
    const maxMods = guild.premium ? 10 : 5;
    const maxConnections = guild.premium?.type === PremiumType.Normal ? 25
        : guild.premium?.type === PremiumType.Vip ? 50 : 5;
    const maxThreads = guild.premium?.type === PremiumType.Normal ? 5
        : guild.premium?.type === PremiumType.Vip ? 15 : 0;

    return {
        isPremium,
        maxMods,
        maxConnections,
        maxThreads,
        premiumType
    }
}