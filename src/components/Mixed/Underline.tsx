import { ReactNode } from "react";

export default function Underline({ children }: { children: ReactNode }) {
    return (
        <span className="bg-left-bottom bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"> 
            {children}
        </span>
    )
}