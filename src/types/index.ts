import { Dispatch, ReactNode, SetStateAction } from "react";

export interface UserStructure {
    id: string;
    username: string;
    avatar: string;
}

export type Language = "pt-BR" | "en-US";

export type GuildTab = "channels" | "cases" | "connections" | "infos" | "width";

export type LanguageType = "pt-BR" | "en-US";

export interface UserContextProps {
    user: UserStructure | null;
    setUser: (user: UserStructure | null) => void;
}

export interface LanguageContextProps {
    language: LanguageType;
    setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

export enum PremiumType {
    None,
    Normal,
    Vip,
}

export interface PremiumPayload {
    type: PremiumType;
    expiresAt: number;
}

export interface GuildPayload {
    name: string;
    icon: string;
    premium?: PremiumPayload;
    prefix?: string;
    id: string;
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
    target: {
        username: string;
        avatar: string;
    },
    moderator: {
        username: string;
        avatar: string;
    }
    moderatorId: string;
    createdTimestamp: number;
}

export interface ConnectedConnectionPayload {
    name: string;
    blockwords?: string[];
    language?: Languages;
    icon: string;
    description?: string;
    channelId: string;
    flags: ConnectedConnectionFlags[];
}

export enum InitialPageConnectedConnectionFlags {
    CompactModeEnabled = "COMPACT_MODE",
    AutoTranslate = "AUTO_TRANSLATE",
    NoIndentification = "NO_INDENTIFICATION",
    AllowLinks = "ALLOW_LINKS",
    AllowOrigin = "ALLOW_ORIGIN",
    AllowFiles = "ALLOW_FILES",
}

export enum ConnectedConnectionFlags {
    Locked = "LOCKED",
    Frozen = "FROZEN",
    AllowFiles = "ALLOW_FILES",
    AllowInvites = "ALLOW_INVITES",
    AllowLinks = "ALLOW_LINKS",
    NoIndentification = "NO_INDENTIFICATION",
    AllowOrigin = "ALLOW_ORIGIN",
    AllowEmojis = "ALLOW_EMOJIS",
    CompactModeEnabled = "COMPACT_MODE",
    AutoTranslate = "AUTO_TRANSLATE",
}

export interface ModType {
    username: string;
    avatar: string;
    type: ModPermType;
}

export enum ModPermType {
    TrustedAdmin,
    PhysicalOwner,
}

export interface ConnectionPayload {
    description?: string;
    icon?: string;
    name: string;
    creator: {
        id: string;
        username: string;
        avatar: string;
    };
    creatorId?: string;
    votes: {
        _id: string;
        userId: string;
        count: number;
        lastVoteTimestamp: number;
    }[];
    tags: string[];
    createdTimestamp: number;
    maxConnections?: number;
}

export interface RequestPost {
    name: string;
    description?: string;
    icon?: string;
    maxConnections?: number;
}

export interface PlanStructure {
    name: string;
    price: number;
    features: string[];
    popular: boolean;
}

export interface GuildChannelsPayload {
    id: string;
    name: string;
    position: number;
    nsfw?: boolean;
    parent_id?: string;
}

export enum Languages {
    "af" = "Afrikaans",
    "sq" = "Albanian",
    "am" = "Amharic",
    "ar" = "Arabic",
    "hy" = "Armenian",
    "as" = "Assamese",
    "az" = "Azerbaijani",
    "bn" = "Bangla",
    "ba" = "Bashkir",
    "eu" = "Basque",
    "bho" = "Bhojpuri",
    "brx" = "Bodo",
    "bs" = "Bosnian",
    "bg" = "Bulgarian",
    "yue" = "Cantonese (Traditional)",
    "ca" = "Catalan",
    "hne" = "Chhattisgarhi",
    "lzh" = "Chinese (Literary)",
    "zh-Hans" = "Chinese Simplified",
    "zh-Hant" = "Chinese Traditional",
    "hr" = "Croatian",
    "cs" = "Czech",
    "da" = "Danish",
    "prs" = "Dari",
    "dv" = "Divehi",
    "doi" = "Dogri",
    "nl" = "Dutch",
    "en" = "English",
    "et" = "Estonian",
    "fo" = "Faroese",
    "fj" = "Fijian",
    "fil" = "Filipino",
    "fi" = "Finnish",
    "fr" = "French",
    "fr-CA" = "French (Canada)",
    "gl" = "Galician",
    "lug" = "Ganda",
    "ka" = "Georgian",
    "de" = "German",
    "el" = "Greek",
    "gu" = "Gujarati",
    "ht" = "Haitian Creole",
    "ha" = "Hausa",
    "he" = "Hebrew",
    "hi" = "Hindi",
    "mww" = "Hmong Daw",
    "hu" = "Hungarian",
    "is" = "Icelandic",
    "ig" = "Igbo",
    "id" = "Indonesian",
    "ikt" = "Inuinnaqtun",
    "iu" = "Inuktitut",
    "iu-Latn" = "Inuktitut (Latin)",
    "ga" = "Irish",
    "it" = "Italian",
    "ja" = "Japanese",
    "kn" = "Kannada",
    "ks" = "Kashmiri",
    "kk" = "Kazakh",
    "km" = "Khmer",
    "rw" = "Kinyarwanda",
    "tlh-Latn" = "Klingon (Latin)",
    "gom" = "Konkani",
    "ko" = "Korean",
    "ku" = "Kurdish (Central)",
    "kmr" = "Kurdish (Northern)",
    "ky" = "Kyrgyz",
    "lo" = "Lao",
    "lv" = "Latvian",
    "ln" = "Lingala",
    "lt" = "Lithuanian",
    "dsb" = "Lower Sorbian",
    "mk" = "Macedonian",
    "mai" = "Maithili",
    "mg" = "Malagasy",
    "ms" = "Malay",
    "ml" = "Malayalam",
    "mt" = "Maltese",
    "mr" = "Marathi",
    "mn-Cyrl" = "Mongolian (Cyrillic)",
    "mn-Mong" = "Mongolian (Traditional)",
    "my" = "Myanmar (Burmese)",
    "mi" = "Māori",
    "ne" = "Nepali",
    "nb" = "Norwegian",
    "nya" = "Nyanja",
    "or" = "Odia",
    "ps" = "Pashto",
    "fa" = "Persian",
    "pl" = "Polish",
    "pt" = "Portuguese (Brazil)",
    "pt-PT" = "Portuguese (Portugal)",
    "pa" = "Punjabi",
    "otq" = "Querétaro Otomi",
    "ro" = "Romanian",
    "run" = "Rundi",
    "ru" = "Russian",
    "sm" = "Samoan",
    "sr-Cyrl" = "Serbian (Cyrillic)",
    "sr-Latn" = "Serbian (Latin)",
    "st" = "Sesotho",
    "nso" = "Sesotho sa Leboa",
    "tn" = "Setswana",
    "sn" = "Shona",
    "sd" = "Sindhi",
    "si" = "Sinhala",
    "sk" = "Slovak",
    "sl" = "Slovenian",
    "so" = "Somali",
    "es" = "Spanish",
    "sw" = "Swahili",
    "sv" = "Swedish",
    "ty" = "Tahitian",
    "ta" = "Tamil",
    "tt" = "Tatar",
    "te" = "Telugu",
    "th" = "Thai",
    "bo" = "Tibetan",
    "ti" = "Tigrinya",
    "to" = "Tongan",
    "tr" = "Turkish",
    "tk" = "Turkmen",
    "uk" = "Ukrainian",
    "hsb" = "Upper Sorbian",
    "ur" = "Urdu",
    "ug" = "Uyghur",
    "uz" = "Uzbek (Latin)",
    "vi" = "Vietnamese",
    "cy" = "Welsh",
    "xh" = "Xhosa",
    "yo" = "Yoruba",
    "yua" = "Yucatec Maya",
    "zu" = "Zulu",
}

export interface TabsStructure {
    value: string;
    title: string;
    content: ReactNode;
}

export interface ConnectionBody {
    channel: GuildChannelsPayload;
    name: string;
    language?: {
        language: Languages | "";
        key: keyof typeof Languages | "";
    };
};

export interface ConnectedConnectionsState {
    hover: string | null;
    removing: string | null;
}

export interface DiscordMember {
    user: {
        username: string;
        avatar: string;
        id: string;
        bot: boolean
        global_name?: string;
    }
}

export interface GuildThreadsPayload {
    id: string;
    originId: string;
    creatorId: string;
    children: string[];
    createdTimestamp: number;
}

export interface TabState {
    tabs: TabsStructure[];
    selected: string;
    connection: boolean;
}

export interface ConnectionsPageStructure {
    _id: string,
    name: string,
    creator: {
        id: string,
        username: string,
        avatar: string
    }
    createdTimestamp: number,
    icon?: string,
    description?: string,
    votes: ConnectionsPageVote[],
    promoted?: boolean;
    tags: string[]
}

export interface ConnectionsPageVote {
    _id: string,
    userId: string,
    count: number,
    lastVoteTimestamp: number,
}

export interface Premium {
    isPremium: boolean;
    maxMods: number;
    maxConnections: number;
    maxThreads: number;
    premiumType: PremiumType;
}

export interface VotesPropsStructure {
    loading: boolean;
    voted: boolean;
    restime: boolean;
    votes: number;
    lastVoteTimestamp: number;
    canVote: boolean;
}

export interface ModsFiltersStructure {
    mod_id: null | string,
    target_id: null | string,
    type: null | number,
    connection: null | string
}

export interface ConnectionsPageFilters {
    tag: string;
    sort: string;
    query: string;
    search: boolean;
}