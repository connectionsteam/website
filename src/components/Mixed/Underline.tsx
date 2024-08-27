import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    premium?: boolean;
    promoted?: boolean;
}

export default function Underline({ children, premium, promoted }: Props) {
    return (
        <span className={`bg-left-bottom bg-gradient-to-r 
            ${premium ? "from-yellow-500 to-amber-500" : promoted ? "from-pink-500 to-rose-700" : "from-fuchsia-500 to-indigo-500"}
        bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all 
        duration-500 ease-out`}>
            {children}
        </span>
    )
}