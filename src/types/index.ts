import { Dispatch, SetStateAction } from "react";

export interface BasePayload {
    _id: string;
}

export interface UserStructure {
    id: string;
    username: string;
    avatar: string;
}

export type LanguageType = "pt-BR" | "en-US";

export interface UserContextProps {
    user: UserStructure | null;
    setUser: (user: UserStructure | null) => void;
}

export interface LanguageContextProps {
    language: LanguageType;
    setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

export interface GuildPayload extends BasePayload {
    id: string;
    name: string;
    icon: string
    // --
    connections: ConnectedConnectionPayload[];
    cases: AnyCase[];
    mods: Record<string, ModType>;
}

export type AnyCase = TimeoutCase | BanCase;

export enum CaseTypes {
    Timeout,
    Ban,
}

export interface TimeoutCase extends BaseCase<CaseTypes> {
    lifetime: number;
}

export type BanCase = BaseCase<CaseTypes.Ban>;

export interface BaseCase<Type extends CaseTypes> {
    type: Type;
    id: string;
    reason?: string;
    connection: string;
    targetId: string;
    moderatorId: string;
    createdTimestamp: number;
}

export interface ConnectedConnectionPayload {
    name: string;
    icon: string;
    description: string;
    channelId: string;
    flags: ConnectedConnectionFlags[];
}

export enum ConnectedConnectionFlags {
    Locked = 'LOCKED',
    Frozen = 'FROZEN',
    AllowFiles = 'ALLOW_FILES',
    AllowInvites = 'ALLOW_INVITES',
    AllowLinks = 'ALLOW_LINKS',
    NoIndentification = 'NO_INDENTIFICATION',
    AllowOrigin = 'ALLOW_ORIGIN',
    AllowEmojis = 'ALLOW_EMOJIS',
    CompactModeEnabled = 'COMPACT_MODE',
}

export enum ModType {
    TrustedAdmin,
    PhysicalOwner,
}

export interface ConnectionPayload {
    description: string;
    icon: string;
    name: string;
    creatorId: string;
    createdTimestamp: number;
    maxConnections?: number;
}