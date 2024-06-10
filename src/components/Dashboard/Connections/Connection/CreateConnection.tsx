import { RequestPost } from "@/types";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    post: RequestPost;
    setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
    errors: { [key: string]: string };
}

export default function CreateConnection({ post, setErrors, errors }: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // const validations = [
    //     { key: "name", condition: (postobj: RequestPost) => postobj.name.trim() === "", message: "O nome da conexão é obrigatório." },
    //     { key: "maxConnections", condition: (postobj: RequestPost) => postobj.maxConnections && postobj.maxConnections < 1, message: "O número máximo de conexões é obrigatório." },
    //     { key: "description", condition: (postobj: RequestPost) => postobj.description && (postobj.description.length < 20 || postobj.description.length > 50), message: "A descrição deve ter entre 20 e 50 caracteres." }
    // ];

    // const validatePost = (post: RequestPost) => {
    //     let newErrors: { [key: string]: string } = {};

    //     for (let { key, condition, message } of validations) {
    //         if (condition(post)) {
    //             newErrors[key] = message;
    //         }
    //     }

    //     return newErrors;
    // };   

    const createConnection = async () => {
        setLoading(true);
        // const newErrors = validatePost(post);
        
        // if (Object.keys(newErrors).length > 0) {
        //     setErrors(newErrors);
        //     setLoading(false);

        //     return;
        // }

        try {
            await api.post("/users/@me/connections", post);

            router.push(`/connection/${post.name}`);
            setLoading(false);
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
                        <span className="font-semibold">Criando conexão...</span>
                    </div>
                ) : <span className="font-semibold">Criar conexão</span>}
            </button>
        </div>
    );
}