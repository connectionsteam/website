import { useIsClient } from "@/contexts/Client";
import { LanguageContext } from "@/contexts/Language";
import { languages } from "@/locale";
import { RequestPost } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    post: RequestPost;
    setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
    errors: { [key: string]: string };
}

export default function CreateConnection({ post, setErrors, errors }: Props) {
    const [loading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);  
    const isClient = useIsClient();

    const createConnection = async () => {
        setLoading(true);

        try {
            await api.post("/users/@me/connections", post);

            setLoading(false);
            isClient && window.location.reload();
        } catch (error: any) {
            const json = error.response.data.errors[0].map((err: any) => err.message) || error.message;
            
            setLoading(false);
            setErrors({
                ...errors,
                api: json.join(", "),
            });
        }
    };

    return (
        <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
            <button disabled={loading} onClick={createConnection} className={`flex items-center justify-center gap-2 p-4 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition ${loading ? "cursor-wait hover:bg-neutral-800" : "bg-opacity-100"}`}>
                {loading ? (
                    <div className="flex gap-2 items-center w-full justify-center">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        <span className="font-semibold">{languages[language].dashboard.connections.createConnectionLoading}</span>
                    </div>
                ) : <span className="font-semibold">{languages[language].dashboard.connections.createConnection}</span>}
            </button>
        </div>
    );
}