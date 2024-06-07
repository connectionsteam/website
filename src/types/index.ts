import { Dispatch, ReactNode, SetStateAction } from "react";

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