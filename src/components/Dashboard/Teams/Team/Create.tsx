import { useLanguage } from "../../../../hooks/useLanguage";
import { RequestPost, TeamPayload } from "../../../../types";
import { api } from "../../../../utils/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    post: RequestPost;
    setErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
    errors: { [key: string]: string };
    onClose: () => void;
    setTeams: Dispatch<SetStateAction<TeamPayload[]>>;
    teams: TeamPayload[];
}

export default function CreateTeam({ post, setErrors, errors, teams, setTeams, onClose }: Props) {
    const [loading, setLoading] = useState(false);
    const l = useLanguage();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                createConnection();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [post]);

    const createConnection = async () => {
        setLoading(true);

        const { name, icon } = post;

        const postBody = {
            name,
            iconURL: icon
        }

        if (name.trim() === "") {
            setLoading(false);

            return setErrors({
                ...errors,
                name: "name",
            });
        }

        for (let i in postBody) {
            if (postBody[i as keyof typeof postBody] === "") {
                delete postBody[i as keyof typeof postBody];
            }
        }

        try {
            const { data } = await api.post("/users/@me/teams", postBody);

            setLoading(false);
            onClose();
            setTeams([
                ...teams,
                {
                    ...data,
                    id: data._id,
                }
            ]);
        } catch (error: any) {
            setErrors({
                ...errors,
                avatar: "avatar"
            });

            setLoading(false);
        }
    };

    return (
        <div className="p-[2px] bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-lg w-full">
            <button disabled={loading} onClick={createConnection} className={`flex items-center justify-center gap-2 p-4 h-full w-full rounded-lg bg-neutral-800 hover:bg-transparent transition ${loading ? "cursor-wait hover:bg-neutral-800" : "bg-opacity-100"}`}>
                {loading ? (
                    <div className="flex gap-2 items-center w-full justify-center">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        <span className="font-semibold">{l.dashboard.teams.createTeamLoading}</span>
                    </div>
                ) : <span className="font-semibold">{l.dashboard.teams.createTeam}</span>}
            </button>
        </div>
    );
}